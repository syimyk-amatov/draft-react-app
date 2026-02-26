export const fakeDataGenerator = (count: number) => {
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
  ];
  const data = [];

  for (let i = 0; i < count; i++) {
    data.push({
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 60) + 20,
      dob: new Date(1980 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
    });
  }
  return data;
};
