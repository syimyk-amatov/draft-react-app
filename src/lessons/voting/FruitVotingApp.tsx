import { useState } from "react";
import { FruitWinnerDisplay } from "./FruitWinnerDisplay";
import { FruitCard } from "./FruitCard";
import "./FruitVotingApp.scss";
import { useTheme } from "../theme/ThemeContext";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";

export const FruitVotingApp = (): JSX.Element => {
  const fruits = ["🍎", "🍌", "🍊", "🍇", "🍉"];
  const [fruitVotes, setFruitVotes] = useState(fruits.map((fruit) => ({ name: fruit, votes: 0 })));
  const { theme } = useTheme();

  const onVote = (name: string) => {
    setFruitVotes((prevVotes) => prevVotes.map((fruit) => (fruit.name === name ? { ...fruit, votes: fruit.votes + 1 } : fruit)));
  };

  return (
    <div className={`fruit-voting-app ${theme}`}>
      <div style={{ position: "absolute", top: "1rem", right: "1.5rem" }}>
        <ThemeSwitcher />
      </div>
      <h1>Fruit Voting App</h1>
      <FruitWinnerDisplay fruitVotes={fruitVotes} />
      <div className="fruit-cards">
        {fruitVotes.map((fruit) => (
          <FruitCard key={fruit.name} fruit={fruit} onVote={onVote} />
        ))}
      </div>
    </div>
  );
};
