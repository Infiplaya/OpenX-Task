const { Node, findNodesWithoutChildren } = require('./task1');

describe('findNodesWithoutChildren', () => {
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
    const x = new Node(5);
  
    x.left = b;
    x.right = c;
  
    a.left = b;
    a.right = c;
  
    b.left = d;
    b.right = e;
  
    c.left = f;
    c.right = g;
  
    g.left = h;
    g.right = i;
  
    i.right = j;
  
    test('returns the correct count for a single node without children', () => {
      const node = new Node(1);
      expect(findNodesWithoutChildren(node)).toBe(1);
    });
  
    test('returns the correct count for a tree with multiple nodes without children', () => {
      expect(findNodesWithoutChildren(x)).toBe(3);
    });
  
    test('returns 0 when all nodes have children', () => {
      expect(findNodesWithoutChildren(a)).toBe(0);
    });
  
    test('returns 0 when the root has no children', () => {
      const root = new Node(1);
      expect(findNodesWithoutChildren(root)).toBe(1);
    });
  });