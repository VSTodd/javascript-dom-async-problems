/*
Write a JavaScript function that takes an element's id and returns the DOM
tree of the element in a two-dimensional array

The first subarray contains the element and its siblings, the second contains
the parent of the element and its siblings, so on and so forth, all the way up
to the "grandest" parent

Assume that the grandest parent is the element with an id of "1".

Input: Number (id)
Output: array of arrays

- initialize variable baseNode, getting the node with the current ID
- initialize variable array, which is empty

- utilize a for loop
  - initialize currentNode, which is equal to baseNode
  - break if the nodeName of the current loop is 'BODY'
  - reassign currentNode to the parent of the current node

  - initialize empty array siblings
  - find all the nodeNames off all the children of the parent of the currentNode
    adding the names to siblings
  - filter out all text nodes
  - push siblings into array

- return array
*/

function domTreeTracer(num) {
  let baseNode = document.getElementById(String(num));
  let array = [];

  for (let currentNode = baseNode; currentNode.nodeName != 'BODY'; currentNode = currentNode.parentNode) {
    let siblings = Array.from(currentNode.parentNode.childNodes);
    siblings = siblings.map(sibling => sibling.nodeName);

    array.push(siblings.filter(sibling => sibling != '#text'))
  }

  return array;
}

console.log(domTreeTracer(1)); // [["ARTICLE"]]
console.log(domTreeTracer(2)); // [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
console.log(domTreeTracer(22)); // [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]