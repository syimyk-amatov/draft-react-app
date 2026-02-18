import { FruitVotes } from "./fruit-votes";

export const FruitWinnerDisplay = ({ fruitVotes }: React.PropsWithChildren<{ fruitVotes: FruitVotes[] }>): JSX.Element => {
  const maxVotes = Math.max(...fruitVotes.map(f => f.votes));
  const winners = fruitVotes.filter(f => f.votes === maxVotes);
  const hasWinner = maxVotes > 0;

  return (
    <div className="winner-display">
      <h2>{winners.length > 1 ? "Current Leaders" : "Current Leader"}</h2>
      {hasWinner ? (
        <div className="winner-content">
          <div className="winners-list">
             {winners.map(winner => (
               <div key={winner.name} className="winner-item">
                  <div className="winner-icon">{winner.name}</div>
               </div>
             ))}
          </div>
          <div className="winner-count">{maxVotes} Votes</div>
        </div>
      ) : (
        <p>Place your votes!</p>
      )}
    </div>
  );
};
