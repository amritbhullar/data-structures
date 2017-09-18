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

let line = new Queue;
line.enqueue('one');
line.enqueue('two');
line.enqueue('three');
line.enqueue('four');
console.log(line);    // full of non-zero indexed line of four
line.dequeue();
line.dequeue();
line.dequeue();
line.dequeue();
console.log(line)    // empty line
line.enqueue('one'); // only item in line storage now
line.dequeue();
console.log(line)    // no items in line storage
