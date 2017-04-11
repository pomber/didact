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

test("handle click", t => {
  const root = t.context.root;
  class Foo extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
        active: true
      };
    }

    handleClick() {
      this.setState({
        active: false
      });
    }

    render() {
      return (
        <div onClick={this.handleClick}>{this.state.active ? "on" : "off"}</div>
      );
    }
  }
  const element = <Foo />;
  render(element, root);
  t.is(root.innerHTML, "<div>on</div>");

  var evt = document.createEvent("MouseEvent");
  evt.initEvent("click", false, true);
	// root.firstChild.addEventListener('click', console.log);
  root.firstChild.dispatchEvent(evt);
  t.is(root.innerHTML, "<div>off</div>");
});
