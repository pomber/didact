export default class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
    this.__updater = null; // Set by CompositeComponent
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    this.__updater();
  }
}
