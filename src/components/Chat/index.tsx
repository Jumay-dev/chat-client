import React, { FC, useState, useRef } from "react";
import { Button, Box, TextField } from "@mui/material";
import { Root } from "./styled";
import List from '@mui/material/List';
import { Message } from './Message'

export const Chat: FC = () => {
  const [currentMessage, setCurrentMessage] = useState<string | undefined>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const socket = useRef<WebSocket>();

  const username = "anyname";

  function connect() {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current?.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message ]);
    };
    socket.current.onclose = () => {
      console.log("Socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Socket произошла ошибка");
    };
  }

  const sendMessage = () => {
    const message = {
      username,
      message: currentMessage,
      id: Date.now(),
      event: "message",
    };
    socket.current?.send(JSON.stringify(message));
    setCurrentMessage("");
  };

  if (!connected) {
    return <Button onClick={connect}>Войти</Button>;
  }

  return (
    <Root>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {messages.map((mess) => (
          <Message message={mess}/>
        ))}
      </List>
      <TextField
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <Button onClick={sendMessage}>Отправить</Button>
    </Root>
  );
};
