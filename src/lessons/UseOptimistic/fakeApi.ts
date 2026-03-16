export interface Comment {
  id: string;
  text: string;
  likes: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fakeApi = {
  addComment: async (text: string): Promise<Comment> => {
    await delay(1500);
    if (Math.random() < 0.2) throw new Error("Failed to add comment");
    return { id: Math.random().toString(36).substring(7), text, likes: 0 };
  },
  likeComment: async (id: string): Promise<void> => {
    await delay(1000);
    if (Math.random() < 0.2) throw new Error("Failed to like comment");
  },
  deleteComment: async (id: string): Promise<void> => {
    await delay(1000);
    if (Math.random() < 0.2) throw new Error("Failed to delete comment");
  },
};
