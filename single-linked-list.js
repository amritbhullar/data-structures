class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  add(data) {
    let node = new Node(data);
    let currentNode = this.head;

    if (!this.head) {
      this.head = node;
      this.length ++;
      return node;
    }

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;
    this.length ++;
    return node;
  }

  searchNodeAt(position) {
    let currentNode = this.head;
    let count = 1;

    if (position < 1 || position > this.length || this.length === 0) {
      throw Error('Unable to retrieve a node for this position.')
    }

    while (count < position) {
      currentNode = currentNode.next;
      count ++;
    }

    return currentNode;
  }

  remove(position) {
    let currentNode = this.head;
    let count = 1;
    let beforeNodeToDelete = null;
    let nodeToDelete = null;
    let deletedNode = null;

    if (position < 1 || position > this.length) {
      throw new Error('Position given is out of range.')
    }

    if (position === 1) {
      this.head = currentNode.next;
      deletedNode = currentNode;
      currentNode = null;
      this.length --;
      return deletedNode;
    }

    while (count < position) {
      beforeNodeToDelete = currentNode;
      nodeToDelete = currentNode.next;
      currentNode = nodeToDelete;
      count ++;
    }

    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
    this.length --;

    return deletedNode;
  }

  deleteDuplicates() {
    let currentNode = this.head;
    let previous = null;
    let collection = {};
    while (currentNode) {
      if (collection[currentNode.data]) {
        console.log('is in collection')
        previous.next = currentNode.next;
      } else {
        collection[currentNode.data] = 1;
        previous = currentNode;
      }
      currentNode = currentNode.next;
    }
    return currentNode;
  }
};


// Examples
const ll = new SinglyList();
ll.add(1);
ll.add(2);
ll.add(3);
ll.add(4);
ll.remove(4);
ll.remove(1);
console.log('Node at position 2:', ll.searchNodeAt(2)); // should be "3"
ll.remove(2);
console.log('Singly list after first, next, and last removed:', JSON.stringify(ll, null, 3)); // should be "2"
console.log('-----');
ll.add(2);
ll.add(2);
ll.add(2);
ll.deleteDuplicates();
console.log(ll)
