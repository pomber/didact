const TEXT_ELEMENT = "TEXT ELEMENT";

export function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  if (args.length) {
    const allChildren = [].concat(...args);
    props.children = allChildren
      .filter(c => c != null && c !== false)
      .map(c => {
        return typeof c === "string" || typeof c === "number"
          ? { type: TEXT_ELEMENT, props: { nodeValue: c } }
          : c;
      });
  }
  return { type, props };
}
