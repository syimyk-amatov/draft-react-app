import { useWizard } from "./WizardContext";

export const WizardNavigation = () => {
  const { step, nextStep, prevStep } = useWizard();

  if (step === 4) return null;

  return (
    <div className="wizard-navigation">
      <button className="btn-prev" onClick={prevStep} disabled={step === 1}>
        Back
      </button>
      <button className="btn-next" onClick={nextStep}>
        Next
      </button>
    </div>
  );
};
