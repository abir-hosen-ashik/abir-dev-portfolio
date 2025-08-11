import { supabase } from "./config";

interface InsertMessageProps {
  name?: string;
  subject?: string;
  contact: string;
  message: string;
}
export async function insertMessage(messageInput: InsertMessageProps) {
  const { name, subject, contact, message } = messageInput;
  const response = await supabase
    .from("message")
    .insert([{ name, subject, contact, message }]);

  return response;
}
