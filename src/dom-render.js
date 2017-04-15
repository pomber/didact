import { instantiate } from "./instance";

export function render(element, container) {
  const instance = instantiate(element);
  let dom = instance.mount();
  container.appendChild(dom);
}
