import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Users,
  Settings,
  BarChart3,
  Shield,
  Mail,
  Database,
  Activity,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Building,
  Calendar,
  FileText,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Sales Manager" | "Sales Rep" | "Support";
  status: "Active" | "Inactive" | "Pending";
  lastLogin: string;
  joinDate: string;
}

interface SystemMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilterRole, setUserFilterRole] = useState("all");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  // Mock data for demonstration
  const users: User[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john@crmpro.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15 14:30",
      joinDate: "2023-05-10",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@crmpro.com", 
      role: "Sales Manager",
      status: "Active",
      lastLogin: "2024-01-15 09:45",
      joinDate: "2023-07-22",
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@crmpro.com",
      role: "Sales Rep",
      status: "Active",
      lastLogin: "2024-01-14 16:20",
      joinDate: "2023-09-15",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@crmpro.com",
      role: "Support",
      status: "Inactive",
      lastLogin: "2024-01-10 11:15",
      joinDate: "2023-11-03",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david@crmpro.com",
      role: "Sales Rep",
      status: "Pending",
      lastLogin: "Never",
      joinDate: "2024-01-14",
    },
  ];

  const systemMetrics: SystemMetric[] = [
    {
      label: "Total Users",
      value: "847",
      change: "+12%",
      icon: Users,
      color: "dashboard-accent-teal",
    },
    {
      label: "Active Deals",
      value: "234",
      change: "+8%",
      icon: DollarSign,
      color: "dashboard-accent-orange",
    },
    {
      label: "Monthly Revenue",
      value: "$142.5K",
      change: "+15%",
      icon: TrendingUp,
      color: "dashboard-accent-blue",
    },
    {
      label: "Support Tickets",
      value: "23",
      change: "-18%",
      icon: AlertTriangle,
      color: "dashboard-accent-pink",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      user: "Sarah Johnson",
      action: "Created new deal",
      target: "Acme Corp - $45,000",
      time: "2 hours ago",
      icon: DollarSign,
    },
    {
      id: "2",
      user: "Mike Wilson",
      action: "Updated contact",
      target: "Jennifer Lee",
      time: "4 hours ago",
      icon: Users,
    },
    {
      id: "3",
      user: "Emily Davis",
      action: "Resolved ticket",
      target: "#SUPP-1247",
      time: "6 hours ago",
      icon: CheckCircle,
    },
    {
      id: "4",
      user: "John Smith",
      action: "Added new user",
      target: "David Brown",
      time: "1 day ago",
      icon: UserPlus,
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = userFilterRole === "all" || user.role === userFilterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Sales Manager": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Sales Rep": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Support": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-dark">
      {/* Admin Navigation */}
      <nav className="border-b border-dashboard-sidebar bg-dashboard-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-dashboard-accent-teal rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-dashboard-dark" />
                </div>
                <span className="text-xl font-bold text-dashboard-text-primary">
                  CRMPro Admin
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-dashboard-text-muted hover:text-dashboard-text-primary"
                asChild
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Site
                </Link>
              </Button>
              <div className="w-8 h-8 bg-dashboard-accent-orange rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-dashboard-dark">JD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dashboard-text-primary mb-2">
            Admin Dashboard
          </h1>
          <p className="text-dashboard-text-muted">
            Manage your CRM system, users, and settings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-dashboard-card border border-dashboard-sidebar">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemMetrics.map((metric, index) => (
                <Card key={index} className="bg-dashboard-card border-dashboard-sidebar">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-dashboard-text-muted">
                      {metric.label}
                    </CardTitle>
                    <metric.icon className={`w-4 h-4 text-${metric.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-dashboard-text-primary">
                      {metric.value}
                    </div>
                    <p className="text-xs text-dashboard-text-muted">
                      <span className={cn(
                        "text-xs",
                        metric.change.startsWith("+") ? "text-green-500" : "text-red-500"
                      )}>
                        {metric.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="bg-dashboard-card border-dashboard-sidebar">
              <CardHeader>
                <CardTitle className="text-dashboard-text-primary">Recent Activity</CardTitle>
                <CardDescription className="text-dashboard-text-muted">
                  Latest actions across your CRM system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-dashboard-sidebar rounded-full flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-dashboard-text-muted" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-dashboard-text-primary">
                          <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-dashboard-text-muted">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-dashboard-card border-dashboard-sidebar">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-dashboard-text-primary">User Management</CardTitle>
                    <CardDescription className="text-dashboard-text-muted">
                      Manage system users and their permissions
                    </CardDescription>
                  </div>
                  <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-dashboard-accent-teal text-dashboard-dark hover:bg-dashboard-accent-teal/80">
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-dashboard-card border-dashboard-sidebar">
                      <DialogHeader>
                        <DialogTitle className="text-dashboard-text-primary">Add New User</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-dashboard-text-primary">First Name</Label>
                            <Input id="firstName" className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-dashboard-text-primary">Last Name</Label>
                            <Input id="lastName" className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-dashboard-text-primary">Email</Label>
                          <Input id="email" type="email" className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role" className="text-dashboard-text-primary">Role</Label>
                          <Select>
                            <SelectTrigger className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent className="bg-dashboard-card border-dashboard-sidebar">
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="sales-manager">Sales Manager</SelectItem>
                              <SelectItem value="sales-rep">Sales Rep</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddUserDialog(false)}
                            className="border-dashboard-sidebar text-dashboard-text-muted hover:bg-dashboard-sidebar"
                          >
                            Cancel
                          </Button>
                          <Button className="bg-dashboard-accent-teal text-dashboard-dark hover:bg-dashboard-accent-teal/80">
                            Add User
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter */}
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dashboard-text-muted" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary"
                    />
                  </div>
                  <Select value={userFilterRole} onValueChange={setUserFilterRole}>
                    <SelectTrigger className="w-48 bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dashboard-card border-dashboard-sidebar">
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                      <SelectItem value="Sales Rep">Sales Rep</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    className="border-dashboard-sidebar text-dashboard-text-muted hover:bg-dashboard-sidebar"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Users Table */}
                <div className="border border-dashboard-sidebar rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-dashboard-sidebar hover:bg-dashboard-sidebar/50">
                        <TableHead className="text-dashboard-text-primary">Name</TableHead>
                        <TableHead className="text-dashboard-text-primary">Email</TableHead>
                        <TableHead className="text-dashboard-text-primary">Role</TableHead>
                        <TableHead className="text-dashboard-text-primary">Status</TableHead>
                        <TableHead className="text-dashboard-text-primary">Last Login</TableHead>
                        <TableHead className="text-dashboard-text-primary">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-dashboard-sidebar hover:bg-dashboard-sidebar/30">
                          <TableCell className="text-dashboard-text-primary font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell className="text-dashboard-text-muted">{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-dashboard-text-muted">{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="text-dashboard-text-muted hover:text-dashboard-text-primary">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-dashboard-card border-dashboard-sidebar">
                <CardHeader>
                  <CardTitle className="text-dashboard-text-primary">User Growth</CardTitle>
                  <CardDescription className="text-dashboard-text-muted">
                    Monthly active users over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-dashboard-text-muted">
                    Chart placeholder - Would integrate with recharts
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dashboard-card border-dashboard-sidebar">
                <CardHeader>
                  <CardTitle className="text-dashboard-text-primary">Revenue Trends</CardTitle>
                  <CardDescription className="text-dashboard-text-muted">
                    Monthly recurring revenue growth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-dashboard-text-muted">
                    Chart placeholder - Would integrate with recharts
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-dashboard-card border-dashboard-sidebar">
                <CardHeader>
                  <CardTitle className="text-dashboard-text-primary flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Database Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-dashboard-text-muted">Connection Status</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Connected
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dashboard-text-muted">Storage Used</span>
                    <span className="text-dashboard-text-primary">2.4 GB / 10 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dashboard-text-muted">Last Backup</span>
                    <span className="text-dashboard-text-primary">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dashboard-card border-dashboard-sidebar">
                <CardHeader>
                  <CardTitle className="text-dashboard-text-primary flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-dashboard-text-muted">SSL Certificate</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Valid
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dashboard-text-muted">2FA Enabled</span>
                    <span className="text-dashboard-text-primary">85% of users</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dashboard-text-muted">Last Security Scan</span>
                    <span className="text-dashboard-text-primary">Yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-dashboard-card border-dashboard-sidebar">
                <CardHeader>
                  <CardTitle className="text-dashboard-text-primary">General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-dashboard-text-primary">Company Name</Label>
                    <Input
                      defaultValue="CRMPro"
                      className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-dashboard-text-primary">Time Zone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dashboard-card border-dashboard-sidebar">
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">EST</SelectItem>
                        <SelectItem value="pst">PST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-dashboard-accent-teal text-dashboard-dark hover:bg-dashboard-accent-teal/80">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-dashboard-card border-dashboard-sidebar">
                <CardHeader>
                  <CardTitle className="text-dashboard-text-primary">Email Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-dashboard-text-primary">SMTP Server</Label>
                    <Input
                      defaultValue="smtp.crmpro.com"
                      className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-dashboard-text-primary">From Email</Label>
                    <Input
                      defaultValue="noreply@crmpro.com"
                      className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary"
                    />
                  </div>
                  <Button className="bg-dashboard-accent-teal text-dashboard-dark hover:bg-dashboard-accent-teal/80">
                    Test Connection
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
