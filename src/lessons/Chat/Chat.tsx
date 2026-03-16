import { useState, useOptimistic, startTransition } from "react";
import { Message, MessageState, sendMessage } from "./Chat-Api";
import "./Chat.scss";

const StatusIcon = ({ status }: { status: MessageState }) => {
  switch (status) {
    case MessageState.Sending:
      return (
        <svg
          className="chat__icon chat__icon--spin"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      );
    case MessageState.Sent:
      return (
        <svg
          className="chat__icon chat__icon--sent"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case MessageState.Failed:
      return (
        <svg
          className="chat__icon chat__icon--error"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    default:
      return null;
  }
};

export const Chat = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], Message>(
    messages,
    (state, newMessage) => [...state, newMessage]
  );

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textToSend = inputValue;
    setInputValue("");
    
    startTransition(async () => {
      addOptimisticMessage({
        id: crypto.randomUUID(),
        text: textToSend,
        status: MessageState.Sending,
      });
      
      try {
        const sentMessage = await sendMessage(textToSend);
        setMessages((prev) => [...prev, sentMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            text: textToSend,
            status: MessageState.Failed,
          },
        ]);
      }
    });
  };

  return (
    <div className="chat">
      <h1 className="chat__title">Chat</h1>
      <div className="chat__message-list">
        {optimisticMessages.length === 0 && <div className="chat__empty-state">No messages yet. Say hi!</div>}
        {optimisticMessages.map((message) => (
          <div key={message.id} className={`chat__message ${message.status === MessageState.Sending ? "chat__message--sending" : ""}`}>
            <span className="chat__message-text">{message.text}</span>
            <span className="chat__message-status" title={message.status}>
              <StatusIcon status={message.status} />
            </span>
          </div>
        ))}
      </div>
      <form className="chat__form" onSubmit={handleSubmit}>
        <input
          className="chat__input"
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="chat__submit-btn" type="submit" disabled={!inputValue.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};
