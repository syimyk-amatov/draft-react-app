export enum MessageState {
  Sending = "Sending",
  Sent = "Sent",
  Failed = "Failed",
}

export interface Message {
  id: string;
  text: string;
  status: MessageState;
}

export async function sendMessage(text: string): Promise<Message> {
  await new Promise((r) => setTimeout(r, 2000));

  const forbiddenWords = ["bad", "ugly", "stupid"];
  if (forbiddenWords.some((word) => text.includes(word))) {
    throw new Error("Network error");
  }

  return {
    id: crypto.randomUUID(),
    text,
    status: MessageState.Sent,
  };
}
