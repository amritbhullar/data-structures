class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
  }
}

class Queue {
  constructor() {
    this.oldestIndex = 1;
    this.newestIndex = 1;
    this.storage = {};
  }

  size() {
    return this.newestIndex - this.oldestIndex;
  }

  enqueue(data) {
    this.storage[this.newestIndex] = data;
    this.newestIndex ++;
  }

  dequeue() {
    if (this.oldestIndex !== this.newestIndex) {
      let dequeued = this.storage[this.oldestIndex];
      delete this.storage[this.oldestIndex];
      this.oldestIndex ++;
      return dequeued;
    }
  }
}

class Tree {
  constructor(data) {
    const node = new Node(data);
    this.root = node;
  }

  traverseDF(callback) {
    (function recurse(currentNode) {
      let length = currentNode.children.length;
      for (var i=0; i < length; i++) {
        recurse(currentNode.children[i]);
      }

      callback(currentNode);
    })(this.root);
  }

  traverseBF(callback) {
    var queue = new Queue();
    queue.enqueue(tree.root);
    let currentTree = queue.dequeue();

    while (currentTree) {
      let length = currentTree.children.length;
      for (var i=0; i < length; i++) {
        queue.enqueue(currentTree.children[i])
      }

      callback(currentTree);
      currentTree = queue.dequeue();
    }
  }

  contains(callback, traversal) {
    traversal.call(this, callback)
  }

  add(data, toData, traversal) {
    const child = new Node(data);
    let parent = null;
    const callback = function(node) {
      if (node.data === toData) {
        parent = node;
      }
    }

    this.contains(callback, traversal);

    if (parent) {
      parent.children.push(child);
      child.parent = parent;
    } else {
      throw new Error('Cannot assign new node to non-existing parent.')
    }
  }

  remove(data, fromData, traversal) {
    let tree = this;
    let parent = null;
    let childToRemove = null;
    let index;

    const callback = function(node) {
      if (node.data === fromData) {
        parent = node;
      }
    }

    this.contains(callback, traversal);

    if (parent) {
      const index = findIndex(parent.children, data);
      if (index === undefined) {
        throw new Error('Node to remove does not exist.')
      } else {
        childToRemove = parent.children.splice(index, 1);
      }
    } else {
      throw new Error('Parent node does not exist.')
    }
    return childToRemove;
  }

  findIndex(arr, data) {
    let index;
    for (var i=0; i < arr.length; i++) {
      if (arr[i].data === data) {
        index = i;
      }
    }
    return index;
  }
}

var tree = new Tree('one');
console.log(tree.root);
tree.root.children.push(new Node('two'));
tree.root.children[0].parent = tree;
tree.root.children.push(new Node('three'));
tree.root.children[1].parent = tree;
tree.root.children.push(new Node('four'));
tree.root.children[2].parent = tree;

tree.root.children[0].children.push(new Node('five'));
tree.root.children[0].children[0].parent = tree.root.children[0];

tree.traverseDF(function(node) {
  console.log(node.data)
})
