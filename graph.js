class Node {
  constructor(data) {
    this.data = data;
    this.edges = [];
  }
}

class Edge {
  constructor(data, nodeFrom, nodeTo) {
    this.data = data;
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;
  }
}

class Graph {
  constructor(nodes=[], edges=[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

  insertNode(data) {
    const node = new Node(data);
    this.nodes.push(node);
  }

  insertEdge(data, nodeFrom, nodeTo) {
    const nodes = this.nodes;
    let nodeFromFound = null;
    let nodeToFound = null;
    for (let i=0; i < nodes.length; i++) {
      if (nodes[i].data === nodeFrom) {
        nodeFromFound = nodes[i];
      }
      if (nodes[i].data === nodeTo) {
        nodeToFound = nodes[i];
      }
    }
    if (nodeFromFound === null) {
      nodeFromFound = new Node(nodeFrom.data);
      this.nodes.push(nodeFromFound);
    }
    if (nodeToFound === null) {
      nodeToFound = new Node(nodeTo.data);
      this.nodes.push(nodeToFound);
    }
    const edge = new Edge(data, nodeFromFound, nodeToFound);
    nodeFromFound.edges.push(edge);
    nodeToFound.edges.push(edge);
    this.edges.push(edge);
  }

  // WIP: need to change this to dynamically populate w/ proper columns/rows
  adjacencyMatrix() {
    let matrix = [];
    for (let i=0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      const e = this.nodes[i].edges;
      // console.log('n:', n);
      // console.log('e:', e);
      if (e.length > 1) {
        for (let x=0; x < e.length; x++) {
          // console.log('further:', e[x])
          matrix.push([n.data, e[x].data, e[x].nodeTo.data, 0]);
        }
      }
      if (e.length === 1) {
        matrix.push([n.data, e[0].data, e[0].nodeTo.data, 0]);
      }
      if (!e.length) {
        matrix.push([0, 0, 0, 0]);
      }
    }
    return matrix;
  }
}

let g = new Graph();
g.insertNode(1);
g.insertNode(2);
g.insertEdge(5, 1, 2);
g.insertNode(3);
g.insertEdge(5, 2, 3);
g.insertNode(4);
// console.log(g.nodes);
// console.log('-----');
// console.log(g.edges);
// console.log('-----');
console.log('matrix:', g.adjacencyMatrix());
