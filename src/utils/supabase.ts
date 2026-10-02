import { supabase, PORTFOLIO_USER_ID } from "./config";

interface InsertMessageProps {
  name?: string;
  subject?: string;
  contact: string;
  message: string;
}
export async function insertMessage(messageInput: InsertMessageProps) {
  const { name, subject, contact, message } = messageInput;
  const response = await supabase
    .from("pf_messages")
    .insert([{ user_id: PORTFOLIO_USER_ID, name, subject, contact, message }]);

  return response;
}
