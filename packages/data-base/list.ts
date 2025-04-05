/**
 * 单向链表
 */
class ListNode {
	val: number;
	next: ListNode | null;
	
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

const n0 = new ListNode(1);
const n1 = new ListNode(2);
n0.next = n1;

/**
 * 双向链表
 */
class ListNode {
  val: number;
  next: ListNode | null;
  prev: ListNode | null;
  constructor(val?: number, next?: ListNode | null, prev?: ListNode | null) {
      this.val = val  ===  undefined ? 0 : val;        // 节点值
      this.next = next  ===  undefined ? null : next;  // 指向后继节点的引用
      this.prev = prev  ===  undefined ? null : prev;  // 指向前驱节点的引用
  }
}

/**
 * 列表
 */
/* 列表类 */
class MyList {
  private arr: Array<number>; // 数组（存储列表元素）
  private _capacity: number = 10; // 列表容量
  private _size: number = 0; // 列表长度（当前元素数量）
  private extendRatio: number = 2; // 每次列表扩容的倍数

  /* 构造方法 */
  constructor() {
      this.arr = new Array(this._capacity);
  }

  /* 获取列表长度（当前元素数量）*/
  public size(): number {
      return this._size;
  }

  /* 获取列表容量 */
  public capacity(): number {
      return this._capacity;
  }

  /* 访问元素 */
  public get(index: number): number {
      // 索引如果越界，则抛出异常，下同
      if (index < 0 || index >= this._size) throw new Error('索引越界');
      return this.arr[index];
  }

  /* 更新元素 */
  public set(index: number, num: number): void {
      if (index < 0 || index >= this._size) throw new Error('索引越界');
      this.arr[index] = num;
  }

  /* 在尾部添加元素 */
  public add(num: number): void {
      // 如果长度等于容量，则需要扩容
      if (this._size === this._capacity) this.extendCapacity();
      // 将新元素添加到列表尾部
      this.arr[this._size] = num;
      this._size++;
  }

  /* 在中间插入元素 */
  public insert(index: number, num: number): void {
      if (index < 0 || index >= this._size) throw new Error('索引越界');
      // 元素数量超出容量时，触发扩容机制
      if (this._size === this._capacity) {
          this.extendCapacity();
      }
      // 将索引 index 以及之后的元素都向后移动一位
      for (let j = this._size - 1; j >= index; j--) {
          this.arr[j + 1] = this.arr[j];
      }
      // 更新元素数量
      this.arr[index] = num;
      this._size++;
  }

  /* 删除元素 */
  public remove(index: number): number {
      if (index < 0 || index >= this._size) throw new Error('索引越界');
      const num = this.arr[index];
      // 将将索引 index 之后的元素都向前移动一位
      for (let j = index; j < this._size - 1; j++) {
          this.arr[j] = this.arr[j + 1];
      }
      // 更新元素数量
      this._size--;
      // 返回被删除的元素
      return num;
  }

  /* 列表扩容 */
  public extendCapacity(): void {
      // 新建一个长度为 size 的数组，并将原数组复制到新数组
      this.arr = this.arr.concat(
          new Array(this.capacity() * (this.extendRatio - 1))
      );
      // 更新列表容量
      this._capacity = this.arr.length;
  }

  /* 将列表转换为数组 */
  public toArray(): number[] {
      const size = this.size();
      // 仅转换有效长度范围内的列表元素
      const arr = new Array(size);
      for (let i = 0; i < size; i++) {
          arr[i] = this.get(i);
      }
      return arr;
  }
}
