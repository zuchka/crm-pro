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
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome to Builder
            </h1>
          </div>
          <div className="text-sm text-gray-600">Step {currentStep} of 3</div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-1">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={cn(
                "h-1 flex-1 rounded-full",
                step <= currentStep ? "bg-blue-600" : "bg-gray-200",
              )}
            />
          ))}
        </div>

        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="mb-6 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 p-4">
            <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">Success!</h3>
              <p className="text-sm text-gray-900">
                Welcome aboard! Your account has been set up successfully.
              </p>
            </div>
            {onCloseAlert && (
              <button
                onClick={onCloseAlert}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
