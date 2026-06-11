import React, { createContext, useContext, useState } from "react";
import { WizardData } from "../components/QuickSetupWizard";

interface BrandContextValue {
  brandData: WizardData | null;
  setBrandData: (data: WizardData) => void;
}

const BrandContext = createContext<BrandContextValue>({
  brandData: null,
  setBrandData: () => {},
});

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brandData, setBrandData] = useState<WizardData | null>(null);
  return (
    <BrandContext.Provider value={{ brandData, setBrandData }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}