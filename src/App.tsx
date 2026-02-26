import "./App.scss";
import { DocumentTitleCounter } from "./lessons/document-title-counter/DocumentTitleCounter";
import { PasswordGenerator } from "./lessons/PasswordGenerator/PasswordGenerator";
import { TableDashboard } from "./lessons/TableDashboard/TableDashboard";
import { ThemeProvider } from "./lessons/theme/ThemeContext";
import { TodoList } from "./lessons/TodoList/TodoList";
import { TooltipDemo } from "./lessons/Tooltip/Tooltip";
import { TransactionAnalyticsDemo } from "./lessons/TransactionAnalytics/TransactionAnalyticsDemo";
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
        <TableDashboard />
        <TransactionAnalyticsDemo />
        <TooltipDemo />
        <PasswordGenerator />
        <TodoList />
        <DocumentTitleCounter />
        <RegistrationWizard />
        <FruitVotingApp />
      </div>
    </ThemeProvider>
  );
}

export default App;
