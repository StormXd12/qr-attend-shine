import { useState, useEffect } from "react";
import { LoginForm } from "@/components/Auth/LoginForm";
import { Navigation } from "@/components/Layout/Navigation";
import { StudentDashboard } from "@/components/Student/StudentDashboard";
import { TeacherDashboard } from "@/components/Teacher/TeacherDashboard";

interface User {
  email: string;
  role: 'student' | 'teacher';
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('smartAttendanceUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('smartAttendanceUser');
      }
    }
  }, []);

  const handleLogin = (email: string, role: 'student' | 'teacher') => {
    const newUser = { email, role };
    setUser(newUser);
    localStorage.setItem('smartAttendanceUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('smartAttendanceUser');
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        userRole={user.role}
        userEmail={user.email}
        onLogout={handleLogout}
      />
      
      <main>
        {user.role === 'student' ? (
          <StudentDashboard studentEmail={user.email} />
        ) : (
          <TeacherDashboard teacherEmail={user.email} />
        )}
      </main>
    </div>
  );
};

export default Index;
