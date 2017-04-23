import test from "ava";
/** @jsx createElement */
import { createElement } from "../src/element";

test("create empty div", t => {
  const element = <div />;
  const expected = { type: "div", props: {} };
  t.deepEqual(element, expected);
});

test("create div with props", t => {
  const element = <div foo="bar" />;
  const expected = { type: "div", props: { foo: "bar" } };
  t.deepEqual(element, expected);
});

test("create div with props and text child", t => {
  const element = <div foo="bar">Hello</div>;
  const expected = {
    type: "div",
    props: { foo: "bar", children: ["Hello"] }
  };
  t.deepEqual(element, expected);
});

test("create div with props and text children", t => {
  const element = <div foo="bar">{"Hello"}{" "}{"world"}</div>;
  const expected = {
    type: "div",
    props: { foo: "bar", children: ["Hello", " ", "world"] }
  };
  t.deepEqual(element, expected);
});

test("create div with span child", t => {
  const element = <div foo="bar"><span /></div>;
  const expected = {
    type: "div",
    props: { foo: "bar", children: [{ type: "span", props: {} }] }
  };
  t.deepEqual(element, expected);
});
