import { makeAutoObservable } from "mobx";

export type CurrentFlowType = 'signin' | 'signup' | 'chat' | 'loading'

export class User {
  username: string | null = null;
  flow: CurrentFlowType = 'signin'

  constructor(public root: any) {
    makeAutoObservable(this);
  }

  setFlow = (newFlow: CurrentFlowType) => {
    this.flow = newFlow
  }

  setUsername = (username: string) => {
    this.username = username
  }
}
