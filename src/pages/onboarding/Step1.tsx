import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Clock, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/lib/utils";
import OnboardingLayout from "./OnboardingLayout";

const plans = [
  {
    id: "starter" as const,
    name: "Starter",
    description: "Perfect for personal projects",
    price: 0,
    features: [
      "1 website",
      "Basic templates",
      "Community support",
      "SSL certificate",
    ],
  },
  {
    id: "pro" as const,
    name: "Pro",
    description: "Best for growing businesses",
    price: 29,
    popular: true,
    features: [
      "10 websites",
      "Premium templates",
      "Priority support",
      "Custom domain",
      "Advanced analytics",
      "E-commerce features",
    ],
  },
  {
    id: "enterprise" as const,
    name: "Enterprise",
    description: "For large organizations",
    price: 99,
    features: [
      "Unlimited websites",
      "All templates",
      "24/7 phone support",
      "White-label options",
      "Advanced integrations",
      "Dedicated account manager",
    ],
  },
];

export default function Step1() {
  const navigate = useNavigate();
  const { data, updateData, nextStep } = useOnboarding();

  const handlePlanSelect = (planId: "starter" | "pro" | "enterprise") => {
    updateData({ selectedPlan: planId });
  };

  const handleBillingCycleChange = (cycle: "monthly" | "yearly") => {
    updateData({ billingCycle: cycle });
  };

  const handleContinue = () => {
    nextStep();
    navigate("/onboarding/step-2");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <OnboardingLayout currentStep={1}>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Choose your plan
          </h2>
          <p className="text-sm text-gray-600">
            Select the perfect plan for your needs. You can always upgrade or
            downgrade later.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mb-8 flex justify-center">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => handleBillingCycleChange("monthly")}
              className={cn(
                "rounded-md px-6 py-2 text-sm font-medium transition-colors",
                data.billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => handleBillingCycleChange("yearly")}
              className={cn(
                "flex items-center gap-2 rounded-md px-6 py-2 text-sm font-medium transition-colors",
                data.billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              Yearly
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative cursor-pointer border-2 p-6 transition-colors",
                data.selectedPlan === plan.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300",
              )}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                  {data.selectedPlan === plan.id && (
                    <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="ml-1 text-sm text-gray-600">/month</span>
                </div>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-900">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Trial Notice */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-blue-50 p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                14-day free trial included
              </h3>
              <p className="text-xs text-gray-600">
                No credit card required. Cancel anytime during your trial
                period.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
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
