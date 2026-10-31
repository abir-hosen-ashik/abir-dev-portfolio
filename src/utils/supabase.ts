import { supabase, PORTFOLIO_USER_ID } from "./config";

interface InsertMessageProps {
  name?: string;
  subject?: string;
  contact: string;
  message: string;
  /** Slug of the portfolio version it is sent from (batools 066). */
  version?: string;
}
export async function insertMessage(messageInput: InsertMessageProps) {
  const { name, subject, contact, message, version } = messageInput;
  const row = { user_id: PORTFOLIO_USER_ID, name, subject, contact, message };
  const response = await supabase.from("pf_messages").insert([version ? { ...row, version } : row]);
  // Before batools 066 there is no version column: keep the message anyway.
  if (response.error && version && /version/.test(response.error.message)) {
    return supabase.from("pf_messages").insert([row]);
  }
  return response;
}
