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




function findNodesWithoutChildren(root) {
    const stack = [root];
    let count = 0;

    while (stack.length > 0) {
        const current = stack.pop();
        console.log(current)

        if (!current.left && !current.right) {
            count++
        } else {
            if (current.right) stack.push(current.right)
            if (current.left) stack.push(current.left)
        }
    }

    return count
  }
  

console.log(findNodesWithoutChildren(a));

function maxNumOfEdges(root) {
    if (root === null || (root.left === null && root.right === null)) {
        return 0;
    } else {
        leftEdges = maxNumOfEdges(root.left)
        rightEdges = maxNumOfEdges(root.right)

        if (leftEdges > rightEdges) {
            return leftEdges + 1;
        } else {
            return rightEdges + 1;
        }
    }
}

console.log(maxNumOfEdges(a))

function checkEquality(root1, root2) {
    if (!root1 && !root2) {
        return true;
      } else if (!root1 || !root2) {
        return false; 
      } else if (root1.val !== root2.val) {
        return false; 
      } 
    return checkEquality(root1.left, root2.left) && checkEquality(root1.right, root2.right)
}

console.log(checkEquality(a, x))





