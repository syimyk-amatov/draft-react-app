import "./App.scss";
import { MyComponent } from "./draft";
import { BarChartDemo } from "./lessons/Charts/BarChart";
import { Chat } from "./lessons/Chat/Chat";
import { CounterReducer } from "./lessons/CounterReducer/CounterReducer";
import { DocumentTitleCounter } from "./lessons/document-title-counter/DocumentTitleCounter";
import { AccessControlDemo } from "./lessons/HOC/AccessControl/AccessControlDemo";
import { AutoRetryLoaderDemo } from "./lessons/HOC/AutoRetryLoader/AutoRetryLoaderDemo";
import { PasswordGenerator } from "./lessons/PasswordGenerator/PasswordGenerator";
import { DemoShowList } from "./lessons/SlowList/SlowList";
import { TabContainer } from "./lessons/TabContainer/TabContainer";
import { TableDashboard } from "./lessons/TableDashboard/TableDashboard";
import { ThemeProvider } from "./lessons/theme/ThemeContext";
import { TodoList } from "./lessons/TodoList/TodoList";
import { TooltipDemo } from "./lessons/Tooltip/Tooltip";
import { TransactionAnalyticsDemo } from "./lessons/TransactionAnalytics/TransactionAnalyticsDemo";
import { TreeLog } from "./lessons/TreeLog/TreeLog";
import { AnalyticsChat } from "./lessons/UseEffectEvent/AnalyticsChat/AnalyticsChat";
import { AutoSaveDraft } from "./lessons/UseEffectEvent/AutoSaveDraft/AutoSaveDraft";
import { CommentManager } from "./lessons/UseOptimistic/CommentManager";
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
        <AutoRetryLoaderDemo />
      </div>
    </ThemeProvider>
  );
}

export default App;
