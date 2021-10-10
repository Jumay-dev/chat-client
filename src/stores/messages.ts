import { makeAutoObservable } from "mobx";
import { MessageType } from "../types";

export class Messages {
  messagesList: MessageType[] | any[] = [];

  constructor(public root: any) {
    makeAutoObservable(this);
  }

  setMessages = (messages: MessageType[]) => {
    this.messagesList = messages;
  };
}
