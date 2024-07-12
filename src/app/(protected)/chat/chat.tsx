"use client";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";
import { userData } from "./data";
import { ChatMessage, ConversationProps } from "@/app/(protected)/chat/types";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { Button } from "@/components/ui/button";

var stompClient: any = null;
export function Chat({ email, cookie, data }: ConversationProps) {
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [messagesState, setMessages] = React.useState<ChatMessage[]>(
    data.messages ?? []
  );
  const conversationData = data.members.map((member) => member);
  const receiverName = conversationData[0].name === email ? 0 : 1;
  const list: ChatMessage[] = [];
  const onPrivateMessage = (payload: any) => {
    var payloadData = JSON.parse(payload.body);
    messagesState.push(payloadData);
    setMessages([...messagesState]);
    // if (privateChats.get(payloadData.senderName)) {
    //   privateChats.get(payloadData.senderName).push(payloadData);
    //   setPrivateChats(new Map(privateChats));
    //   console.log(privateChats);
    //   console.log(payloadData);
    // } else {
    //   let list = [];
    //   list.push(payloadData);
    //   privateChats.set(payloadData.senderName, list);
    //   setPrivateChats(new Map(privateChats));
    // }
  };
  const onConnected = () => {
    stompClient.subscribe(
      `/user/${data.conversationId}/private`,
      onPrivateMessage
    );
  };
  const onError = (err: any) => {
    console.log(err);
  };

  const connect = () => {
    let Sock = new SockJS("http://localhost:18080/ws");
    stompClient = over(Sock);
    stompClient.connect(
      { Authorization: "Bearer " + cookie },
      onConnected,
      onError
    );
  };

  const sendPrivateValue = (message: string) => {
    if (stompClient) {
      var chatMessage = {
        senderUser: { email: email },
        receiverUser: { email: conversationData[receiverName].email },
        messageText: message,
        conversationId: data.conversationId,
      };
      stompClient.send(
        "/app/private-message",
        { Authorization: `Bearer ${cookie}` },
        JSON.stringify(chatMessage)
      );
    }
  };

  if (!stompClient) {
    connect();
  }
  return (
    <>
      {/* <Button onClick={() => connect()}>Connect</Button> */}
      <div className="flex flex-col justify-between w-full h-full">
        <ChatTopbar selectedUser={selectedUser} />

        <ChatList
          messages={messagesState}
          isMobile={isMobile}
          data={data}
          email={email}
          sendPrivateValue={sendPrivateValue}
        />
      </div>
    </>
  );
}
