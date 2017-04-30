import { reconcile } from "./reconciler";

export function render(element, container) {
  const instance = reconcile(container, null, element);
}
