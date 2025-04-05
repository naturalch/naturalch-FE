class ListNode {
  val: number;
  next: ListNode | null;
  prev: ListNode | null;
  constructor(val?: number, next?: ListNode | null, prev?: ListNode | null) {
    this.val = val === undefined ? 0 : val; // 节点值
    this.next = next === undefined ? null : next; // 指向后继节点的引用
    this.prev = prev === undefined ? null : prev; // 指向前驱节点的引用
  }
}

class LinkedListQueue {
  private head: ListNode | null;
  private tail: ListNode | null;
  private queueSize = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  get size() {
    return this.queueSize;
  }

  isEmpty() {
    return this.queueSize === 0;
  }

  push(val: number) {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.queueSize++;
  }

  pop() {
    const res = this.peek();
    if (!this.head) {
      throw new Error('queue is empty');
    }
    this.head = this.head.next;
    this.queueSize--;
    return res;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('queue is empty');
    }
    return this.head!.val;
  }

  toArray() {
    let node = this.head;
    const res = new Array(this.queueSize);
    for (let i = 0; i < this.queueSize; i++) {
      res[i] = node!.val;
      node = node!.next;
    }
    return res;
  }
}

/**
 * 下列实现局限于长度不可变，可以将数组替换为动态数组，引入扩容机制即可
 */
class ArrayQueue {
  private queue: number[];
  private head: number;
  private queueSize: number;

  constructor(capacity: number) {
    this.queue = new Array(capacity);
    this.head = this.queueSize = 0;
  }

  get capacity() {
    return this.queue.length;
  }

  get size() {
    return this.queueSize;
  }

  isEmpty() {
    return this.queueSize === 0;
  }

  push(val: number) {
    if (this.size === this.capacity) {
      console.log('queue is full');

    }
    // 计算尾指针，指向队尾索引 + 1
    // 通过取余操作实现 tail 越过数组尾部后重新指向数组头部
    const tail = (this.head + this.queueSize) % this.capacity;
    this.queue[tail] = val;
    this.queueSize++;
  }

  pop() {
    const res = this.peek();
    // 队首指针向后移动一位，若越过尾部则返回到数组头部
    this.head = (this.head + 1) % this.capacity;
    this.queueSize--;
    return res;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('queue is empty');
    }
    return this.queue[this.head];
  }

  toArray() {
    // 仅转换有效范围内的元素
    const arr = new Array(this.size);
    for (let i = 0, j = this.head; i < this.size; i++, j++) {
      arr[i] = this.queue[j % this.capacity];
    }
    return arr;
  }
}

/**
 * 链表双向队列
 */
class LinkedListDequeue {

  private head: ListNode | null;
  private tail: ListNode | null;
  private queueSize: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.queueSize = 0;
  }

  pushLast(val: number) {
    const node = new ListNode(val);
    if (this.queueSize === 0) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.queueSize++;
  }

  pushFirst(val: number) {
    const node = new ListNode(val);
    if (this.queueSize === 0) {
      this.head = this.tail = node;
    } else {
      this.head!.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.queueSize++;
  }

  popLast() {
    if (this.queueSize === 0) {
      return null;
    }
    const value = this.peekLast();
    const temp = this.tail!.prev;
    if (temp !== null) {
      temp.next = null;
      this.tail!.prev = null;
    }
    this.tail = temp;
    this.queueSize--;
    return value;
  }

  popFirst() {
    if (this.queueSize === 0) {
      return null;
    }
    const value = this.peekFirst();
    const temp = this.head!.next;
    if (temp !== null) {
      temp.prev = null;
      this.head!.next = null;
    }
    this.head = temp;
    this.queueSize--;
    return value;
  }

  peekLast() {
    return this.queueSize === 0 ? null : this.tail!.val;
  }

  peekFirst() {
    return this.queueSize === 0 ? null : this.head!.val;
  }

  get size() {
    return this.queueSize;
  }

  isEmpty() {
    return this.queueSize === 0;
  }

  print() {
    const arr: number[] = [];
    let temp: ListNode | null = this.head;
    while (temp !== null) {
      arr.push(temp.val);
      temp = temp.next;
    }
    return arr.join('->');
  }
}

/**
 * 数组双向队列
 */
class ArrayDeque {
  private nums: number[];
  private head: number;
  private queueSize: number;

  constructor(capacity: number) {
    this.nums = new Array(capacity);
    this.head = 0;
    this.queueSize = 0;
  }

  capacity() {
    return this.nums.length;
  }

  get size() {
    return this.queueSize;
  }

  isEmpty() {
    return this.queueSize === 0;
  }

  /* 计算环形数组索引 */
  getIndex(i: number) {
    // 通过取余操作实现数组首尾相连，当 i 越过数组尾部后，回到头部，当 i 越过数组头部后，回到尾部
    return (i + this.capacity()) % this.capacity();
  }

  pushFirst(num: number): void {
    if (this.queueSize === this.capacity()) {
      throw new Error('dequeue is full');
    }
    // 队首指针向左移动一位，通过取余操作实现 head 越过数组头部后回到尾部
    this.head = this.getIndex(this.head - 1);
    // 将 num 添加至队首
    this.nums[this.head] = num;
    this.queueSize++;
  }

  pushLast(num: number): void {
    if (this.queueSize === this.capacity()) {
      throw new Error('dequeue is full');
    }
    // 计算队尾指针，指向队尾索引 + 1
    const last = this.getIndex(this.head + this.queueSize);
    // 将 num 添加至队尾
    this.nums[last] = num;
    this.queueSize++;
  }

  popFirst(): number {
    const num: number = this.peekFirst();
    // 队首指针向后移动一位
    this.head = this.getIndex(this.head + 1);
    this.queueSize--;
    return num;
  }

  popLast(): number {
    const num: number = this.peekLast();
    this.queueSize--;
    return num;
  }

  peekFirst(): number {
    if (this.isEmpty()) {
      throw new Error('dequeue is empty');
    }
    return this.nums[this.head];
  }

  peekLast(): number {
    if (this.isEmpty()) {
      throw new Error('dequeue is empty');
    }
    const last = this.getIndex(this.head + this.queueSize - 1);
    return this.nums[last];
  }

  toArray(): number[] {
    // 仅转换有效长度范围内的列表元素
    const res: number[] = [];
    for (let i = 0, j = this.head; i < this.queueSize; i++, j++) {
      res[i] = this.nums[this.getIndex(j)];
    }
    return res;
  }
}
