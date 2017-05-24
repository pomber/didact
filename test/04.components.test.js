import test from "ava";
import browserEnv from "browser-env";
/** @jsx createElement */
import { render, createElement, Component } from "../src/didact";

// Create document global var
browserEnv(["document"]);

test.beforeEach(t => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  t.context.root = root;
});

test("render component", t => {
  const root = t.context.root;
  class FooComponent extends Component {
    render() {
      return <div><b /><a href="foo" /></div>;
    }
  }
  render(<FooComponent />, root);
  t.is(root.innerHTML, '<div><b></b><a href="foo"></a></div>');
});

test("render component with props", t => {
  const root = t.context.root;
  class FooComponent extends Component {
    render() {
      return <div><b>{this.props.name}</b><a href="foo" /></div>;
    }
  }
  render(<FooComponent name="Bar" />, root);
  t.is(root.innerHTML, '<div><b>Bar</b><a href="foo"></a></div>');
});
