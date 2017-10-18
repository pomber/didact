import test from "ava";
import "./_browser-mock";
/** @jsx createElement */
import { render, createElement, Component } from "../src/didact";

test.beforeEach(t => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  t.context.root = root;
});

test("change state on click", t => {
  const root = t.context.root;
  class FooComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    handleClick() {
      this.setState({
        count: this.state.count + 1
      });
    }

    render() {
      return <div onClick={e => this.handleClick()}>{this.state.count}</div>;
    }
  }
  render(<FooComponent />, root);
  t.is(root.innerHTML, "<div>0</div>");
  click(root.firstChild);
  t.is(root.innerHTML, "<div>1</div>");
});

function click(dom) {
  var evt = document.createEvent("MouseEvent");
  evt.initEvent("click", false, true);
  dom.dispatchEvent(evt);
}
