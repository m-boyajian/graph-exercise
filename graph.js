class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    for(const node of this.nodes) {
      node.adjacent.delete(vertex);
    }   
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // Holds array of visited nodes.
    const stack = [start];
    const visitedNodes = [];
    const seen = new Set(); 
    let currentVertex;
  
    seen.add(start);

    // DFS traversal - LIFO (Last In, First Out) approach
    // Pops the last node from the toVisitStack and explores it
    while (stack.length) {
        currentVertex = stack.pop();
        visitedNodes.push(currentVertex.value);

        // Visit neighbors of current node
        currentVertex.adjacent.forEach(neighbor=> {
          // If neighbor has not been seen, add it to the stack
          if (!seen.has(neighbor)) {
            seen.add(neighbor);
            stack.push(neighbor);
          }
        });
    }
    // Returns array of visited nodes
    return visitedNodes;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    // Empty queue
    const queue = [start];
    // Holds array of visited nodes.
    const visitedNodes = [];
    const seen = new Set();
    let currentVertex;

    seen.add(start);

    // While there are still vertices
    while (queue.length) {
      // Dequeue the first node from the queue
      currentVertex = queue.shift();
      // Add the dequeued node to the visited nodes array
      visitedNodes.push(currentVertex.value);

      // Explore neighbors of current node
      currentVertex.adjacent.forEach(neighbor => {
        // If neighbor has not been visited, enqueue it for further exploration
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return visitedNodes;
  }
}

module.exports = {Graph, Node}