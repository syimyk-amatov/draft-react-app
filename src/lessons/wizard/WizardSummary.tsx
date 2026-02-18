import React from "react";
import { useWizard } from "./WizardContext";

export const WizardSummary = () => {
  const { data } = useWizard();
  return (
    <div className="wizard-step wizard-summary">
      <h2>Summary</h2>
      <div className="summary-item">
          <strong>First Name:</strong> {data.firstName}
      </div>
      <div className="summary-item">
          <strong>Last Name:</strong> {data.lastName}
      </div>
      <div className="summary-item">
          <strong>Email:</strong> {data.email}
      </div>
      <div className="summary-item">
          <strong>Phone:</strong> {data.phone}
      </div>
    </div>
  );
};
