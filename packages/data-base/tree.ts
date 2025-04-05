class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

/* 层序遍历 */
function levelOrder(root: TreeNode | null): number[] {
  const queue = [root];
  const list: number[] = [];

  while (queue.length) {
    const node = queue.shift();
    if (node) {
      list.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }

  return list;
}

/* 前序遍历 */
function preOrder(root: TreeNode | null) {
  if (root === null) {
    return;
  }
  // 访问优先级：根节点 -> 左子树 -> 右子树
  list.push(root.val);
  preOrder(root.left);
  preOrder(root.right);
}

/* 中序遍历 */
function inOrder(root: TreeNode | null) {
  if (root === null) {
    return;
  }
  // 访问优先级：左子树 -> 根节点 -> 右子树
  inOrder(root.left);
  list.push(root.val);
  inOrder(root.right);
}

/* 后序遍历 */
function postOrder(root: TreeNode | null) {
  if (root === null) {
    return;
  }
  // 访问优先级：左子树 -> 右子树 -> 根节点
  postOrder(root.left);
  postOrder(root.right);
  list.push(root.val);
}
