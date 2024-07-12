import React from "react";

import { Chat } from "./chat";
import { ConversationProps } from "@/app/(protected)/chat/types";

export function ChatLayout({ email, cookie, data }: ConversationProps) {
  return <Chat data={data} email={email} cookie={cookie} />;
}
