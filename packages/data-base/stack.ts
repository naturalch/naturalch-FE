/**
 * 链表实现栈
 */
class ListNode {
	val: number;
	next: ListNode | null;
	
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

class LinkedListStack {
  private stackPeek: ListNode | null;
  private stackSize = 0;

  constructor() {
    this.stackPeek = null;
  }

  get size() {
    return this.stackSize;
  }

  push(val: number) {
    const node = new ListNode(val);
    node.next = this.stackPeek;
    this.stackPeek = node;
    this.stackSize++;
  }

  pop() {
    const res = this.peek();
    if (!this.stackPeek) {
      throw new Error('Stack is empty!');
    }
    this.stackPeek = this.stackPeek.next;
    this.stackSize--;
    return res;
  }

  peek() {
    if (!this.stackPeek) {
      throw new Error('Stack is empty!');
    }
    return this.stackPeek.val;
  }

  isEmpty() {
    return this.stackSize === 0;
  }

  toArray() {
    let node = this.stackPeek;
    const res = new Array(this.stackSize);
    for (let i = res.length - 1; i >= 0; i--) {
      res[i] = node!.val;
      node = node!.next;
    }
    return res;
  }
}

/**
 * 数组实现栈
 */
class ArrayStack {
  private stack: number[] = [];

  constructor() {
    this.stack = [];
  }

  get size() {
    return this.stack.length;
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  push(val: number) {
    this.stack.push(val);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('stack is empty');
    }
    return this.stack.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('stack is empty');
    }
    return this.stack[this.stack.length - 1];
  }

  toArray() {
    return this.stack;
  }
}
