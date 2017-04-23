import * as DomUtils from "./dom-utils";
import Component from "./component";

export function createInstance(element) {
  const isDomElement = typeof element.type === "string";
  const create = isDomElement ? createDomInstance : createCompositeInstance;
  return create(element);
}

export function updateInstance(instance, element) {
  const isDomElement = typeof instance.element.type === "string";
  const update = isDomElement ? updateDomInstance : updateCompositeInstance;
  update(instance, element);
}

function createCompositeInstance(element) {
  const instance = {};
  const publicInstance = Component.__create(element, instance);
  const childElement = publicInstance.render();
  const childInstance = createInstance(childElement);

  instance.element = element;
  instance.publicInstance = publicInstance;
  instance.childInstance = childInstance;
  instance.dom = childInstance.dom;

  return instance;
}

function createDomInstance(element) {
  const childElements = element.props.children || [];
  const childInstances = childElements.map(createInstance);
  const childDoms = childInstances.map(childInstance => childInstance.dom);

  const dom = DomUtils.createDom(element);
  DomUtils.updateAttributes(dom, [], element.props);
  DomUtils.appendChildren(dom, childDoms);

  const instance = {
    element,
    childInstances,
    dom
  };

  return instance;
}

function updateCompositeInstance(instance, nextElement) {
  const element = nextElement || instance.element;
  instance.publicInstance.props = element.props;

  const prevChildElement = instance.childInstance.element;
  const nextChildElement = instance.publicInstance.render();
  if (prevChildElement.type === nextChildElement.type) {
    updateInstance(instance.childInstance, nextChildElement);
  } else {
    instance.childInstance = createInstance(nextChildElement);
    DomUtils.replaceChild(instance.childInstance.dom, instance.dom);
    instance.dom = instance.childInstance.dom;
  }
}

function updateDomInstance(instance, nextElement) {
  const dom = instance.dom;
  const prevChildInstances = instance.childInstances;
  const prevProps = instance.element.props;
  const nextProps = nextElement.props;

  DomUtils.updateAttributes(dom, prevProps, nextProps);

  const prevChildElements = prevProps.children || [];
  const nextChildElements = nextProps.children || [];

  instance.element = nextElement;
  instance.childInstances = reconcileChildren(
    dom,
    prevChildInstances,
    prevChildElements,
    nextChildElements
  );
}

function reconcileChildren(
  dom,
  prevChildInstances,
  prevChildElements,
  nextChildElements
) {
  const nextChildInstances = [];
  const count = Math.max(prevChildElements.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const prevChildElement = prevChildElements[i];
    const nextChildElement = nextChildElements[i];
    const childInstance = prevChildInstances[i];
    if (prevChildElement === undefined) {
      const nextChildInstance = createInstance(nextChildElement);
      DomUtils.appendChild(dom, nextChildInstance.dom);
      nextChildInstances.push(nextChildInstance);
    } else if (nextChildElement === undefined) {
      DomUtils.removeChild(dom, childInstance.dom);
    } else if (prevChildElement.type === nextChildElement.type) {
      updateInstance(childInstance, nextChildElement);
      nextChildInstances.push(childInstance);
    } else {
      const nextChildInstance = createInstance(nextChildElement);
      DomUtils.replaceChild(dom, nextChildInstance.dom, childInstance.dom);
      nextChildInstances.push(nextChildInstance);
    }
  }
  return nextChildInstances;
}
