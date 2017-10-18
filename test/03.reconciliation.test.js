import test from "ava";
import "./_browser-mock";
/** @jsx createElement */
import { render, createElement } from "../src/didact";

test.beforeEach(t => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  t.context.root = root;
});

test("replace div to span", t => {
  const root = t.context.root;
  let element = <div>Foo</div>;
  render(element, root);
  t.is(root.innerHTML, "<div>Foo</div>");
  const prevChild = root.firstElementChild;
  element = <span>Foo</span>;
  render(element, root);
  t.is(root.innerHTML, "<span>Foo</span>");
  const nextChild = root.firstElementChild;
  t.not(prevChild, nextChild);
});

test("reuse div", t => {
  const root = t.context.root;
  let element = <div>Foo</div>;
  render(element, root);
  t.is(root.innerHTML, "<div>Foo</div>");
  const prevChild = root.firstElementChild;
  element = <div>Bar</div>;
  render(element, root);
  t.is(root.innerHTML, "<div>Bar</div>");
  const nextChild = root.firstElementChild;
  t.is(prevChild, nextChild);
});
