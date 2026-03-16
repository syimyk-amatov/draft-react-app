import React from "react";
import "./AutoRetryLoaderDemo.scss";
import { withAutoRetry } from "./withAutoRetry";
import { Loader } from "./Loader";
// import { withAutoRetry } from './withAutoRetry';

interface UserProfileData {
  id: number;
  name: string;
  email: string;
}

interface UserProfileProps {
  data: UserProfileData;
  theme?: "light" | "dark";
}

const UserProfile: React.FC<UserProfileProps> = ({ data, theme = "light" }) => {
  return (
    <div className={`retry-demo__profile retry-demo__profile--${theme}`}>
      <h3>{data.name}</h3>
      <p>Email: {data.email}</p>
      <p>ID: {data.id}</p>
    </div>
  );
};

const UserProfileError = () => {
  return <div>Falied to load user profile</div>;
};

// Функция эмуляции нестабильного API (часто падает)
let attemptCounter = 0;
const fetchUserData = async (): Promise<UserProfileData> => {
  attemptCounter++;
  await new Promise((resolve) => setTimeout(resolve, 800)); // Имитация задержки сети

  // Успех только на 3-й попытке
  if (attemptCounter < 4) {
    throw new Error("Сетевой сбой. Сервер не ответил.");
  }

  return {
    id: 101,
    name: "Иван Иванов",
    email: "ivan@example.com",
  };
};

// TODO: Оберните компонент UserProfile в ваш HOC withAutoRetry
// HOC должен принимать fetchUserData и количество попыток (например, 3 или 4).
const UserProfileWithLoader = withAutoRetry<Omit<UserProfileProps, "data">, UserProfileData>(
  UserProfile, 
  fetchUserData, 
  3, 
  Loader, 
  UserProfileError
);

export const AutoRetryLoaderDemo: React.FC = () => {
  return (
    <div className="retry-demo">
      <h2 className="retry-demo__title">Авто-повтор запроса данных (HOC)</h2>
      <div className="retry-demo__content">
        <p>Этот компонент должен попытаться загрузить данные. Функция API настроена так, что она падает первые 2 раза и выдает успех на 3-й.</p>

        <div className="retry-demo__widget">
          {/* Замените на обернутый компонент и передайте ему нужные внешние пропсы, например theme="dark" */}
          <UserProfileWithLoader theme="dark" />
        </div>
      </div>
    </div>
  );
};
