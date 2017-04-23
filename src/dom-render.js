import { createInstance } from "./reconciler";

export function render(element, container) {
  const instance = createInstance(element);
  container.appendChild(instance.dom);
}
