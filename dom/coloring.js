/*
- Write a function that colors a specific generation of the DOM tree (a set of
  elements that are on the same level of indentation)
- You may use the .generation-color class to color the specific generation

input: number, representing generation
output: changed color of column on html page

- start with the parent (body) which can be the id equivalent of 0
- keep an array of nodeLists, continuing to replace to nodeLists with an array of
  nodeLists for that node's children
- flatten the array, then iterate over each node, adding to them the class
  `.generation-color`


*/

function colorGeneration(gen) {
  let nodeArray = [];
  for (let currentGen = 0; currentGen < gen; currentGen++) {
    if (nodeArray.length === 0) {
      nodeArray = Array.from(document.querySelector('body').childNodes);
    } else {
      nodeArray = nodeArray.map(node => Array.from(node.childNodes));
    }
    nodeArray = nodeArray.flat().filter(node => node.nodeType === 1);
  }
  console.log(nodeArray)
  nodeArray.forEach(node => node.classList.add('generation-color'))
}

colorGeneration(1);

