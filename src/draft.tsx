import { PropsWithChildren, useState } from "react";

const Container = ({ children }: PropsWithChildren<{}>) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+{count}</button>
      {children}
    </div>
  );
};

const A = () => {
  console.log("A rendered");
  return <div>A</div>;
};

const B = () => {
  console.log("B rendered");
  return <div>B</div>;
};

export const MyComponent = () => {
  return (
    <Container>
      <A />
      <B />
    </Container>
  );
};
