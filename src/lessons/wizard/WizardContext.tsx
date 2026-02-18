import React, { PropsWithChildren, useState } from "react";

export interface WizardContextType {
  step: number;
  data: any;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (newData: any) => void;
}

const defaultContext: WizardContextType = {
  step: 1,
  data: {},
  nextStep: () => {},
  prevStep: () => {},
  updateData: () => {},
};

export const WizardContext = React.createContext<WizardContextType>(defaultContext);

export const useWizard = () => React.useContext(WizardContext);

export const WizardProvider = ({ children }: PropsWithChildren) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({});
  
    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
    const updateData = (newData: any) => setData((prev: any) => ({ ...prev, ...newData }));
  
    return (
      <WizardContext.Provider value={{ step, data, nextStep, prevStep, updateData }}>
        {children}
      </WizardContext.Provider>
    );
  };
