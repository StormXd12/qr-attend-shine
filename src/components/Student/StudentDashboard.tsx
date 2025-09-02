import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRScanner } from "@/components/QR/QRScanner";
import { Clock, BookOpen, Calendar, CheckCircle, Target, Brain } from "lucide-react";

interface StudentDashboardProps {
  studentEmail: string;
}

export const StudentDashboard = ({ studentEmail }: StudentDashboardProps) => {
  const [overallAttendance] = useState(87);
  const [weeklyAttendance] = useState(92);
  
  // Mock data for student
  const studentName = studentEmail.split('@')[0];
  const todaySchedule = [
    { time: "9:00 AM", subject: "Mathematics", room: "Room 101", status: "present" },
    { time: "10:30 AM", subject: "Physics", room: "Lab 1", status: "present" },
    { time: "12:00 PM", subject: "English", room: "Room 205", status: "upcoming" },
    { time: "2:00 PM", subject: "Chemistry", room: "Lab 2", status: "upcoming" },
  ];

  const dailyTasks = [
    { subject: "Math", task: "Complete quadratic equations worksheet", difficulty: "Medium", points: 15 },
    { subject: "Physics", task: "Review Newton's laws and complete practice problems", difficulty: "Hard", points: 20 },
    { subject: "English", task: "Read Chapter 5 of assigned novel", difficulty: "Easy", points: 10 },
  ];

  const freeTimeSuggestions = [
    { activity: "Study Group", description: "Join math study group in Library", time: "3:00 PM" },
    { activity: "Lab Practice", description: "Open physics lab for experiments", time: "4:00 PM" },
    { activity: "Career Workshop", description: "STEM career guidance session", time: "5:00 PM" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success';
      case 'Medium': return 'bg-warning';
      case 'Hard': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
          Welcome back, {studentName}!
        </h2>
        <p className="text-muted-foreground">Ready for another productive day of learning?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-card hover:shadow-educational transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Overall Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{overallAttendance}%</div>
              <Progress value={overallAttendance} className="h-2" />
              <p className="text-xs text-muted-foreground">Above average performance</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-educational transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{weeklyAttendance}%</div>
              <Progress value={weeklyAttendance} className="h-2" />
              <p className="text-xs text-muted-foreground">Excellent weekly record</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-educational transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              Daily Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">45/65</div>
              <Progress value={69} className="h-2" />
              <p className="text-xs text-muted-foreground">15 more points to daily goal</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="timetable" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-max">
          <TabsTrigger value="timetable" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Timetable</span>
          </TabsTrigger>
          <TabsTrigger value="scanner" className="flex items-center gap-2">
            <span className="text-lg">📱</span>
            <span className="hidden sm:inline">QR Scanner</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Daily Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="freetime" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Free Time</span>
          </TabsTrigger>
          <TabsTrigger value="routine" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Routine</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timetable">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Today's Schedule
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-muted-foreground min-w-[80px]">
                        {item.time}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.subject}</h4>
                        <p className="text-sm text-muted-foreground">{item.room}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={item.status === 'present' ? 'default' : 'secondary'}
                      className={item.status === 'present' ? 'bg-success' : ''}
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scanner">
          <QRScanner studentEmail={studentEmail} />
        </TabsContent>

        <TabsContent value="tasks">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                Personalized Daily Tasks
              </CardTitle>
              <CardDescription>
                Tasks curated based on your academic strengths and areas for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyTasks.map((task, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{task.subject}</Badge>
                        <Badge className={`${getDifficultyColor(task.difficulty)} text-white`}>
                          {task.difficulty}
                        </Badge>
                      </div>
                      <Badge variant="secondary">+{task.points} pts</Badge>
                    </div>
                    <p className="text-sm font-medium mb-1">{task.task}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="freetime">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                Free Time Suggestions
              </CardTitle>
              <CardDescription>
                Make the most of your free periods with these productive activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {freeTimeSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{suggestion.activity}</h4>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      </div>
                      <Badge variant="outline">{suggestion.time}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routine">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Daily Routine
              </CardTitle>
              <CardDescription>
                Your personal schedule for academic and daily activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "6:30 AM", activity: "Morning Exercise", type: "personal" },
                  { time: "7:30 AM", activity: "Breakfast & Preparation", type: "personal" },
                  { time: "8:30 AM", activity: "School Commute", type: "travel" },
                  { time: "9:00 AM - 3:00 PM", activity: "Class Schedule", type: "academic" },
                  { time: "3:30 PM", activity: "Lunch Break", type: "personal" },
                  { time: "4:00 PM", activity: "Study Session", type: "academic" },
                  { time: "6:00 PM", activity: "Sports/Recreation", type: "personal" },
                  { time: "8:00 PM", activity: "Dinner & Family Time", type: "personal" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <div className="text-sm font-medium text-muted-foreground min-w-[120px]">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{item.activity}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={
                        item.type === 'academic' ? 'bg-primary/20 text-primary' :
                        item.type === 'personal' ? 'bg-secondary/20 text-secondary' :
                        'bg-accent/20 text-accent'
                      }
                    >
                      {item.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};