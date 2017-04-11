import test from "ava";
import browserEnv from "browser-env";
/** @jsx createElement */
import { createElement } from "../src/element";
import Component from "../src/component";
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
  class Foo extends Component {
    render() {
      return <div />;
    }
  }
  const element = <Foo />;
  render(element, root);
  t.is(root.innerHTML, "<div></div>");
});

test("render component with conditional prop", t => {
  const root = t.context.root;
  class Foo extends Component {
    render() {
      return this.props.span ? <span /> : <div />;
    }
  }
  const element = <Foo span />;
  render(element, root);
  t.is(root.innerHTML, "<span></span>");
});

test("render component with basic child", t => {
  const root = t.context.root;
  class Foo extends Component {
    render() {
      return <ul>{this.props.children}</ul>;
    }
  }
  const element = <Foo><li>one</li><li>two</li></Foo>;
  render(element, root);
  t.is(root.innerHTML, "<ul><li>one</li><li>two</li></ul>");
});

test("render null children", t => {
  const root = t.context.root;
  const element = createElement("div", {}, null, "foo", null);
  render(element, root);
  t.is(root.innerHTML, "<div>foo</div>");
});
