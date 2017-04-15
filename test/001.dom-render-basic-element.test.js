import test from "ava";
import browserEnv from "browser-env";
/** @jsx createElement */
import { createElement } from "../src/element";
import { render } from "../src/dom-render";

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

test("render div", t => {
  const root = t.context.root;
  const element = <div />;
  render(element, root);
  t.is(root.innerHTML, "<div></div>");
});

test("render div with props", t => {
  const root = t.context.root;
  const element = <div tabIndex="2" />;
  render(element, root);
  t.is(root.innerHTML, '<div tabindex="2"></div>');
});

test("render div with text child", t => {
  const root = t.context.root;
  const element = <div>foo</div>;
  render(element, root);
  t.is(root.innerHTML, "<div>foo</div>");
});

test("render div with span child", t => {
  const root = t.context.root;
  const element = <div><span /></div>;
  render(element, root);
  t.is(root.innerHTML, "<div><span></span></div>");
});

test("render nested elements with props", t => {
  const root = t.context.root;
  const link = "/foo";
  const label = "foo";
  const element = (
    <div>
      <a href={link}>Go to <b className="x">{label}</b>.</a>
      <a>bar</a>
    </div>
  );
  render(element, root);
  t.is(
    root.innerHTML,
    '<div><a href="/foo">Go to <b class="x">foo</b>.</a><a>bar</a></div>'
  );
});
