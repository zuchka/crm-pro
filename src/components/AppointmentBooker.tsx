import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
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
import { CalendarIcon, Clock, User, Mail, Phone } from "lucide-react";
import { format } from "date-fns";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    undefined
  );
  const [step, setStep] = useState<"date" | "details">("date");

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

  // Available time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  // Meeting types
  const meetingTypes = [
    { value: "demo", label: "Product Demo", duration: "30 min" },
    { value: "consultation", label: "Sales Consultation", duration: "45 min" },
    { value: "implementation", label: "Implementation Call", duration: "60 min" },
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue("date", date as Date);
    if (date) {
      setStep("details");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Appointment booked:", values);
    // Here you would typically send the data to your backend
    alert(
      `Appointment scheduled for ${format(values.date, "PPP")} at ${
        values.time
      }. We'll send a confirmation email to ${values.email}.`
    );
    onClose?.();
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {step === "date" ? (
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-dashboard-dark flex items-center justify-center gap-2">
              <CalendarIcon className="h-6 w-6" />
              Select a Date
            </CardTitle>
            <CardDescription className="text-dashboard-dark/70">
              Choose your preferred date for the demo
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => isWeekend(date) || isPastDate(date)}
              className="rounded-md border-dashboard-dark/20 bg-white/90"
              classNames={{
                day_selected: "bg-dashboard-dark text-dashboard-accent-teal",
                day_today: "bg-dashboard-accent-teal/20 text-dashboard-dark",
                day_disabled: "text-dashboard-dark/30",
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-dashboard-dark mb-2">
              Complete Your Booking
            </h2>
            <div className="flex items-center justify-center gap-2 text-dashboard-dark/70">
              <CalendarIcon className="h-4 w-4" />
              <span>{selectedDate && format(selectedDate, "PPP")}</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-dashboard-dark flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-dashboard-dark">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              className="bg-white/90 border-dashboard-dark/20"
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
                          <FormLabel className="text-dashboard-dark">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              {...field}
                              className="bg-white/90 border-dashboard-dark/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dashboard-dark flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            type="email"
                            {...field}
                            className="bg-white/90 border-dashboard-dark/20"
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
                        <FormLabel className="text-dashboard-dark flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(555) 123-4567"
                            {...field}
                            className="bg-white/90 border-dashboard-dark/20"
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
                      <FormItem>
                        <FormLabel className="text-dashboard-dark">
                          Company (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Acme Corp"
                            {...field}
                            className="bg-white/90 border-dashboard-dark/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column - Meeting Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-dashboard-dark flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Meeting Details
                  </h3>

                  <FormField
                    control={form.control}
                    name="meetingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dashboard-dark">
                          Meeting Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/90 border-dashboard-dark/20">
                              <SelectValue placeholder="Select meeting type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {meetingTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center justify-between w-full">
                                  <span>{type.label}</span>
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 text-xs"
                                  >
                                    {type.duration}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dashboard-dark">
                          Preferred Time
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/90 border-dashboard-dark/20">
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-dashboard-dark/60">
                          All times are in your local timezone
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dashboard-dark">
                          Additional Notes (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your goals, team size, or any specific questions..."
                            className="bg-white/90 border-dashboard-dark/20 min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-dashboard-dark/20">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("date")}
                  className="border-dashboard-dark/20 text-dashboard-dark hover:bg-dashboard-dark/10"
                >
                  Back to Calendar
                </Button>

                <Button
                  type="submit"
                  className="bg-dashboard-dark text-dashboard-accent-teal hover:bg-dashboard-dark/90"
                >
                  Schedule Demo
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooker;
