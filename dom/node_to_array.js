/*
- Implement a function that converts the DOM, starting from the body, to nested
  arrays
- Each element in the DOM is represented as ["PARENT_TAG_NAME", [children]]
  where children are elements as well and as such follow the same format

- recursion??? take a stab

input: none
output: nested array

- initialize variable currentNode to the body node as default value
- initialize variable currentChildren to the children of currentNode, converted to array
- initialize array, nodes, with first element as currentNode tagname and second as empty array
  - if currentChildren is empty, return nodes
  - else
    - iterate over each child, calling nodesToArr on it, pushing into nodes

- return nodes
*/


function nodesToArr(currentNode = document.body) {
  let currentChildren = Array.from(currentNode.children);
  let nodes = [currentNode.tagName, []];

  if (currentChildren.length === 0) {
    return nodes;
  } else {
    currentChildren.forEach(child => nodes[1].push(nodesToArr(child)));
  }
  return nodes;
}


console.log(nodesToArr()); // ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]