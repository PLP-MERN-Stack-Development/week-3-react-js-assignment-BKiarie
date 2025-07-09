import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CheckSquare, BarChart3, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Task } from "@/types/Task";

export default function Dashboard() {
  const [tasks] = useLocalStorage<Task[]>('tasks', []);

  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    pendingTasks: tasks.filter(t => !t.completed).length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0,
  };

  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Welcome to TaskFlow
        </h1>
        <p className="text-xl text-muted-foreground">
          Your productivity dashboard and task management hub
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card hover className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingTasks} pending, {stats.completedTasks} completed
            </p>
          </CardContent>
        </Card>

        <Card hover className="bg-gradient-to-br from-success/10 to-success/20 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Of all tasks completed
            </p>
          </CardContent>
        </Card>

        <Card hover className="bg-gradient-to-br from-warning/10 to-warning/20 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <BarChart3 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              Tasks to complete
            </p>
          </CardContent>
        </Card>

        <Card hover className="bg-gradient-to-br from-accent to-accent/20 border-accent/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Integration</CardTitle>
            <Users className="h-4 w-4 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-foreground">Active</div>
            <p className="text-xs text-muted-foreground">
              Users API connected
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/tasks">
              <Button className="w-full justify-start bg-gradient-to-r from-primary to-primary-glow hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                Create New Task
              </Button>
            </Link>
            <Link to="/tasks">
              <Button variant="outline" className="w-full justify-start">
                <CheckSquare className="h-4 w-4 mr-2" />
                View All Tasks
              </Button>
            </Link>
            <Link to="/users">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Browse Users
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>Your latest task activity</CardDescription>
            </div>
            <Link to="/tasks">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-md bg-accent/10 hover:bg-accent/20 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-success' : 'bg-warning'}`} />
                      <div>
                        <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                      task.priority === 'medium' ? 'bg-warning/20 text-warning' :
                      'bg-success/20 text-success'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tasks yet. Create your first task!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              Task Management
            </CardTitle>
            <CardDescription>
              Organize your work with our powerful task management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Create, edit, and delete tasks</li>
              <li>• Set priorities and categories</li>
              <li>• Filter and search functionality</li>
              <li>• Local storage persistence</li>
            </ul>
          </CardContent>
        </Card>

        <Card hover className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              API Integration
            </CardTitle>
            <CardDescription>
              Explore users data from JSONPlaceholder API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Fetch data from external API</li>
              <li>• Loading and error states</li>
              <li>• Search and pagination</li>
              <li>• Responsive grid layout</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}