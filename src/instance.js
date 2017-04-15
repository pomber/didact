class CompositeComponent {
  constructor(element) {
    this.currentElement = element;
    this.publicInstance = null;
    this.childInstance = null;
  }

  mount() {
    const { type, props } = this.currentElement;
    this.publicInstance = new type(props);
    this.publicInstance.__updater = this.update.bind(this);
    const childElement = this.publicInstance.render();
    this.childInstance = instantiate(childElement);
    return this.childInstance.mount();
  }

  update(nextElement) {
    this.currentElement = nextElement || this.currentElement;
    const { props } = this.currentElement;
    this.publicInstance.props = props;
		const prevChildElement = this.childInstance.currentElement;
    const nextChildElement = this.publicInstance.render();
    if (prevChildElement.type === nextChildElement.type) {
      this.childInstance.update(nextChildElement);
    } else {
      const prevDom = this.getDom();
      this.childInstance = instantiate(nextChildElement);
      const nextDom = this.childInstance.mount();
      prevDom.parentNode.replaceChild(nextDom, prevDom);
    }
  }

  getDom() {
    return this.childInstance.getDom();
  }
}

class DomComponent {
  constructor(element) {
    this.currentElement = element;
    this.dom = null;
    this.childInstances = null;
  }

  mount() {
    const { type, props } = this.currentElement;
    this.dom = document.createElement(type);

    // Set attributes
    Object.keys(props).filter(isAttribute).forEach(name => {
      const value = props[name];
      if (value != null && value !== false) {
        this.dom.setAttribute(name, value);
      }
    });

    // Set events
    Object.keys(props).filter(isEvent).forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      this.dom.addEventListener(eventType, props[name]);
    });

    // Set children
    const childElements = props.children || [];
    this.childInstances = childElements
      .filter(child => child != null)
      .map(instantiate);
    this.childInstances
      .map(childInstance => childInstance.mount())
      .forEach(childDom => this.dom.appendChild(childDom));

    return this.dom;
  }

  update(nextElement) {
    const prevProps = this.currentElement.props;
    const nextProps = nextElement.props;

    // Remove attributes
    Object.keys(prevProps).filter(isAttribute).forEach(name => {
      this.dom.removeAttribute(name);
    });

    // Set attributes
    Object.keys(nextProps).filter(isAttribute).forEach(name => {
      const value = nextProps[name];
      if (value != null && value !== false) {
        this.dom.setAttribute(name, value);
      }
    });

    // Remove events
    Object.keys(prevProps).filter(isEvent).forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      this.dom.removeEventListener(eventType, prevProps[name]);
    });

    // Set events
    Object.keys(nextProps).filter(isEvent).forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      this.dom.addEventListener(eventType, nextProps[name]);
    });

    // Update children
    const prevChildElements = prevProps.children || [];
    const nextChildElements = nextProps.children || [];
    const prevChildInstances = this.childInstances;
    const nextChildInstances = [];
    const length = Math.max(prevChildElements.length, nextChildElements.length);
    for (let i = 0; i < length; i++) {
      const prevChildElement = prevChildElements[i];
      const nextChildElement = nextChildElements[i];
      if (!prevChildElement) {
        // Add new child
        const childInstance = instantiate(nextChildElement);
        nextChildInstances.push(childInstance);
        const childDom = childInstance.mount();
        this.dom.appendChild(childDom);
      } else if (!nextChildElement) {
        // Remove old child
        const childInstance = prevChildInstances[i];
        const childDom = childInstance.getDom();
        this.dom.removeChild(childDom);
      } else if (
        prevChildElement.type && prevChildElement.type === nextChildElement.type
      ) {
        // Update child
        const childInstance = prevChildInstances[i];
        nextChildInstances.push(childInstance);
        childInstance.update(nextChildElement);
      } else {
        // Replace old with new
        const nextChildInstance = instantiate(nextChildElement);
        nextChildInstances.push(nextChildInstance);
        const nextChildDom = nextChildInstance.mount();
        const prevChildInstance = prevChildInstances[i];
        const prevChildDom = prevChildInstance.getDom(); // FIX fails for text
        this.dom.replaceChild(nextChildDom, prevChildDom);
      }
    }

    this.currentElement = nextElement;
    this.childInstances = nextChildInstances;
  }

  getDom() {
    return this.dom;
  }
}

class TextComponent {
  constructor(element) {
    this.text = "" + element;
		this.dom = null;
  }

  mount() {
		this.dom = document.createTextNode(this.text)
    return this.dom;
  }

  update(nextElement) {
    const nextText = "" + element;
		this.dom.nodeValue = nextText;
  }

  getDom() {
    return this.dom;
  }
}

export function instantiate(element) {
  if (typeof element === "string" || typeof element === "number") {
    return new TextComponent(element);
  } else if (typeof element.type === "string") {
    return new DomComponent(element);
  } else {
    return new CompositeComponent(element);
  }
}

const isEvent = name => name.startsWith("on");
const isAttribute = name => !isEvent(name) && name != "children";
