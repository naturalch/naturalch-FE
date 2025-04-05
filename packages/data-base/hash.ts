class Pair {
  key: number;
  val: string;

  constructor(key: number, val: string) {
    this.key = key;
    this.val = val;
  }
}

class ArrayHashMap {
  private readonly buckets: (Pair | null)[];

  constructor() {
    // 初始化数组，包含 100 个桶
    this.buckets = new Array(100).fill(null);
  }

  // 简单 hash 函数
  private hashFunc(key: number) {
    return key % 100;
  }

  get(key: number) {
    const index = this.hashFunc(key);
    const pair = this.buckets[index];
    if (!pair) {
      return null;
    }
    return pair.val;
  }

  set(key: number, val: string) {
    const index = this.hashFunc(key);
    this.buckets[index] = new Pair(key, val);
  }

  delete(key: number) {
    const index = this.hashFunc(key);
    this.buckets[index] = null;
  }

  entries() {
    const arr: Pair[] = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        arr.push(this.buckets[i]!);
      }
    }
    return arr;
  }

  keys() {
    const arr: number[] = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        arr.push(this.buckets[i]!.key);
      }
    }
    return arr;
  }

  values() {
    const arr: (string | undefined)[] = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        arr.push(this.buckets[i]!.val);
      }
    }
    return arr;
  }

  print() {
    const pairSet = this.entries();
    for (const pair of pairSet) {
      console.info(`${pair.key} -> ${pair.val}`);
    }
  }
}
