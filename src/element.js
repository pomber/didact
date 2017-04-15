export function createElement(type, config, ...args) {
  let props = Object.assign({}, config);
  if (args.length) {
    const allChildren = [].concat(...args);
    props.children = allChildren.filter(c => c != null && c !== false);
  }
  return { type, props };
}
