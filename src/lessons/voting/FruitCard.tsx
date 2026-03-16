import { ReactElement } from "react";
import { FruitVotes } from "./fruit-votes";

export const FruitCard = ({ fruit, onVote }: React.PropsWithChildren<{ fruit: FruitVotes; onVote: (name: string) => void }>): ReactElement => {
  return (
    <div className="fruit-card" onClick={() => onVote(fruit.name)}>
      <span className="fruit-name" role="img" aria-label="fruit">{fruit.name}</span>
      <span className="fruit-votes">{fruit.votes}</span>
    </div>
  );
};
