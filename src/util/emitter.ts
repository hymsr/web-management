class Emitter {
  chanMap: Map<any, Set<Function>>;
  constructor() {
    this.chanMap = new Map();
  }

  on(chan, handler: Function): void {
    if (!this.chanMap.has(chan)) {
      this.chanMap.set(chan, new Set());
    }
    // @ts-ignore
    this.chanMap.get(chan).add(handler);
  }

  off(chan, handler: Function): boolean {
    if (!this.chanMap.has(chan)) return false;
    // @ts-ignore
    return this.chanMap.get(chan).delete(handler);
  }

  clear(chan): boolean {
    return this.chanMap.delete(chan);
  }

  emit(chan, msg): void {
    if (!this.chanMap.has(chan)) return;
    // @ts-ignore
    for (const fn of this.chanMap.get(chan).values()) {
      try {
        fn(msg);
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export default new Emitter();
