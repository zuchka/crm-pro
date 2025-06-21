import { create } from "zustand";

export interface OnboardingData {
  // Step 1: Plan selection
  billingCycle: "monthly" | "yearly";
  selectedPlan: "starter" | "pro" | "enterprise";

  // Step 2: User information
  fullName: string;
  workEmail: string;
  companyName: string;
  jobRole: string;
  hearAboutBuilder: string[];
  primaryGoal: string;

  // Step 3: Preferences
  emailNotifications: boolean;
  productUpdates: boolean;
}

interface OnboardingStore {
  currentStep: number;
  data: OnboardingData;
  setCurrentStep: (step: number) => void;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOnboarding: () => void;
}

const initialData: OnboardingData = {
  billingCycle: "monthly",
  selectedPlan: "pro",
  fullName: "",
  workEmail: "",
  companyName: "",
  jobRole: "",
  hearAboutBuilder: [],
  primaryGoal: "",
  emailNotifications: true,
  productUpdates: false,
};

export const useOnboarding = create<OnboardingStore>((set, get) => ({
  currentStep: 1,
  data: initialData,
  setCurrentStep: (step) => set({ currentStep: step }),
  updateData: (updates) =>
    set((state) => ({
      data: { ...state.data, ...updates },
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 3),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
  resetOnboarding: () => set({ currentStep: 1, data: initialData }),
}));
