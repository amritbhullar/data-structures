/*

DIFFERENT DOUBLY LINKED LIST IMPLEMENTATION:
Instead of keeping a length property and searching or removing via
position, this doubly linked list allows searching/removing via
node values.

*/

class Node {
  constructor(data) {
    this.data = data;
    this.previous = null;
    this.next = null;
  }
}

class DoublyList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    }
    return node;
  }

  searchNode(value) {
    let currentNode = this.head;
    while (currentNode.next) {
      if (currentNode.data === value) {
        break;
      }
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  remove(value) {
    let currentNode = this.head;
    let previousNode = null;
    let nodeToDel = null;
    let afterNode = null;

    if (this.head.data === value) {
      nodeToDel = this.head;
      this.head = this.head.next;
      if (this.head) {
        this.head.previous = null;
      } else {
        this.tail = null;
      }
      return nodeToDel;
    }

    else if (this.tail.data === value) {
      nodeToDel = this.tail;
      this.tail = this.tail.previous;
      this.tail.next = null;
      return nodeToDel;
    }

    else {
      while (currentNode.next) {
        previousNode = currentNode.previous
        afterNode = currentNode.next;
        if (currentNode.data === value) {
          break;
        }
        currentNode = currentNode.next;
      }

      previousNode.next = currentNode.next; // 'previousNode.next' is currentNode.previous.next
      nodeToDel = currentNode;
      afterNode.previous = currentNode.previous; // 'afterNode.previous' is currentNode.next.previous
      return nodeToDel;
    }
  }
}

const dl = new DoublyList();
dl.add(1);
dl.add(2);
dl.add(3);
console.log(dl.remove(2)); // should return node 2
dl.remove(1);              // testing to remove first node
dl.remove(3);              // testing to remove last node
console.log(dl);           // empty DoublyList
