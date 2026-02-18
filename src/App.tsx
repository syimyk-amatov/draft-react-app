import "./App.scss";
import { DocumentTitleCounter } from "./lessons/document-title-counter/DocumentTitleCounter";
import { IdleTimer } from "./lessons/IdleTimer/IdleTimer";
import { ThemeProvider } from "./lessons/theme/ThemeContext";
import { FruitVotingApp } from "./lessons/voting/FruitVotingApp";
import { RegistrationWizard } from "./lessons/wizard/RegistrationWizard";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wk-classifications-demo": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <IdleTimer />
        <DocumentTitleCounter />
        <RegistrationWizard />
        <FruitVotingApp />
      </div>
    </ThemeProvider>
  );
}

export default App;
