import React, { FC } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { MessageType } from "../../../types";
import PersonIcon from '@mui/icons-material/Person';

interface MessageProps {
  message: MessageType
}

export const Message: FC<MessageProps> = ({message: { message, event, username }}) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <PersonIcon />
        </ListItemAvatar>
        <ListItemText
          primary={username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {event === 'connection' ? `Пользователь ${username} присоединился к чату` : message}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
