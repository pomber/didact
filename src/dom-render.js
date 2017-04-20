import { instantiate } from "./instance";

export function render(element, container) {
  const instance = instantiate(element);
  const dom = instance.mount();
  container.appendChild(dom);
}
