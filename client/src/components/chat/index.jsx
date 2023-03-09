import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "../header";
import StandardMessageForm from "../messageForm/StandardMessageForm";
import Ai from "../messageForm/Ai";
import AiCode from "../messageForm/AiCode";
import AiAssist from "../messageForm/AiAssist";

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );

  const chatTitle = chatProps.chat?.title || "";

  const chatComponents = {
    "AI-Chat": Ai,
    "AI-Code": AiCode,
    "AI-Assist": AiAssist,
  };

  const ChatComponent =
    chatComponents[chatTitle.startsWith("AI-") && chatTitle] ||
    StandardMessageForm;

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          return <ChatComponent props={props} activeChat={chatProps.chat} />;
        }}
      />
    </div>
  );
};

export default Chat;
