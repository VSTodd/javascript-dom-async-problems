/*
- Implement a function named delegateEvent that delegates events to the
  descendant (inner) elements of a parent element that match a given selector
- It returns true if it was able to add an event listener and undefined if not

- For example, if the parentElement is section and selector is p, the function
  should delegate events of eventType on the p element within section to the
  function callback; consequently, the function returns true.

- Assume that all event handlers listen during the bubbling phase.

- Input: two elements, an event type (such as `click`), and a callback
- Output: true if event listener is added to selector, undefined if not
*/


function delegateEvent(parentElement, selector, eventType, callback) {
  if (!parentElement) {
    return undefined
  } else {
    parentElement.addEventListener(eventType, event => {
      let children = Array.from(parentElement.querySelectorAll(selector));
      if (children.includes(event.target)) {
        callback(event);
      }
    });
  }
  return true;
}


// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

// Possible callback for use with the scenarios
const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

console.log(delegateEvent(element1, 'p', 'click', callback));