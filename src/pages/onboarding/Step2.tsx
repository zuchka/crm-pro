import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/lib/utils";
import OnboardingLayout from "./OnboardingLayout";

const jobRoles = [
  "Product Manager",
  "Software Engineer",
  "Designer",
  "Marketing Manager",
  "Founder/CEO",
  "Other",
];

const hearAboutOptions = [
  { id: "search-engine", label: "Search engine" },
  { id: "social-media", label: "Social media" },
  { id: "friend-colleague", label: "Friend or colleague" },
  { id: "blog-article", label: "Blog or article" },
  { id: "conference-event", label: "Conference or event" },
  { id: "other", label: "Other" },
];

const primaryGoals = [
  {
    id: "build-website",
    title: "Build a website",
    description: "Create a professional website for my business",
  },
  {
    id: "online-store",
    title: "Start an online store",
    description: "Sell products or services online",
  },
  {
    id: "portfolio",
    title: "Create a portfolio",
    description: "Showcase my work and projects",
  },
  {
    id: "blog",
    title: "Start a blog",
    description: "Share content and build an audience",
  },
  {
    id: "exploring",
    title: "Just exploring",
    description: "Learning about Builder's capabilities",
  },
];

export default function Step2() {
  const navigate = useNavigate();
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    updateData({ [field]: value } as any);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleHearAboutToggle = (optionId: string) => {
    const currentSelections = data.hearAboutBuilder || [];
    const newSelections = currentSelections.includes(optionId)
      ? currentSelections.filter((id) => id !== optionId)
      : [...currentSelections, optionId];

    updateData({ hearAboutBuilder: newSelections });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!data.workEmail.trim()) {
      newErrors.workEmail = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.workEmail)) {
      newErrors.workEmail = "Please enter a valid email address";
    }
    if (!data.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!data.jobRole) {
      newErrors.jobRole = "Job role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      nextStep();
      navigate("/onboarding/step-3");
    }
  };

  const handleBack = () => {
    prevStep();
    navigate("/onboarding/step-1");
  };

  return (
    <OnboardingLayout currentStep={2}>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold text-dashboard-text-primary">
            Tell us about yourself
          </h2>
          <p className="text-sm text-dashboard-text-secondary">
            Help us personalize your Builder experience with some basic
            information.
          </p>
        </div>

        <div className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-dashboard-text-primary">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={data.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={cn(
                  errors.fullName &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workEmail" className="text-dashboard-text-primary">
                Work Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="workEmail"
                type="email"
                placeholder="Enter your work email"
                value={data.workEmail}
                onChange={(e) => handleInputChange("workEmail", e.target.value)}
                className={cn(
                  errors.workEmail &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              {errors.workEmail && (
                <p className="text-xs text-red-500">{errors.workEmail}</p>
              )}
            </div>
          </div>

          {/* Company and Role Row */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-dashboard-text-primary">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Enter your company name"
                value={data.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className={cn(
                  errors.companyName &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              {errors.companyName && (
                <p className="text-xs text-red-500">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobRole">
                Job Role <span className="text-red-500">*</span>
              </Label>
              <Select
                value={data.jobRole}
                onValueChange={(value) => handleInputChange("jobRole", value)}
              >
                <SelectTrigger
                  className={cn(
                    errors.jobRole && "border-red-500 focus:ring-red-500",
                  )}
                >
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {jobRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.jobRole && (
                <p className="text-xs text-red-500">{errors.jobRole}</p>
              )}
            </div>
          </div>

          {/* How did you hear about Builder */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-dashboard-text-primary">
              How did you hear about Builder?
            </Label>
            <div className="grid gap-4 md:grid-cols-2">
              {hearAboutOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={data.hearAboutBuilder?.includes(option.id)}
                    onCheckedChange={() => handleHearAboutToggle(option.id)}
                  />
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-normal text-dashboard-text-primary"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Goal */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-dashboard-text-primary">
              What's your primary goal with Builder?
            </Label>
            <RadioGroup
              value={data.primaryGoal}
              onValueChange={(value) => handleInputChange("primaryGoal", value)}
              className="space-y-4"
            >
              {primaryGoals.map((goal) => (
                <div key={goal.id} className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={goal.id}
                    id={goal.id}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor={goal.id}
                      className="text-sm font-medium text-dashboard-text-primary"
                    >
                      {goal.title}
                    </Label>
                    <p className="text-xs text-dashboard-text-secondary">{goal.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-700 pt-6">
          <Button variant="outline" onClick={handleBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
