export function createDom(element) {
  return element.type === "TEXT ELEMENT"
    ? document.createTextNode("")
    : document.createElement(element.type);
}

export function appendChildren(dom, childDoms) {
  childDoms.forEach(childDom => dom.appendChild(childDom));
}

export function appendChild(dom, childDom) {
  dom.appendChild(childDom);
}

export function removeChild(dom, childDom) {
  dom.removeChild(childDom);
}

export function replaceChild(newChildDom, oldChildDom) {
  const parentDom = oldChildDom.parentNode;
  parentDom.replaceChild(newChildDom, oldChildDom);
}

export function updateAttributes(dom, prevProps, nextProps) {
  // Remove events
  Object.keys(prevProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.removeEventListener(eventType, prevProps[name]);
  });

  // Remove attributes
  Object.keys(prevProps).filter(isAttribute).forEach(name => {
    dom[name] = null;
  });

  // Set attributes
  Object.keys(nextProps).filter(isAttribute).forEach(name => {
    const value = nextProps[name];
    if (name === "autoFocus") {
      if (value === false) {
        dom.blur();
      } else {
        dom.focus();
      }
    } else if (value != null && value !== false) {
      dom[name] = value;
    }
  });

  // Set events
  Object.keys(nextProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, nextProps[name]);
  });
}

const isEvent = name => name.startsWith("on");
const isAttribute = name => !isEvent(name) && name != "children";
