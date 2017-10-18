import test from "ava";
import "./_browser-mock";
import { render } from "../src/didact";

test.beforeEach(t => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  t.context.root = root;
});

test("render div", t => {
  const root = t.context.root;
  const element = {
    type: "div",
    props: {}
  };
  render(element, root);
  t.is(root.innerHTML, "<div></div>");
});

test("render div with children", t => {
  const root = t.context.root;
  const element = {
    type: "div",
    props: {
      children: [
        { type: "b", props: {} },
        { type: "a", props: { href: "foo" } }
      ]
    }
  };
  render(element, root);
  t.is(root.innerHTML, '<div><b></b><a href="foo"></a></div>');
});

test("render div with props", t => {
  const root = t.context.root;
  const element = {
    type: "div",
    props: { id: "foo" }
  };
  render(element, root);
  t.is(root.innerHTML, '<div id="foo"></div>');
});

test("render span with text child", t => {
  const root = t.context.root;
  const element = {
    type: "span",
    props: {
      children: [
        {
          type: "TEXT ELEMENT",
          props: { nodeValue: "Foo" }
        }
      ]
    }
  };
  render(element, root);
  t.is(root.innerHTML, "<span>Foo</span>");
});
