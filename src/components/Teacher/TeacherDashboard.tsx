import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRGenerator } from "@/components/QR/QRGenerator";
import { Users, BarChart3, Download, UserCheck, UserX, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeacherDashboardProps {
  teacherEmail: string;
}

export const TeacherDashboard = ({ teacherEmail }: TeacherDashboardProps) => {
  const { toast } = useToast();
  const teacherName = teacherEmail.split('@')[0];
  
  // Mock class data
  const [classStats] = useState({
    totalStudents: 32,
    presentToday: 28,
    lateToday: 3,
    absentToday: 1,
    attendanceRate: 87.5
  });

  const [studentList] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@school.edu", status: "present", time: "9:00 AM" },
    { id: 2, name: "Bob Smith", email: "bob@school.edu", status: "present", time: "9:02 AM" },
    { id: 3, name: "Carol Davis", email: "carol@school.edu", status: "late", time: "9:15 AM" },
    { id: 4, name: "David Wilson", email: "david@school.edu", status: "present", time: "8:58 AM" },
    { id: 5, name: "Emma Brown", email: "emma@school.edu", status: "absent", time: "-" },
    { id: 6, name: "Frank Miller", email: "frank@school.edu", status: "present", time: "9:01 AM" },
    { id: 7, name: "Grace Lee", email: "grace@school.edu", status: "late", time: "9:12 AM" },
    { id: 8, name: "Henry Taylor", email: "henry@school.edu", status: "present", time: "8:59 AM" },
  ]);

  const classes = [
    { id: 1, name: "Mathematics 101", room: "Room 101", time: "9:00 AM", students: 32 },
    { id: 2, name: "Advanced Physics", room: "Lab 1", time: "10:30 AM", students: 28 },
    { id: 3, name: "Calculus II", room: "Room 205", time: "2:00 PM", students: 24 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <UserCheck className="w-4 h-4 text-success" />;
      case 'late':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'absent':
        return <UserX className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      present: 'bg-success text-success-foreground',
      late: 'bg-warning text-warning-foreground',
      absent: 'bg-destructive text-destructive-foreground'
    };
    return variants[status as keyof typeof variants] || 'bg-muted';
  };

  const exportAttendance = () => {
    toast({
      title: "Export Started",
      description: "Attendance data is being prepared for download",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Attendance report has been downloaded successfully",
      });
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
          Welcome, Professor {teacherName}!
        </h2>
        <p className="text-muted-foreground">Manage your classes and track student attendance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card hover:shadow-educational transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-educational transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-success" />
              Present Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{classStats.presentToday}</div>
            <p className="text-xs text-muted-foreground">On time arrival</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-educational transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-warning" />
              Late Arrivals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{classStats.lateToday}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-educational transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent" />
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{classStats.attendanceRate}%</div>
              <Progress value={classStats.attendanceRate} className="h-2" />
              <p className="text-xs text-muted-foreground">Above target</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="qr-generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-max">
          <TabsTrigger value="qr-generator" className="flex items-center gap-2">
            <span className="text-lg">📱</span>
            <span className="hidden sm:inline">QR Generator</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Live Attendance</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="qr-generator">
          <QRGenerator classes={classes} teacherName={teacherName} />
        </TabsContent>

        <TabsContent value="attendance">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Live Attendance - Mathematics 101
                  </CardTitle>
                  <CardDescription>
                    Real-time attendance tracking for today's session
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={exportAttendance}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentList.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(student.status)}
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground min-w-[60px]">
                        {student.time}
                      </span>
                      <Badge className={getStatusBadge(student.status)}>
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Class Performance
                </CardTitle>
                <CardDescription>
                  Attendance statistics by class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((classItem) => (
                    <div key={classItem.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{classItem.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 20 + 80)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.floor(Math.random() * 20 + 80)} 
                        className="h-2" 
                      />
                      <div className="text-xs text-muted-foreground">
                        {classItem.students} students • {classItem.time} • {classItem.room}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  Weekly Trends
                </CardTitle>
                <CardDescription>
                  Attendance patterns over the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                    <div key={day} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{day}</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 15 + 85)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.floor(Math.random() * 15 + 85)} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};