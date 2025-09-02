import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface NavigationProps {
  userRole: 'student' | 'teacher';
  userEmail: string;
  onLogout: () => void;
}

export const Navigation = ({ userRole, userEmail, onLogout }: NavigationProps) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Goodbye!",
      description: "You have been successfully logged out",
    });
    onLogout();
  };

  return (
    <nav className="bg-card border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">📚</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold gradient-hero bg-clip-text text-transparent">
                Smart Attendance
              </h1>
              <p className="text-xs text-muted-foreground capitalize">
                {userRole} Dashboard
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{userEmail}</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};