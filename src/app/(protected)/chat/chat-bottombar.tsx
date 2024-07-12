import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  Smile,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Message, loggedInUserData } from "./data";
import { Textarea } from "@/components/ui/textarea";

import { ChatMessage, Data } from "@/app/(protected)/chat/types";

interface ChatBottombarProps {
  isMobile: boolean;
  data: Data;
  sendPrivateValue: (message: string) => void;
  email?: string;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  email,
  isMobile,
  data,
  sendPrivateValue,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const whosTurn = data.members[0].email === email ? 0 : 1;
  const othersTurn = data.members[0].email === email ? 1 : 0;
  const handleThumbsUp = () => {
    const newMessage: ChatMessage = {
      messageId: "1",
      senderUser: {
        name: data.members[whosTurn].name,
        email: data.members[whosTurn].email,
      },
      receiverUser: {
        name: data.members[othersTurn].name,
        email: data.members[othersTurn].email,
      },
      messageText: "👍",
    };
    sendPrivateValue(newMessage.messageText);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        messageId: "1",
        senderUser: {
          name: data.members[whosTurn].name,
          email: data.members[whosTurn].email,
        },
        receiverUser: {
          name: data.members[othersTurn].name,
          email: data.members[othersTurn].email,
        },
        messageText: message.trim(),
      };
      sendPrivateValue(newMessage.messageText);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
          ></Textarea>
        </motion.div>

        {message.trim() ? (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleThumbsUp}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
