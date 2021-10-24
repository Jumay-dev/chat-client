import React, { FC, useState } from "react";
import { Root, Form } from "./styled";
import { Button, TextField } from "@mui/material";
import { useStores } from "../../hooks/stores";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

export const SignIn: FC = observer(() => {
  const [username, setUsername] = useState<string>("");
  const {
    messages: { setMessages, setSocket },
    user: { setFlow, setUsername: setUsernameSignup },
  } = useStores();
  const connect = () => {
    setFlow("loading");
    const newSocket = {
      current: new WebSocket("ws://localhost:5000"),
    };

    newSocket.current.onopen = () => {
      setFlow("chat");
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      setUsernameSignup(username)
      newSocket.current?.send(JSON.stringify(message));
    };
    newSocket.current.onmessage = (event: any) => {
      const message = JSON.parse(event.data);
      setMessages(message);
    };
    newSocket.current.onclose = () => {
      console.log("Socket закрыт");
    };
    newSocket.current.onerror = () => {
      console.log("Socket произошла ошибка");
    };

    setSocket(newSocket);
  };
  return (
    <Root>
      <Form>
        <div>Введите имя пользователя</div>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={connect}>Войти</Button>
      </Form>
    </Root>
  );
});
