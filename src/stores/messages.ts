import { makeAutoObservable } from "mobx";
import { MessageType } from "../types";

export type CurrentSocketType = {
  current: WebSocket
}

export class Messages {
  messagesList: MessageType[] = [];
  socket: CurrentSocketType | undefined = undefined

  constructor(public root: any) {
    makeAutoObservable(this);
  }

  setMessages = (message: MessageType) => {
    this.messagesList = [...this.messagesList, message];
  };

  setSocket = (socket: CurrentSocketType) => {
    this.socket = socket
  }
}
