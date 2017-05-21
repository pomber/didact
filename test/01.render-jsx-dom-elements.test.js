import test from "ava";
import browserEnv from "browser-env";
/** @jsx createElement */
import { render, createElement } from "../src/didact";

// Create document global var
browserEnv(["document"]);

test.beforeEach(t => {
  const root = document.createElement("div");
  document.body.appendChild(root);
  t.context.root = root;
});

test.afterEach.always(t => {
  const root = t.context.root;
  root.innerHTML = "";
  document.body.removeChild(root);
});

test("render jsx div", t => {
  const root = t.context.root;
  const element = <div />;
  render(element, root);
  t.is(root.innerHTML, "<div></div>");
});

test("render div with children", t => {
  const root = t.context.root;
  const element = <div><b /><a href="foo" /></div>;
  render(element, root);
  t.is(root.innerHTML, '<div><b></b><a href="foo"></a></div>');
});

test("render div with props", t => {
  const root = t.context.root;
  const element = <div id="foo" />;
  render(element, root);
  t.is(root.innerHTML, '<div id="foo"></div>');
});

test("render span with text child", t => {
  const root = t.context.root;
  const element = <span>Foo</span>;
  render(element, root);
  t.is(root.innerHTML, "<span>Foo</span>");
});
