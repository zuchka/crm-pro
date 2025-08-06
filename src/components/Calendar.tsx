import { useState, useMemo } from "react";
import { Calendar as BigCalendar, momentLocalizer, Event, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, DollarSign, Calendar as CalendarIcon, Users, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const localizer = momentLocalizer(moment);

interface Deal {
  id: string;
  title: string;
  client: string;
  value: number;
  stage: "prospect" | "qualification" | "proposal" | "negotiation" | "closed-won" | "closed-lost";
  assignee: string;
  notes?: string;
}

interface Milestone extends Event {
  id: string;
  deal: Deal;
  type: "meeting" | "proposal" | "follow-up" | "deadline" | "demo" | "contract";
  description?: string;
}

const Calendar = () => {
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date(2025, 7, 1)); // Start with August 2025 to show our events
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Milestone | null>(null);

  // Mock data for deals and milestones
  const deals: Deal[] = [
    {
      id: "1",
      title: "Enterprise Software License",
      client: "Acme Corp",
      value: 45000,
      stage: "negotiation",
      assignee: "Sarah Johnson",
    },
    {
      id: "2", 
      title: "Marketing Automation Platform",
      client: "TechStart Inc",
      value: 28000,
      stage: "proposal",
      assignee: "Mike Wilson",
    },
    {
      id: "3",
      title: "CRM Implementation",
      client: "Global Solutions",
      value: 75000,
      stage: "qualification",
      assignee: "Sarah Johnson",
    },
    {
      id: "4",
      title: "Security Audit Service",
      client: "SecureBank",
      value: 15000,
      stage: "prospect",
      assignee: "David Brown",
    },
  ];

  const milestones: Milestone[] = [
    {
      id: "1",
      title: "Demo Meeting - Acme Corp",
      start: new Date(2025, 7, 8, 10, 0), // August 8, 2025
      end: new Date(2025, 7, 8, 11, 0),
      deal: deals[0],
      type: "demo",
      description: "Product demonstration for key stakeholders",
    },
    {
      id: "2",
      title: "Proposal Deadline - TechStart",
      start: new Date(2025, 7, 12, 17, 0), // August 12, 2025
      end: new Date(2025, 7, 12, 17, 30),
      deal: deals[1],
      type: "deadline",
      description: "Final proposal submission deadline",
    },
    {
      id: "3",
      title: "Follow-up Call - Global Solutions",
      start: new Date(2025, 7, 15, 14, 0), // August 15, 2025
      end: new Date(2025, 7, 15, 15, 0),
      deal: deals[2],
      type: "follow-up",
      description: "Check on requirements and next steps",
    },
    {
      id: "4",
      title: "Contract Meeting - Acme Corp",
      start: new Date(2025, 7, 20, 15, 0), // August 20, 2025
      end: new Date(2025, 7, 20, 16, 30),
      deal: deals[0],
      type: "contract",
      description: "Final contract negotiation and signing",
    },
    {
      id: "5",
      title: "Initial Meeting - SecureBank",
      start: new Date(2025, 7, 25, 11, 0), // August 25, 2025
      end: new Date(2025, 7, 25, 12, 0),
      deal: deals[3],
      type: "meeting",
      description: "Discovery meeting to understand requirements",
    },
    {
      id: "6",
      title: "Proposal Review - TechStart",
      start: new Date(2025, 7, 28, 9, 0), // August 28, 2025
      end: new Date(2025, 7, 28, 10, 30),
      deal: deals[1],
      type: "proposal",
      description: "Review and finalize proposal details",
    },
  ];

  const getStageColor = (stage: Deal["stage"]) => {
    switch (stage) {
      case "prospect": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "qualification": return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-300";
      case "proposal": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-300";
      case "negotiation": return "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-300";
      case "closed-won": return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-300";
      case "closed-lost": return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getTypeColor = (type: Milestone["type"]) => {
    switch (type) {
      case "meeting": return "#20AEF3"; // dashboard-accent-blue
      case "demo": return "#A9DFD8"; // dashboard-accent-teal
      case "proposal": return "#FCB859"; // dashboard-accent-orange
      case "follow-up": return "#F2C8ED"; // dashboard-accent-pink
      case "deadline": return "#EF4444"; // bright red for urgency
      case "contract": return "#10B981"; // bright green for success
      default: return "#87888C"; // dashboard-text-accent
    }
  };

  const eventStyleGetter = (event: Milestone) => {
    const bgColor = getTypeColor(event.type);
    return {
      style: {
        backgroundColor: bgColor,
        borderRadius: "6px",
        opacity: 0.95,
        color: ["#A9DFD8", "#FCB859", "#F2C8ED"].includes(bgColor) ? "#1a1a1a" : "white",
        border: `2px solid ${bgColor}`,
        display: "block",
        fontWeight: "600",
        fontSize: "12px",
        padding: "2px 6px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      },
    };
  };

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const activeMilestones = milestones.filter(m => m.start >= new Date());

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dashboard-card border-dashboard-sidebar">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-dashboard-text-muted">
              Total Pipeline
            </CardTitle>
            <DollarSign className="w-4 h-4 text-dashboard-accent-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-text-primary">
              ${totalPipelineValue.toLocaleString()}
            </div>
            <p className="text-xs text-dashboard-text-muted">
              {deals.length} active deals
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dashboard-card border-dashboard-sidebar">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-dashboard-text-muted">
              This Week
            </CardTitle>
            <CalendarIcon className="w-4 h-4 text-dashboard-accent-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-text-primary">
              {activeMilestones.filter(m => {
                const weekFromNow = new Date();
                weekFromNow.setDate(weekFromNow.getDate() + 7);
                return m.start <= weekFromNow;
              }).length}
            </div>
            <p className="text-xs text-dashboard-text-muted">
              upcoming milestones
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dashboard-card border-dashboard-sidebar">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-dashboard-text-muted">
              Active Deals
            </CardTitle>
            <Target className="w-4 h-4 text-dashboard-accent-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-text-primary">
              {deals.filter(d => !d.stage.startsWith("closed")).length}
            </div>
            <p className="text-xs text-dashboard-text-muted">
              in progress
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dashboard-card border-dashboard-sidebar">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-dashboard-text-muted">
              Team Members
            </CardTitle>
            <Users className="w-4 h-4 text-dashboard-accent-pink" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-text-primary">
              {new Set(deals.map(d => d.assignee)).size}
            </div>
            <p className="text-xs text-dashboard-text-muted">
              working deals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card className="bg-dashboard-card border-dashboard-sidebar">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-dashboard-text-primary">Deal Calendar</CardTitle>
              <p className="text-sm text-dashboard-text-muted mt-1">
                Track deal milestones and important dates
              </p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-dashboard-accent-teal text-dashboard-dark hover:bg-dashboard-accent-teal/80">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Milestone
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dashboard-card border-dashboard-sidebar max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-dashboard-text-primary">Add New Milestone</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-dashboard-text-primary">Title</Label>
                    <Input className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-dashboard-text-primary">Deal</Label>
                    <Select>
                      <SelectTrigger className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary">
                        <SelectValue placeholder="Select a deal" />
                      </SelectTrigger>
                      <SelectContent className="bg-dashboard-card border-dashboard-sidebar">
                        {deals.map((deal) => (
                          <SelectItem key={deal.id} value={deal.id}>
                            {deal.title} - {deal.client}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-dashboard-text-primary">Type</Label>
                    <Select>
                      <SelectTrigger className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary">
                        <SelectValue placeholder="Select milestone type" />
                      </SelectTrigger>
                      <SelectContent className="bg-dashboard-card border-dashboard-sidebar">
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="demo">Demo</SelectItem>
                        <SelectItem value="proposal">Proposal</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-dashboard-text-primary">Date</Label>
                      <Input type="date" className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-dashboard-text-primary">Time</Label>
                      <Input type="time" className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-dashboard-text-primary">Description</Label>
                    <Textarea className="bg-dashboard-dark border-dashboard-sidebar text-dashboard-text-primary" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddDialog(false)}
                      className="border-dashboard-sidebar text-dashboard-text-muted hover:bg-dashboard-sidebar"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-dashboard-accent-teal text-dashboard-dark hover:bg-dashboard-accent-teal/80">
                      Add Milestone
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="calendar-container" style={{ height: "600px" }}>
            <BigCalendar
              localizer={localizer}
              events={milestones}
              startAccessor="start"
              endAccessor="end"
              view={view}
              onView={setView}
              date={date}
              onNavigate={setDate}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={(event) => setSelectedEvent(event as Milestone)}
              popup
              style={{ height: "100%" }}
              formats={{
                monthHeaderFormat: "MMMM YYYY",
                dayHeaderFormat: "dddd MMM DD",
                dayRangeHeaderFormat: ({ start, end }) =>
                  `${moment(start).format("MMM DD")} - ${moment(end).format("MMM DD, YYYY")}`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Deal Overview */}
      <Card className="bg-dashboard-card border-dashboard-sidebar">
        <CardHeader>
          <CardTitle className="text-dashboard-text-primary">Active Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deals.filter(d => !d.stage.startsWith("closed")).map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-4 bg-dashboard-sidebar/30 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-dashboard-text-primary">{deal.title}</h4>
                  <p className="text-sm text-dashboard-text-muted">{deal.client}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-dashboard-text-primary">
                      ${deal.value.toLocaleString()}
                    </p>
                    <p className="text-sm text-dashboard-text-muted">{deal.assignee}</p>
                  </div>
                  <Badge className={getStageColor(deal.stage)}>
                    {deal.stage.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-dashboard-card border-dashboard-sidebar">
          <DialogHeader>
            <DialogTitle className="text-dashboard-text-primary">
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-dashboard-text-muted">Deal</Label>
                  <p className="text-dashboard-text-primary font-medium">
                    {selectedEvent.deal.title}
                  </p>
                </div>
                <div>
                  <Label className="text-dashboard-text-muted">Client</Label>
                  <p className="text-dashboard-text-primary font-medium">
                    {selectedEvent.deal.client}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-dashboard-text-muted">Date & Time</Label>
                  <p className="text-dashboard-text-primary font-medium">
                    {moment(selectedEvent.start).format("MMM DD, YYYY at h:mm A")}
                  </p>
                </div>
                <div>
                  <Label className="text-dashboard-text-muted">Type</Label>
                  <Badge 
                    className="text-white" 
                    style={{ backgroundColor: getTypeColor(selectedEvent.type) }}
                  >
                    {selectedEvent.type}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-dashboard-text-muted">Deal Value</Label>
                <p className="text-dashboard-text-primary font-medium">
                  ${selectedEvent.deal.value.toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-dashboard-text-muted">Assigned to</Label>
                <p className="text-dashboard-text-primary font-medium">
                  {selectedEvent.deal.assignee}
                </p>
              </div>
              {selectedEvent.description && (
                <div>
                  <Label className="text-dashboard-text-muted">Description</Label>
                  <p className="text-dashboard-text-primary">
                    {selectedEvent.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
