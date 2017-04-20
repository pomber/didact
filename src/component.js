export default class Component {
  static __createPublicInstance(type, props, updater) {
    const publicInstance = new type(props);
    publicInstance.__updater = updater;
    return publicInstance;
  }

  constructor(props) {
    this.props = props;
    this.state = this.state || {};
    this.__updater = null; // Set by __createPublicInstance
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    this.__updater();
  }
}
