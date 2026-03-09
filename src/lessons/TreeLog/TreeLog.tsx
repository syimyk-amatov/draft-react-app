import { createContext, memo, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";

type TreeContextValue = {
  fruit: string;
  toggleFruit: () => void;
};

const TreeContext = createContext<TreeContextValue | null>(null);

const useTreeContext = () => {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error("TreeContext is not provided");
  }

  return context;
};

const BranchLogBase = ({ children, label }: PropsWithChildren<{ label: string }>) => {
  const { fruit } = useTreeContext();

  console.log(`[render] ${label}. fruit from context: ${fruit}`);

  return (
    <div>
      <b>{label}</b>: <span>{fruit}</span>
      {children}
    </div>
  );
};

const BranchLog = memo(BranchLogBase);

const LeafControlBase = () => {
  const { fruit, toggleFruit } = useTreeContext();

  console.log(`[render] LeafControl. fruit from context: ${fruit}`);

  return <button onClick={toggleFruit}>Сменить fruit из context: {fruit}</button>;
};

const LeafControl = memo(LeafControlBase);

const TreeBranchesBase = () => {
  return (
    <BranchLog label="Branch 1">
      <BranchLog label="Branch 2">
        <LeafControl />
      </BranchLog>
    </BranchLog>
  );
};

const TreeBranches = memo(TreeBranchesBase);

export const TreeLog = () => {
  const [fruit, setFruit] = useState("🥝");
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  console.log(`[render] TreeLog. unrelatedCounter: ${unrelatedCounter}, fruit: ${fruit}`);

  const toggleFruit = useCallback(() => {
    setFruit((currentFruit) => (currentFruit === "🥝" ? "🥥" : "🥝"));
  }, []);

  const contextValue: TreeContextValue = useMemo(
    () => ({
      fruit,
      toggleFruit,
    }),
    [fruit, toggleFruit]
  );

  return (
    <div>
      <p>Оптимизированный пример: useCallback/useMemo стабилизируют context value и уменьшают лишние ререндеры.</p>
      <button onClick={() => setUnrelatedCounter((counter) => counter + 1)}>
        Изменить не связанный state: {unrelatedCounter}
      </button>

      <TreeContext.Provider value={contextValue}>
        <TreeBranches />
      </TreeContext.Provider>
    </div>
  );
};
