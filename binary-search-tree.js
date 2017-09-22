class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(data) {
    const node = new Node(data);
    this.root = node;
  }

  add(data) {
    const node = new Node(data);
    let currentNode = this.root;
    if (!this.root) {
      this.root = node;
      return node;
    } else {
      (function searchToInsert(currentNode) {
        // less than check (left)
        if (data < currentNode.data) {
          if (currentNode.left === null) {
            currentNode.left = node;
            return node;
          } else {
            searchToInsert(currentNode.left)
          }
        }
        // larger than check (right)
        else {
          if (currentNode.right === null) {
            currentNode.right = node;
            return node;
          } else {
            searchToInsert(currentNode.right)
          }
        }
      })(currentNode);
    }
  }

  search(val) {
    let currentNode = this.root;
    if (!this.root) {
      throw new Error('BST has no nodes, cannot search an empty tree.');
    } else {
      let foundNode = null;
      (function searchTree(currentNode) {
        if (!currentNode) {
          throw new Error('No such node was found in the BST.')
        }
        if (currentNode.data === val) {
          foundNode = currentNode;
          return currentNode;
        } else {
          // check left and right
          if (val < currentNode.data) {
            searchTree(currentNode.left);
          } else {
            searchTree(currentNode.right);
          }
        }
      })(currentNode);
      if (foundNode) return foundNode;
    }
  }

  remove(data) {
    let currentNode = this.root;
    if (!this.root) {
      throw new Error('BST has no nodes, cannot remove from an empty tree.');
    } else {
      let removed = null;
      (function searchAndRemove(currentNode) {
        if (!currentNode) {
          throw new Error('Node is not in the BST, thus cannot remove.')
        }
        if (currentNode.data === data) {
          if (currentNode.left === null && currentNode.right === null) {
            currentNode = null;
            removed = currentNode;
            return removed;
          }
          if (currentNode.left === null) {
            removed = currentNode;
            currentNode = currentNode.right;
            return removed;
          }
          if (currentNode.right === null) {
            removed = currentNode;
            currentNode = currentNode.left;
            return removed;
          }
          // if there are child nodes, we must readjust them to
          // add leftmost node to removed node position
          let tempNode = currentNode.right;
          while (tempNode.left) {
            tempNode = tempNode.left;
          }
          currentNode.data = tempNode.data;
          currentNode.right = searchAndRemove(currentNode.right, tempNode.data);
          return currentNode;
        } else if (currentNode.data > data) {
          currentNode.left = searchAndRemove(currentNode.left, data);
          return currentNode;
        } else {
          currentNode.right = searchAndRemove(currentNode.right, data);
          return currentNode;
        }
      })(currentNode);
      if (removed) return removed;
    }
  }
}

const bst = new BST(3);
bst.add(2);
bst.add(4);
bst.add(5);
bst.add(1);
const s4 = bst.search(4);
//console.log('Searched node:', s4);
const s3 = bst.search(3);
//console.log('Searched node:', s3)
/* Non-existent node search test
bst.search(6); */
bst.remove(1);
console.log(JSON.stringify(bst, null, 3))
