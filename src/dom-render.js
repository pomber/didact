export function render(element, container) {
  let dom = createDom(element);
  container.appendChild(dom);
}

export function createDom(element) {
  if (typeof element.type === "string") {
    // Is a basic element (div, span, etc.)
    const dom = document.createElement(element.type);
    for (const name in element.props) {
      setProperty(dom, name, element.props[name]);
    }
    return dom;
  } else {
    // Is a custom component (Foo, Bar, etc.)
    const instance = new element.type(element.props);
    const renderedElement = instance.render();
    // renderedElement may be a basic element or a component
    // instance.__element = renderedElement;
    instance.__dom = createDom(renderedElement);
    return instance.__dom;
  }
}

function setProperty(dom, name, value) {
  if (name === "children") {
    setChildren(dom, value);
  } else if (name.startsWith("on")) {
    // It's an event handler
    const eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, value);
  } else if (value !== null && value !== false) {
    dom.setAttribute(name, value);
  }
}

function setChildren(dom, children) {
  children
    // Filter falsy children
    .filter(child => child)
    .forEach(child => {
      addChild(dom, child);
    });
}

function addChild(dom, child) {
  if (typeof child === "object") {
    // Child is an element
    render(child, dom);
  } else {
    // Child is a string, number, etc.
    dom.innerHTML += child;
  }
}
