import React from "react";
import "./AccessControlDemo.scss";
import { withAccessControl } from "./withAccessControl";

interface DashboardProps {
  title: string;
}

// Компонент, доступный только 'admin'
const AdminDashboard: React.FC<DashboardProps> = ({ title }) => {
  return (
    <div className="access-demo__admin">
      <h3>👑 {title} </h3>
      <p>У вас есть полный доступ к настройкам сервера.</p>
    </div>
  );
};

// Компонент, доступный 'admin' и 'editor'
const EditorWorkspace: React.FC = () => {
  return (
    <div className="access-demo__editor">
      <h3>📝 Рабочая область реактора</h3>
      <p>Вы можете изменять статьи.</p>
    </div>
  );
};

const FallbackComponent: React.FC = () => <div className="access-demo__fallback">⛔ Доступ запрещен. Вам нужна другая роль.</div>;

export const ProtectedAdminDashboard = withAccessControl(AdminDashboard, ["admin"], FallbackComponent);
export const ProtectedEditorWorkspace = withAccessControl(EditorWorkspace, ["admin", "editor"], FallbackComponent);

export const AccessControlDemo: React.FC = () => {
  return (
    <div className="access-demo">
      <h2 className="access-demo__title">Демо Контроля Доступа</h2>
      <div className="access-demo__content">
        <ProtectedAdminDashboard title="Секретная Админка" />
        <ProtectedEditorWorkspace />
      </div>
    </div>
  );
};
