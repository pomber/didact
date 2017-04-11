export function createElement(type, config, ...args) {
  let props = Object.assign({}, config);
  if (args.length) props.children = [].concat(...args);
  return { type, props };
}
