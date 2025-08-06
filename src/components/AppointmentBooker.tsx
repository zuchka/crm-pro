import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, User, Mail, Phone, ArrowRight, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  company: z.string().optional(),
  date: z.date({
    required_error: "Please select a date for your appointment.",
  }),
  time: z.string({
    required_error: "Please select a time slot.",
  }),
  meetingType: z.string({
    required_error: "Please select a meeting type.",
  }),
  notes: z.string().optional(),
});

interface AppointmentBookerProps {
  onClose?: () => void;
}

const AppointmentBooker: React.FC<AppointmentBookerProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      notes: "",
    },
  });

  // All possible time slots
  const allTimeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];

  // Generate random available times for selected date
  const generateRandomTimes = () => {
    const numSlots = Math.floor(Math.random() * 8) + 4; // 4-11 available slots
    const shuffled = [...allTimeSlots].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSlots).sort((a, b) => {
      // Sort by time order
      const timeA = new Date(`1970/01/01 ${a}`);
      const timeB = new Date(`1970/01/01 ${b}`);
      return timeA.getTime() - timeB.getTime();
    });
  };

  // Meeting types
  const meetingTypes = [
    { value: "demo", label: "Product Demo", duration: "30 min", description: "See CRMPro in action" },
    { value: "consultation", label: "Sales Consultation", duration: "45 min", description: "Discuss your specific needs" },
    { value: "implementation", label: "Implementation Call", duration: "60 min", description: "Plan your CRM setup" },
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue("date", date as Date);

    // Generate random available times for the selected date
    if (date) {
      const randomTimes = generateRandomTimes();
      setAvailableTimes(randomTimes);

      // Reset selected time when date changes
      setSelectedTime("");
      form.setValue("time", "");
    } else {
      setAvailableTimes([]);
      setSelectedTime("");
      form.setValue("time", "");
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    form.setValue("time", time);
  };

  const handleMeetingTypeSelect = (type: string) => {
    setSelectedMeetingType(type);
    form.setValue("meetingType", type);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime && selectedMeetingType) {
      setShowContactForm(true);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Appointment booked:", values);
    alert(
      `Appointment scheduled for ${format(values.date, "PPP")} at ${
        values.time
      }. We'll send a confirmation email to ${values.email}.`
    );
    onClose?.();
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const canContinue = selectedDate && selectedTime && selectedMeetingType;

  if (showContactForm) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-dashboard-dark mb-4">
            Almost there! Just a few details
          </h2>
          <div className="flex items-center justify-center gap-4 text-dashboard-dark/70">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{selectedDate && format(selectedDate, "PPP")}</span>
            </div>
            <div className="w-1 h-1 bg-dashboard-dark/30 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{selectedTime}</span>
            </div>
            <div className="w-1 h-1 bg-dashboard-dark/30 rounded-full"></div>
            <span>{meetingTypes.find(m => m.value === selectedMeetingType)?.label}</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dashboard-dark text-base font-medium">
                      First Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        className="bg-white/90 border-dashboard-dark/20 h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dashboard-dark text-base font-medium">
                      Last Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className="bg-white/90 border-dashboard-dark/20 h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dashboard-dark text-base font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@company.com"
                        type="email"
                        {...field}
                        className="bg-white/90 border-dashboard-dark/20 h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dashboard-dark text-base font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(555) 123-4567"
                        {...field}
                        className="bg-white/90 border-dashboard-dark/20 h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-dashboard-dark text-base font-medium">
                      Company (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme Corp"
                        {...field}
                        className="bg-white/90 border-dashboard-dark/20 h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-dashboard-dark text-base font-medium">
                      What would you like to discuss? (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your goals, team size, or any specific questions..."
                        className="bg-white/90 border-dashboard-dark/20 min-h-[120px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between pt-6 border-t border-dashboard-dark/20">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowContactForm(false)}
                className="border-dashboard-dark/30 text-dashboard-dark hover:bg-dashboard-dark/10 h-12 px-6"
              >
                Back
              </Button>

              <Button
                type="submit"
                className="bg-dashboard-dark text-dashboard-accent-teal hover:bg-dashboard-dark/90 h-12 px-8"
              >
                Schedule Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-dashboard-dark/70 text-lg">
          Choose your preferred date, time, and meeting type
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Calendar */}
        <Card className="border-dashboard-dark/20 bg-white/95 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-dashboard-dark flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Select Date
            </CardTitle>
            <CardDescription className="text-dashboard-dark/60">
              Choose any weekday for your demo
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => isWeekend(date) || isPastDate(date)}
              className="scale-110"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-lg font-semibold text-dashboard-dark",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 border border-dashboard-dark/30 rounded-md text-dashboard-dark hover:bg-dashboard-dark/10"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-dashboard-dark/70 rounded-md w-12 font-medium text-sm",
                row: "flex w-full mt-2",
                cell: "h-12 w-12 text-center text-sm p-0 relative rounded-md transition-colors",
                day: "h-12 w-12 p-0 font-medium text-dashboard-dark aria-selected:opacity-100 rounded-md hover:bg-dashboard-dark/10 transition-colors",
                day_range_end: "day-range-end",
                day_selected: "bg-dashboard-dark text-dashboard-accent-teal hover:bg-dashboard-dark/90 hover:text-dashboard-accent-teal font-semibold",
                day_today: "bg-dashboard-accent-teal/20 text-dashboard-dark font-semibold border border-dashboard-accent-teal/40",
                day_outside: "text-dashboard-dark/50 opacity-70 hover:text-dashboard-dark/70",
                day_disabled: "text-dashboard-dark/30 opacity-40 cursor-not-allowed hover:bg-transparent",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
            />
          </CardContent>
        </Card>

        {/* Right Side - Time & Meeting Type */}
        <div className="space-y-6">
          {/* Time Selection */}
          <Card className="border-dashboard-dark/20 bg-white/95 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-dashboard-dark flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Select Time
              </CardTitle>
              <CardDescription className="text-dashboard-dark/60">
                All times shown in your local timezone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => handleTimeSelect(time)}
                    className={cn(
                      "h-12 text-base font-medium transition-all",
                      selectedTime === time
                        ? "bg-dashboard-dark text-dashboard-accent-teal shadow-md hover:bg-dashboard-dark/90 hover:text-dashboard-accent-teal"
                        : "border-dashboard-dark/20 text-dashboard-dark hover:bg-dashboard-dark/5 hover:border-dashboard-dark/40"
                    )}
                  >
                    {selectedTime === time && <Check className="w-4 h-4 mr-2" />}
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meeting Type Selection */}
          <Card className="border-dashboard-dark/20 bg-white/95 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-dashboard-dark flex items-center gap-2">
                <User className="h-5 w-5" />
                Meeting Type
              </CardTitle>
              <CardDescription className="text-dashboard-dark/60">
                Choose what best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {meetingTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedMeetingType === type.value ? "default" : "outline"}
                  onClick={() => handleMeetingTypeSelect(type.value)}
                  className={cn(
                    "w-full h-auto p-4 text-left justify-start transition-all",
                    selectedMeetingType === type.value
                      ? "bg-dashboard-dark text-dashboard-accent-teal shadow-md border-dashboard-dark hover:bg-dashboard-dark/90 hover:text-dashboard-accent-teal"
                      : "border-dashboard-dark/20 text-dashboard-dark hover:bg-dashboard-dark/5 hover:border-dashboard-dark/40"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      {selectedMeetingType === type.value && <Check className="w-4 h-4" />}
                      <div>
                        <div className="font-semibold text-base">{type.label}</div>
                        <div className={cn(
                          "text-sm",
                          selectedMeetingType === type.value ? "text-dashboard-accent-teal/80" : "text-dashboard-dark/60"
                        )}>
                          {type.description}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "text-xs",
                        selectedMeetingType === type.value ? "bg-dashboard-accent-teal/20 text-dashboard-accent-teal" : ""
                      )}
                    >
                      {type.duration}
                    </Badge>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleContinue}
          disabled={!canContinue}
          className={cn(
            "h-14 px-12 text-lg font-semibold transition-all",
            canContinue
              ? "bg-dashboard-dark text-dashboard-accent-teal hover:bg-dashboard-dark/90 shadow-lg"
              : "bg-dashboard-dark/40 text-dashboard-dark/60 cursor-not-allowed"
          )}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AppointmentBooker;
