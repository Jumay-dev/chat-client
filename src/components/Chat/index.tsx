import React, { FC, useState, useRef } from "react";
import { Button, TextField } from "@mui/material";
import { Root } from "./styled";
import List from "@mui/material/List";
import { Message } from "./Message";
import { useStores } from "../../hooks/stores";
import { observer } from "mobx-react-lite";

export const Chat: FC = observer(() => {
  const { user, messages } = useStores();
  const { messagesList, setMessages } = messages;
  const [currentMessage, setCurrentMessage] = useState<string | undefined>("");
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState<string>("");
  const socket = useRef<WebSocket>();

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
      setMessages([...messagesList, message]);
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
    return (
      <Root>
        <div>Введите имя пользователя</div>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={connect}>Войти</Button>
      </Root>
    );
  }

  return (
    <Root>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {messagesList.map((mess) => (
          <Message message={mess} />
        ))}
      </List>
      <TextField
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <Button onClick={sendMessage}>Отправить</Button>
    </Root>
  );
});
