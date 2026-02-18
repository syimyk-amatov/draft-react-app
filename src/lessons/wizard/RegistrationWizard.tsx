import { WizardProvider, useWizard } from "./WizardContext";
import { WizardNavigation } from "./WizardNavigation";
import { WizardSummary } from "./WizardSummary";
import "./RegistrationWizard.scss";
import { useTheme } from "../theme/ThemeContext";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";

export const RegistrationWizard = () => {
  const { theme } = useTheme();

  return (
    <div className={`registration-wizard ${theme}`}>
      <ThemeSwitcher />
      <h1>Registration Wizard</h1>
      <WizardProvider>
        <div className="wizard-container">
          <WizardContent />
          <WizardNavigation />
        </div>
      </WizardProvider>
    </div>
  );
};

const WizardContent = () => {
  const { step } = useWizard();

  switch (step) {
    case 1:
      return <Step1Personal />;
    case 2:
      return <Step2Contact />;
    case 3:
      return <Step3Security />;
    case 4:
      return <WizardSummary />;
    default:
      return null;
  }
};

const Step1Personal = () => {
  const { data, updateData } = useWizard();
  return (
    <div className="wizard-step">
      <h2>Step 1: Personal Information</h2>
      <div className="wizard-form-field">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={data.firstName || ""} onChange={(e) => updateData({ firstName: e.target.value })} />
      </div>
      <div className="wizard-form-field">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={data.lastName || ""} onChange={(e) => updateData({ lastName: e.target.value })} />
      </div>
    </div>
  );
};

const Step2Contact = () => {
  const { data, updateData } = useWizard();
  return (
    <div className="wizard-step">
      <h2>Step 2: Contact Details</h2>
      <div className="wizard-form-field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={data.email || ""} onChange={(e) => updateData({ email: e.target.value })} />
      </div>
      <div className="wizard-form-field">
        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" value={data.phone || ""} onChange={(e) => updateData({ phone: e.target.value })} />
      </div>
    </div>
  );
};

const Step3Security = () => {
  const { data, updateData } = useWizard();
  return (
    <div className="wizard-step">
      <h2>Step 3: Security</h2>
      <div className="wizard-form-field">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={data.password || ""} onChange={(e) => updateData({ password: e.target.value })} />
      </div>
      <div className="wizard-form-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={data.confirmPassword || ""}
          onChange={(e) => updateData({ confirmPassword: e.target.value })}
        />
      </div>
    </div>
  );
};
