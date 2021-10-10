import { makeAutoObservable } from "mobx";

export class User {
  username: string | null = null;

  constructor(public root: any) {
    makeAutoObservable(this);
  }
}
