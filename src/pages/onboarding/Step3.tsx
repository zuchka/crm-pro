import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/hooks/use-onboarding";
import OnboardingLayout from "./OnboardingLayout";

export default function Step3() {
  const navigate = useNavigate();
  const { data, updateData, prevStep, resetOnboarding } = useOnboarding();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleCheckboxChange = (
    field: "emailNotifications" | "productUpdates",
    checked: boolean,
  ) => {
    updateData({ [field]: checked });
  };

  const handleCompleteSetup = async () => {
    setIsCompleting(true);
    setShowSuccessAlert(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would send the data to your API here
    console.log("Onboarding completed with data:", data);

    setIsCompleting(false);

    // Navigate to dashboard or main app after a delay
    setTimeout(() => {
      resetOnboarding();
      navigate("/");
    }, 2000);
  };

  const handleBack = () => {
    prevStep();
    navigate("/onboarding/step-2");
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <OnboardingLayout
      currentStep={3}
      showSuccessAlert={showSuccessAlert}
      onCloseAlert={handleCloseAlert}
    >
      <div className="p-8">
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold text-dashboard-text-primary">
            Almost done!
          </h2>
          <p className="text-sm text-dashboard-text-secondary">
            Just a few final preferences to personalize your experience with
            Builder.
          </p>
        </div>

        <div className="space-y-8">
          {/* Communication Preferences */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-dashboard-text-primary">
              Communication Preferences
            </Label>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="emailNotifications"
                  checked={data.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("emailNotifications", !!checked)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="emailNotifications"
                    className="text-sm font-medium text-dashboard-text-primary"
                  >
                    Email notifications
                  </Label>
                  <p className="text-xs text-dashboard-text-secondary">
                    Receive important updates about your account and new
                    features
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="productUpdates"
                  checked={data.productUpdates}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("productUpdates", !!checked)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="productUpdates"
                    className="text-sm font-medium text-dashboard-text-primary"
                  >
                    Product updates and tips
                  </Label>
                  <p className="text-xs text-dashboard-text-secondary">
                    Get helpful tips and learn about new Builder features
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-600" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Privacy Notice
                </h3>
                <p className="mt-2 text-sm text-gray-900">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy. You can change your communication preferences at any
                  time in your account settings.
                </p>
              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div className="rounded-md border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-3 text-sm font-medium text-dashboard-text-primary">
              Account Summary
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex">
                <span className="w-16 font-medium text-dashboard-text-secondary">
                  Name:
                </span>
                <span className="text-dashboard-text-secondary">
                  {data.fullName || "Not provided"}
                </span>
              </div>
              <div className="flex">
                <span className="w-16 font-medium text-dashboard-text-secondary">
                  Email:
                </span>
                <span className="text-dashboard-text-secondary">
                  {data.workEmail || "Not provided"}
                </span>
              </div>
              <div className="flex">
                <span className="w-16 font-medium text-dashboard-text-secondary">
                  Company:
                </span>
                <span className="text-dashboard-text-secondary">
                  {data.companyName || "Not provided"}
                </span>
              </div>
              <div className="flex">
                <span className="w-16 font-medium text-dashboard-text-secondary">
                  Role:
                </span>
                <span className="text-dashboard-text-secondary">
                  {data.jobRole || "Not provided"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-700 pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isCompleting}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleCompleteSetup}
            disabled={isCompleting}
            className="min-w-[140px]"
          >
            {isCompleting ? (
              "Completing..."
            ) : (
              <>
                Complete Setup
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
