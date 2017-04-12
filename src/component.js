import { createDom } from "../src/dom-render";

export default class Component {
	constructor(props) {
		this.props = props;
		this.state = this.state || {};
	}

	setState(partialState) {
		const prevState = this.state;
		this.state = Object.assign({}, this.state, partialState);
		const element = this.render();
		const oldDom = this.__dom;
		const newDom = createDom(element);
		const parentDom = oldDom.parentNode;
		parentDom.replaceChild(newDom, oldDom);
		this.__dom = newDom;
	}
}