import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import { QrCode, Download, RefreshCw, Clock } from "lucide-react";

interface Class {
  id: number;
  name: string;
  room: string;
  time: string;
  students: number;
}

interface QRGeneratorProps {
  classes: Class[];
  teacherName: string;
}

export const QRGenerator = ({ classes, teacherName }: QRGeneratorProps) => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQRCode = async (classData: Class) => {
    setIsGenerating(true);
    
    try {
      const qrData = JSON.stringify({
        subject: classData.name,
        room: classData.room,
        teacher: teacherName,
        timestamp: new Date().toISOString(),
        sessionId: `${classData.id}-${Date.now()}`
      });

      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1e40af',  // Primary blue
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      });

      setQrCodeUrl(qrCodeDataUrl);
      setSessionActive(true);
      
      toast({
        title: "QR Code Generated!",
        description: `Students can now scan to mark attendance for ${classData.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `${selectedClass?.name}-attendance-qr.png`;
      link.href = qrCodeUrl;
      link.click();
      
      toast({
        title: "Download Started",
        description: "QR code image has been downloaded",
      });
    }
  };

  const refreshQRCode = () => {
    if (selectedClass) {
      generateQRCode(selectedClass);
      toast({
        title: "QR Code Refreshed",
        description: "A new session has been created",
      });
    }
  };

  const endSession = () => {
    setSessionActive(false);
    setQrCodeUrl("");
    toast({
      title: "Session Ended",
      description: "Students can no longer mark attendance with this QR code",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Class Selection & Controls */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            Generate Class QR Code
          </CardTitle>
          <CardDescription>
            Create QR codes for your classes to enable student attendance marking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Class</label>
            <Select onValueChange={(value) => {
              const classData = classes.find(c => c.id.toString() === value);
              setSelectedClass(classData || null);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a class to generate QR code" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((classItem) => (
                  <SelectItem key={classItem.id} value={classItem.id.toString()}>
                    <div className="flex items-center justify-between w-full">
                      <span>{classItem.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {classItem.time} • {classItem.room}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedClass && (
            <div className="p-4 bg-muted/30 rounded-lg space-y-3">
              <h4 className="font-medium">{selectedClass.name}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Room:</span>
                  <div className="font-medium">{selectedClass.room}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <div className="font-medium">{selectedClass.time}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Students:</span>
                  <div className="font-medium">{selectedClass.students}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={sessionActive ? "default" : "secondary"} className={sessionActive ? "bg-success" : ""}>
                    {sessionActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button 
              onClick={() => selectedClass && generateQRCode(selectedClass)}
              disabled={!selectedClass || isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4" />
                  Generate QR Code
                </>
              )}
            </Button>
            
            {sessionActive && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={refreshQRCode}
                  className="flex-1 gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  onClick={endSession}
                  className="flex-1 gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Clock className="w-4 h-4" />
                  End Session
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* QR Code Display */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">📱</span>
            QR Code Display
          </CardTitle>
          <CardDescription>
            Students scan this code to mark their attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {qrCodeUrl ? (
            <div className="text-center space-y-4">
              <div className="p-6 bg-white rounded-lg inline-block shadow-inner">
                <img 
                  src={qrCodeUrl} 
                  alt="Attendance QR Code" 
                  className="mx-auto"
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">{selectedClass?.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedClass?.room} • {selectedClass?.time}
                </p>
                {sessionActive && (
                  <Badge className="bg-success text-success-foreground">
                    🟢 Live Session Active
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={downloadQRCode}
                  className="flex-1 gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  onClick={refreshQRCode}
                  className="flex-1 gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  New Code
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                📱 Students: Open your app and scan this code to mark attendance
              </div>
            </div>
          ) : (
            <div className="text-center p-12 border-2 border-dashed border-border rounded-lg">
              <QrCode className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">
                No QR code generated yet
              </p>
              <p className="text-sm text-muted-foreground">
                Select a class and click "Generate QR Code" to start
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};