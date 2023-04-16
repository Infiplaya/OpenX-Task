const functions = require('./task1')

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

const a = new Node(5);
    const b = new Node(3);
    const c = new Node(7);
    const d = new Node(2);
    const e = new Node(5);
    const f = new Node(1);
    const g = new Node(0);
    const h = new Node(2);
    const i = new Node(8);
    const j = new Node(5);

    a.left = b;
    a.right = c;

    b.left = d;
    b.right = e;

    c.left = f;
    c.right = g;

    g.left = h;
    g.right = i;

    i.right = j;

describe('find nodes without children', () => {
  test('returns the count of leafs (nodes that dont have children)', () => {
    expect(functions.findNodesWithoutChildren(a)).toBe(5);
  });

  test('returns 0 for an empty tree', () => {
    expect(functions.findNodesWithoutChildren(null)).toBe(0);
  });

  test('returns 1 for a tree with only one node', () => {
    const root = new Node(1);

    expect(functions.findNodesWithoutChildren(root)).toBe(1);
  });

  test('returns 1 for a tree with only one node and one child', () => {
    const root = new Node(1);
    root.left = new Node(2);

    expect(functions.findNodesWithoutChildren(root)).toBe(1);
  });
});

describe('maxNumOfEdges', () => {
  test('returns the maximum number of edges in a binary tree', () => {
    
    expect(functions.maxNumOfEdges(a)).toBe(4);
  });

  test('returns 0 for an empty tree', () => {
    expect(functions.maxNumOfEdges(null)).toBe(0);
  });

  test('returns 0 for a tree with only one node', () => {
    const root = new Node(1);

    expect(functions.maxNumOfEdges(root)).toBe(0);
  });

  test('returns 1 for a tree with only one node and one child', () => {
    const root = new Node(1);
    root.left = new Node(2);

    expect(functions.maxNumOfEdges(root)).toBe(1);
  });
});


describe('checkEquality', () => {
    test('returns true for identical trees', () => {
      const root1 = new Node(1);
      root1.left = new Node(2);
      root1.right = new Node(3); 
  
      const root2 = new Node(1); 
      root2.left = new Node(2);
      root2.right = new Node(3);
  
      expect(functions.checkEquality(root1, root2)).toBe(true);
    });
  
    test('returns false for different trees', () => {
      const root1 = new Node(1);
      root1.left = new Node(2); 
      root1.right = new Node(3);
  
      const root2 = new Node(1); 
      root2.left = new Node(4); 
      root2.right = new Node(5);

  
      expect(functions.checkEquality(root1, root2)).toBe(false);
    });
  });
