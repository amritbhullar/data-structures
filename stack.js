class Stack {
  constructor() {
    this.size = 0;
    this.storage = {};
  }

  push(data) {
    this.size ++;
    this.storage[this.size] = data;
  }

  pop() {
    if (this.size) {
      let popped = this.storage[this.size];
      delete this.storage[this.size];
      this.size --;
      return popped;
    } else {
      throw new Error('Stack is empty, cannot pop.')
    }
  }
}

let pancakes = new Stack;
pancakes.push('buttermilk');
pancakes.push('chocolate-chip');
pancakes.push('buckwheat');
console.log('BEFORE:   ', pancakes);
console.log('Pop first:', pancakes.pop());
console.log('Pop next: ', pancakes.pop());
console.log('Pop last: ', pancakes.pop());
console.log('AFTER:    ', pancakes); // empty stack
// pancakes.pop() should throw an error 
