import test from "ava";
/** @jsx createElement */
import { createElement } from "../src/element";
import Component from "../src/component";

test("create component", t => {
  class Foo extends Component {
    render() {
      return <div />;
    }
  }

  const element = <Foo />;
  const expected = { type: Foo, props: {} };
  t.deepEqual(element, expected);
});

test("create component with props", t => {
  class Foo extends Component {
    render() {
      return <div />;
    }
  }

  const element = <Foo bar="baz" />;
  const expected = { type: Foo, props: { bar: "baz" } };
  t.deepEqual(element, expected);
});

test("create nested components", t => {
  class Foo extends Component {
    render() {
      return <div />;
    }
  }

  const element = <Foo><Foo /></Foo>;
  const expectedChild = { type: Foo, props: {} };
  const expected = { type: Foo, props: { children: [expectedChild] } };
  t.deepEqual(element, expected);
});
