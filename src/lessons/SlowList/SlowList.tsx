import { useState, useTransition, useMemo } from "react";
import { generateFullName, generateInt } from "../../common/utils/MockDataGenerator";

interface ListItem {
  id: number;
  name: string;
  age: number;
}

export const generateList = (length: number): ListItem[] => {
  const list: ListItem[] = [];
  for (let i = 0; i < length; i++) {
    list.push({
      id: i,
      name: generateFullName(),
      age: generateInt(18, 80),
    });
  }
  return list;
};

export const ShowList = ({ list }: { list: ListItem[] }) => {
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deferredQuery, setDeferredQuery] = useState("");

  const items = useMemo(() => {
    return list.filter((item) => item.name.toLowerCase().includes(deferredQuery.toLowerCase()));
  }, [list, deferredQuery]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);

    startTransition(() => {
      setDeferredQuery(value);
    });
  };

  return (
    <div>
      <h2>List of {items.length} items</h2>
      <div>
        <label htmlFor="search">Search: </label>
        <input id="search" name="search" placeholder="Search..." value={inputValue} onChange={onChange} />
        {isPending && <span style={{ marginLeft: 10, color: "gray" }}>Updating list...</span>}
      </div>
      <div style={{ maxHeight: "400px", overflowY: "scroll", border: "1px solid #ccc", marginTop: "10px", opacity: isPending ? 0.5 : 1 }}>
        {items.map((item) => (
          <div key={item.id}>
            {item.name} - {item.age} years old
          </div>
        ))}
      </div>
    </div>
  );
};

export const DemoShowList = () => {
  const list = generateList(1000);
  return <ShowList list={list} />;
};
