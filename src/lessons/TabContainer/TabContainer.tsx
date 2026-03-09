import { useState, useTransition } from "react";
import { ContactTab, HomeTab, PostsTab } from "./TabWidgets";
import "./TabContainer.scss";

export const TabContainer = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [displayTabWidget, setDisplayTabWidget] = useState("Home");
  const [isPending, startTransition] = useTransition();
  const tabs = ["Home", "Posts", "Contact"];

  const renderActiveTab = () => {
    switch (displayTabWidget) {
      case "Home":
        return <HomeTab />;
      case "Posts":
        return <PostsTab />;
      case "Contact":
        return <ContactTab />;
      default:
        return null;
    }
  };

  const onTabClick = (tab: string) => {
    setActiveTab(tab); // быстрый визуальный отклик на кнопку
    startTransition(() => {
      setDisplayTabWidget(tab); // тяжелое обновление в transition
    });
  };

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => onTabClick(tab)} style={{ marginRight: 10 }} className={activeTab === tab ? "active" : ""}>
            {tab}
          </button>
        ))}
      </div>

      {isPending && <div className="loading-indicator">Loading...</div>}
      <div style={{ marginTop: 20 }}>{renderActiveTab()}</div>
    </div>
  );
};
