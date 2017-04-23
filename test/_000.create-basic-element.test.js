import test from "ava";
import { createElement } from "../src/element";

test("create empty div", t => {
  const element = createElement("div");
  const expected = { type: "div", props: {} };
  t.deepEqual(element, expected);
});

test("create div with props", t => {
  const element = createElement("div", { foo: "bar" });
  const expected = { type: "div", props: { foo: "bar" } };
  t.deepEqual(element, expected);
});

test("create div with props and text child", t => {
  const element = createElement("div", { foo: "bar" }, "Hello");
  const expected = {
    type: "div",
    props: { foo: "bar", children: ["Hello"] }
  };
  t.deepEqual(element, expected);
});

test("create div with props and text children", t => {
  const element = createElement("div", { foo: "bar" }, "Hello", " ", "world");
  const expected = {
    type: "div",
    props: { foo: "bar", children: ["Hello", " ", "world"] }
  };
  t.deepEqual(element, expected);
});

test("create div with span child", t => {
  const nestedElement = createElement("span");
  const element = createElement("div", { foo: "bar" }, nestedElement);
  const expected = {
    type: "div",
    props: { foo: "bar", children: [{ type: "span", props: {} }] }
  };
  t.deepEqual(element, expected);
});
