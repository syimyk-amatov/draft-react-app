import { useState } from "react";
import "./tic-tac-toe-game.scss";

enum FieldValue {
  Unset,
  Naught,
  Cross,
}

const Naught = () => {
  return <div className="naught"></div>;
};

const Cross = () => {
  return (
    <div className="cross">
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
};

type FieldProps = {
  value: FieldValue;
  rowIndex: number;
  colIndex: number;
  onSelect: (rowIndex: number, colIndex: number) => void;
};

const Field = ({ value, rowIndex, colIndex, onSelect }: FieldProps) => {
  let fieldContent: JSX.Element | null;
  switch (value) {
    case FieldValue.Naught:
      fieldContent = <Naught />;
      break;
    case FieldValue.Cross:
      fieldContent = <Cross />;
      break;
    default:
      fieldContent = null;
      break;
  }

  return (
    <div onClick={() => onSelect(rowIndex, colIndex)} className="field">
      {fieldContent}
    </div>
  );
};

const Board = () => {
  const [matrix, setMatrix] = useState<Array<[FieldValue, FieldValue, FieldValue]>>([
    [FieldValue.Unset, FieldValue.Unset, FieldValue.Unset],
    [FieldValue.Unset, FieldValue.Unset, FieldValue.Unset],
    [FieldValue.Unset, FieldValue.Unset, FieldValue.Unset],
  ]);
  const [isCrossAct, setIsCrossAct] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleSelect = (rowIndex: number, colIndex: number) => {
    if (matrix[rowIndex][colIndex] === FieldValue.Unset) {
      matrix[rowIndex][colIndex] = isCrossAct ? FieldValue.Cross : FieldValue.Naught;
      matrix[rowIndex] = [...matrix[rowIndex]];
      setMatrix([...matrix]);
      setIsCrossAct(!isCrossAct);
      checkWin();
    }
  };

  const checkWin = () => {
    let prev: FieldValue | null;
    matrix.some((row) => {
      prev = null;
      let isEverySame = true;
      row.forEach((curr) => {
        if (prev) {
          if (prev !== curr) {
            isEverySame = false;
          }
        }
      });

      return isEverySame;
    });
  };

  const refresh = () => {
    setMatrix(
      matrix.map((row) => {
        return row.map(() => FieldValue.Unset);
      }) as Array<[FieldValue, FieldValue, FieldValue]>
    );
    setIsCrossAct(true);
  };

  return (
    <>
      <div className="board-container">
        <div className="board">
          {matrix.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="row">
                {row.map((field, colIndex) => (
                  <Field key={colIndex} value={field} onSelect={handleSelect} rowIndex={rowIndex} colIndex={colIndex} />
                ))}
              </div>
            );
          })}
        </div>
        {winner ? <div className="winner-banner">{winner === FieldValue.Cross ? "Cross" : "Naught"} wins!</div> : null}
      </div>
      <button onClick={refresh} type="button">
        Refresh
      </button>
    </>
  );
};

export const TicTacToeGame = () => {
  return <Board></Board>;
};
