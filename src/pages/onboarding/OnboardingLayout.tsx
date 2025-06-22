import { CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  showSuccessAlert?: boolean;
  onCloseAlert?: () => void;
}

export default function OnboardingLayout({
  children,
  currentStep,
  showSuccessAlert = false,
  onCloseAlert,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-dashboard-dark">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dashboard-accent-teal">
              <CheckCircle className="h-5 w-5 text-dashboard-dark" />
            </div>
            <h1 className="text-2xl font-semibold text-dashboard-text-primary">
              Welcome to CRMPro
            </h1>
          </div>
          <div className="text-sm text-dashboard-text-muted">
            Step {currentStep} of 3
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-1">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={cn(
                "h-1 flex-1 rounded-full",
                step <= currentStep
                  ? "bg-dashboard-accent-teal"
                  : "bg-dashboard-sidebar",
              )}
            />
          ))}
        </div>

        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="mb-6 flex items-start gap-3 rounded-md border border-dashboard-accent-teal bg-dashboard-accent-teal/10 p-4">
            <CheckCircle className="mt-0.5 h-4 w-4 text-dashboard-accent-teal" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-dashboard-text-primary">
                Success!
              </h3>
              <p className="text-sm text-dashboard-text-secondary">
                Welcome aboard! Your account has been set up successfully.
              </p>
            </div>
            {onCloseAlert && (
              <button
                onClick={onCloseAlert}
                className="text-dashboard-text-muted hover:text-dashboard-text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="rounded-lg border border-dashboard-sidebar bg-dashboard-card shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
