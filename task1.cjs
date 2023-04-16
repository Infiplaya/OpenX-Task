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

a.left = b;
a.right = c;

b.left = d;
b.right = e;

c.left = f;
c.right = g;

g.left = h;
g.right = i;

i.right = j;

x.left = b;
x.right = c;




function findNodesWithoutChildren(root) {
    const stack = [root];
    let count = 0;

    if (root === null) return 0;

    while (stack.length > 0) {
        const current = stack.pop();

        if (!current.left && !current.right) {
            count++
        } else {
            if (current.right) stack.push(current.right)
            if (current.left) stack.push(current.left)
        }
    }

    return count
  }

  console.log(findNodesWithoutChildren(null))



function maxNumOfEdges(root) {
    if (root === null || (root.left === null && root.right === null)) {
        return 0;
    } else {
        const leftEdges = maxNumOfEdges(root.left)
        const rightEdges = maxNumOfEdges(root.right)

        if (leftEdges > rightEdges) {
            return leftEdges + 1;
        } else {
            return rightEdges + 1;
        }
    }
}



function checkEquality(root1, root2) {
    if (!root1 && !root2) return true;
    if (!root1 || !root2) return false;
    return (root1.value == root2.value
    && checkEquality(root1.left, root2.left)
    && checkEquality(root1.right, root2.right));  
}



const functions = {
    findNodesWithoutChildren,
    maxNumOfEdges,
    checkEquality
}

module.exports = functions






