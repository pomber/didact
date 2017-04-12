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

test("change component state", t => {
  const root = t.context.root;
  let callback;
  class Foo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        active: true
      };
      callback = () => {
        this.setState({
          active: false
        });
      };
    }
    render() {
      return <div>{this.state.active ? "on" : "off"}</div>;
    }
  }
  const element = <Foo />;
  render(element, root);
  t.is(root.innerHTML, "<div>on</div>");
	callback();
	t.is(root.innerHTML, "<div>off</div>");
});

test("use state without initializing", t => {
  const root = t.context.root;
  class Foo extends Component {
    render() {
      const {name} = this.state;
      return <div>Hello {name}</div>;
    }
  }
  const element = <Foo />;
  render(element, root);
  t.is(root.innerHTML, "<div>Hello </div>");
});
