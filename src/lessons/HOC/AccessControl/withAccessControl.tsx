import React from "react";

export type Role = "admin" | "editor" | "viewer" | "guest";

const isAuthenticated = (role: Role) => {
  return role !== "guest";
};

// Мок-хук авторизации для задачи
export const useAuth = () => {
  // Меняйте эту константу при локальном тестировании
  const currentRole: Role = "guest";

  return {
    role: currentRole,
    isAuthenticated: isAuthenticated(currentRole),
  };
};

export function withAccessControl<P extends object>(Widget: React.ComponentType<P>, allowedRoles: Role[], Fallback?: React.ComponentType) {
  const WrappedComponent: React.FC<P> = (props: P) => {
    const { role, isAuthenticated } = useAuth();
    const hasAccess = allowedRoles.includes(role) && isAuthenticated;

    if (!hasAccess) {
      return Fallback ? <Fallback /> : null;
    }

    return <Widget {...props} />;
  };

  WrappedComponent.displayName = `withAccessControl(${Widget.displayName || Widget.name || "Component"})`;

  return WrappedComponent;
}
