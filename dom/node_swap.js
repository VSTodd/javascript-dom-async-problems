/*
- Write a function that takes two element ids as arguments and swaps the
  positions of the elements represented by the ids
- The function returns true for valid swaps and undefined for invalid
  - Swaps are invalid if the ID does not exist in the HTML or if one ID is the
    child of another
- You can assume that nodes will have a value for the id attribute and two
  arguments will always be provided

input: two numbers (ids)
output: either undefined or a swapping of elements in the HTML

function validSwap(id1, id2)
  - if searching the document for either id returns null, return undefined
  - if the parent of either id is the other id, return undefined

nodeSway(id1, id2)
  - if validSwap is falsy, return undefined
  - initialize variable node1, set to the node with id1
  - initialize variable node2, set to the node with id2
  - create element, tempNode, insert it right after the location of node2
  - insert node2, before the location of node1
  - insert node1, before the location of tempNode
  - delete tempNode
*/

function validSwap(node1, node2) {
  if (!node1 || !node2) {
    return undefined;
  } else if (node1.contains(node2)) {
    return undefined;
  } else if (node2.contains(node1)) {
    return undefined;
  }
  return true;
}

function nodeSwap(id1, id2) {
  let node1 = document.getElementById(id1);
  let node2 = document.getElementById(id2);
  if (!validSwap(node1, node2)) return undefined;

  let tempNode = document.createElement('P');
  node2.parentNode.insertBefore(tempNode, node2);
  node1.parentNode.insertBefore(node2, node1);
  tempNode.parentNode.insertBefore(node1, tempNode);

  tempNode.parentNode.removeChild(tempNode);
  return true;
}

// at least one of the id attributes doesn't exist
console.log(nodeSwap(1, 20)) // undefined

// at least one of the nodes is a "child" of the other
console.log(nodeSwap(1, 4)); // undefined
console.log(nodeSwap(9, 3)); // undefined

console.log(nodeSwap(3, 1));
console.log(nodeSwap(7, 9));