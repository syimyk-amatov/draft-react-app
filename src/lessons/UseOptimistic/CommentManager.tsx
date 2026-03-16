import React, { useState, useOptimistic, useTransition, useRef } from "react";
import "./CommentManager.scss";
import { fakeApi, Comment as ApiComment } from "./fakeApi";

interface OptimisticComment extends ApiComment {
  isSending?: boolean;
}

type OptimisticAction = { type: "add"; comment: OptimisticComment } | { type: "like"; id: string } | { type: "delete"; id: string };

const initialComments: ApiComment[] = [
  { id: "1", text: "This feature is awesome!", likes: 2 },
  { id: "2", text: "Needs some performance improvements though.", likes: 1 },
];

export const CommentManager: React.FC = () => {
  const [comments, setComments] = useState<ApiComment[]>(initialComments);
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticComments, dispatchOptimisticAction] = useOptimistic<OptimisticComment[], OptimisticAction>(
    comments,
    (state: OptimisticComment[], action: OptimisticAction): OptimisticComment[] => {
      switch (action.type) {
        case "add":
          return [...state, action.comment];
        case "delete":
          return state.filter((comment) => comment.id !== action.id);
        case "like":
          return [...state.map((comment) => (comment.id === action.id ? { ...comment, likes: comment.likes + 1 } : comment))];
        default:
          return state;
      }
    },
  );
  const [isPending, startTransition] = useTransition();

  const handleAddComment = async (formData: FormData) => {
    const text = formData.get("text") as string;
    if (!text.trim()) return;

    formRef.current?.reset();

    startTransition(async () => {
      dispatchOptimisticAction({
        type: "add",
        comment: { id: Date.now().toString(), text, likes: 0, isSending: true },
      });
      try {
        const newComment = await fakeApi.addComment(text);
        setComments((prev) => [...prev, newComment]);
      } catch (error) {
        console.error("Failed to add comment", error);
      }
    });
  };

  const handleLike = (id: string) => {
    startTransition(async () => {
      dispatchOptimisticAction({ type: "like", id });
      try {
        await fakeApi.likeComment(id);
        setComments((prev) => prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)));
      } catch (error) {
        console.error("Failed to like comment", error);
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      dispatchOptimisticAction({ type: "delete", id });
      try {
        await fakeApi.deleteComment(id);
        setComments((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Failed to delete comment", error);
      }
    });
  };

  return (
    <div className="comment-manager">
      <h2 className="comment-manager__title">Comments</h2>

      <div className="comment-manager__list">
        {optimisticComments.map((comment) => (
          <div key={comment.id} className={`comment-manager__item ${comment.isSending ? "comment-manager__item--sending" : ""}`}>
            <div className="comment-manager__content">
              <span className="comment-manager__text">{comment.text}</span>
            </div>
            <div className="comment-manager__actions">
              <button className="comment-manager__btn" onClick={() => handleLike(comment.id)} disabled={comment.isSending}>
                👍 {comment.likes}
              </button>
              <button
                className="comment-manager__btn comment-manager__btn--danger"
                onClick={() => handleDelete(comment.id)}
                disabled={comment.isSending}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form ref={formRef} action={handleAddComment} className="comment-manager__form">
        <input name="text" type="text" className="comment-manager__input" placeholder="Write a comment..." required />
        <button type="submit" className="comment-manager__submit-btn" disabled={isPending}>
          Post
        </button>
      </form>
    </div>
  );
};
