const names = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
  "Karl",
  "Leo",
  "Mallory",
  "Nina",
  "Oscar",
  "Peggy",
  "Quentin",
  "Rupert",
  "Sybil",
  "Trent",
  "Uma",
  "Victor",
  "Wendy",
  "Xander",
  "Yvonne",
  "Zach",
  "Aaron",
  "Bianca",
  "Cameron",
  "Diana",
  "Ethan",
  "Fiona",
];
export const generateName = () => {
  return names[Math.floor(Math.random() * names.length)];
};

export const generateFullName = () => {
  return `${generateName()} ${generateName()}`;
};

export const generateInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
