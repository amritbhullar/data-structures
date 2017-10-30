class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
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
    var queue = [];
    queue.push(tree.root);
    let currentTree = queue.pop();

    while (currentTree) {
      let length = currentTree.children.length;
      for (var i=0; i < length; i++) {
        queue.push(currentTree.children[i])
      }

      callback(currentTree);
      currentTree = queue.pop();
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
      const index = parent.children.indexOf(data);
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
}

var tree = new Tree('one');
tree.root.children.push(new Node('two'));
tree.root.children[0].parent = tree;
tree.root.children.push(new Node('three'));
tree.root.children[1].parent = tree;
tree.root.children.push(new Node('four'));
tree.root.children[2].parent = tree;

tree.root.children[0].children.push(new Node('five'));
tree.root.children[0].children[0].parent = tree.root.children[0];

// one, four, three, two, five
tree.traverseBF(function(node) {
  console.log(node.data)
});

// five, two, three, four, one
tree.traverseDF(function(node) {
  console.log(node.data)
})
