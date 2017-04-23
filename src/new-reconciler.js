import * as DomUtils from "./dom-utils";
import Component from "./component";

export function reconcile(parentDom, instance, element) {
  if (instance === null) {
    //Create element
    const newInstance = instantiate(element);
    DomUtils.appendChild(parentDom, newInstance.dom);
    return newInstance;
  } else if (element === null) {
    //Remove element
    DomUtils.removeChild(parentDom, instance.dom);
    return null;
  } else if (instance.element.type !== element.type) {
    //Replace instance
    const newInstance = instantiate(element);
    DomUtils.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  } else if (typeof element.type === "string") {
    //Update dom instance
    const nextChildElements = element.props.children || [];
    DomUtils.updateAttributes(
      instance.dom,
      instance.element.props,
      element.props
    );
    instance.childInstances = reconcileChildren(
      instance.dom,
      instance.childInstances,
      nextChildElements
    );
    instance.element = element;
    return instance;
  } else {
    //Update composite instance
    instance.publicInstance.props = element.props;
    const newChildElement = instance.publicInstance.render();
    const childInstance = reconcile(
      parentDom,
      instance.childInstance,
      newChildElement
    );
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  }
}

function reconcileChildren(instance, nextChildElements) {
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const element = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, element);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances;
}

function instantiate(element) {
  const isDomElement = typeof element.type === "string";
  const instance = {};

  if (isDomElement) {
    const childElements = element.props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);

    const dom = DomUtils.createDom(element);
    DomUtils.updateAttributes(dom, [], element.props);
    DomUtils.appendChildren(dom, childDoms);

    instance.dom = dom;
    instance.element = element;
    instance.childInstances = childInstances;
  } else {
    const publicInstance = Component.__create(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);

    instance.element = element;
    instance.publicInstance = publicInstance;
    instance.childInstance = childInstance;
    instance.dom = childInstance.dom;
  }

  return instance;
}
