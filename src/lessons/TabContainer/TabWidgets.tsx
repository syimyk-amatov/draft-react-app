const delay = (duration: number) => {
  const start = Date.now();
  while (Date.now() - start < duration) {}
};

export const PostsTab = () => {
  delay(2000);
  return <div>Posts</div>;
};

export const ContactTab = () => {
  delay(200);
  return <div>Contact</div>;
};

export const HomeTab = () => {
  delay(300);
  return <div>Home</div>;
};
