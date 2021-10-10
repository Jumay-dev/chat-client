import { makeAutoObservable } from 'mobx'
import { Messages } from './messages'
import { User } from './user'

export class RootStore {
  constructor() {
    makeAutoObservable(this)
  }

  user = new User(this)
  messages = new Messages(this)
}

export const rootStore = new RootStore()