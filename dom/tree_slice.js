/*
- It's similar to slice but different in the sense that slice isn't inclusive on
  the right hand side.
- The end index doesn't have to be the id of the "innermost" child node
- Only consider element nodes.
- Only elements that have body as an ancestor (parent, grandparent, etc.) are
  sliceable.
- If the id attribute of the start or end index is not in the DOM, return
  undefined.
- If the slice is not feasible — there's no path connecting the element at the
  starting index to the ending index — return undefined

input: two integers, reflecting starting ID attibute and ending ID attribute
output: array of tagNames

function validIDs
  - return undefined if getElementById of `end` returns null
  - have a for loop
    - go up the parental chain of end; return true if you find a parent with the
      ID of `start`
  - return undefined

function sliceTree
  - if validIDs return undefined, return undefined
  - initialize empty array, sliced

  - utilize for loop, which breaks when the currentNode's id is equal to `start`
    - unshift the currentNode's tagName into sliced

  return sliced
*/
function validIDs(start, endNode) {
  if (!endNode) return undefined;

  for (let currentNode = endNode.parentNode; currentNode.nodeName != 'BODY';
    currentNode = currentNode.parentNode) {
    if (currentNode.id === String(start)) return true;
  }

  return undefined
}

function sliceTree(start, end) {
  let startNode = document.getElementById(start);
  let endNode = document.getElementById(end);
  let sliced = [];

  if (!validIDs(start, endNode)) return undefined;

  for (let currentNode = endNode; currentNode != startNode.parentNode;
    currentNode = currentNode.parentNode) {
    sliced.unshift(currentNode.nodeName)
  }

  return sliced
}


console.log(sliceTree(1, 4)); // ["ARTICLE", "HEADER", "SPAN", "A"]
console.log(sliceTree(1, 76)); // undefined
console.log(sliceTree(2, 5)); // undefined
console.log(sliceTree(5, 4)); // undefined
console.log(sliceTree(1, 23)); // ["ARTICLE", "FOOTER"]
console.log(sliceTree(1, 22)); // ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
console.log(sliceTree(11, 19)); // ["SECTION", "P", "SPAN", "STRONG", "A"]

