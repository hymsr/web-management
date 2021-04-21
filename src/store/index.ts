import { makeAutoObservable } from 'mobx';
import emitter from '@/util/emitter';

class Store {
  user: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: string): void {
    resolveUserReady(user);
    this.user = user;
  }
}

const store = new Store();

// 非UI逻辑中获取user，比如发起请求时
const userReadyChannel = Symbol('userReady');

export const userReady: Promise<string> = new Promise((resovle) => {
  emitter.on(userReadyChannel, resovle);
});

const resolveUserReady = (user) => {
  emitter.emit(userReadyChannel, user);
  emitter.clear(userReadyChannel);
};

export default store;
