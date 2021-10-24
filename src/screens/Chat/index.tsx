import React, { FC, useState, useRef, RefObject } from "react";
import { Button, TextField } from "@mui/material";
import { Root } from "./styled";
import List from "@mui/material/List";
import { Message } from "../../components/Message";
import { useStores } from "../../hooks/stores";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { MessageType } from "../../types";

export const Chat: FC = observer(() => {
  const { user: { username }, messages } = useStores();
  const { messagesList, socket } = messages;
  const [currentMessage, setCurrentMessage] = useState<string | undefined>("");


  const sendMessage = () => {
    const message = {
      username,
      message: currentMessage,
      id: Date.now(),
      event: "message",
    };
    socket?.current.send(JSON.stringify(message));
    setCurrentMessage("");
  };

  return (
    <Root>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {messagesList.map((message: MessageType) => (
          <Message {...message}/>
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
