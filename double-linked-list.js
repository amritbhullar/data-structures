class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
}

class DoublyList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  add(data) {
    let node = new Node(data);

    if (!this.length) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    }

    this.length ++;
    return node;
  }

  searchNodeAt(position) {
    let currentNode = this.head;
    let count = 1;

    if (position < 0 || position > this.length || this.length === 0) {
      throw new Error('Position given is out of range.')
    }

    while (count < position) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  remove(position) {
    let count = 1;
    let currentNode = this.head;
    let beforeNodeToDelete = null;
    let nodeToDelete = null;
    let deletedNode = null;
    let afterNodeToDelete = null;

    if (position < 0 || position > this.length || this.length === 0) {
      throw new Error('Invalid position argument given.')
    }

    if (position === 1) {
      this.head = currentNode.next;
      if (this.head) {
        this.head.previous = null;
      } else {
        this.tail = null;
      }
    }

    else if (position === this.length) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    }
    else {
      while (count < position) {
        currentNode = currentNode.next;
        count ++;
      }

      beforeNodeToDelete = currentNode.previous;
      nodeToDelete = currentNode;
      afterNodeToDelete = currentNode.next;

      beforeNodeToDelete.next = afterNodeToDelete;
      afterNodeToDelete.previous = beforeNodeToDelete;
      deletedNode = nodeToDelete;
      nodeToDelete = null;
    }

    this.length --;
    console.log('Deleted node at ' + position + ' successfully.');
  }
}



// TEST CASES
let dl = new DoublyList;
dl.add('one');
dl.add('two');
dl.add('three');
dl.add('four');
console.log(dl);
console.log('Position Two:', dl.searchNodeAt(2).previous);
dl.remove(3);
console.log(dl.searchNodeAt(3)) // should now be node four pointing previous at two
dl.remove(3);                   // testing last remove
dl.remove(1);                   // testing first remove
console.log(dl)                 // only item "two" left with null pointers
dl.remove(1);
console.log(dl);                // empty doubly linked list
