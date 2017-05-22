<p align="center"><img src="https://cloud.githubusercontent.com/assets/1911623/25565381/339d8c36-2d9c-11e7-89ae-8f6c32adf35f.png"></p>

#
[![Build Status](https://travis-ci.org/hexacta/didact.svg?branch=master)](https://travis-ci.org/hexacta/didact) [![npm version](https://img.shields.io/npm/v/didact.svg?style=flat)](https://www.npmjs.com/package/didact)
 
> A DIY guide to build your own React

This repository goes together with a [series of posts](https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5) that explains how to build React from scratch step by step.  


## Motivation

Didact's goal is to make React internals easier to understand by providing a simpler implementation of the same API and step-by-step instructions on how to build it. Once you understand how React works on the inside, using it will be easier. 

## Step-by-step guide

We are doing a step-by-step guide to the code on Medium. These are the posts of the series so far:

| Medium Post | Code sample | Commit |
| --- | :---: | :---: |
| [Introduction](https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5) |  |  | 
| [Rendering DOM elements](https://engineering.hexacta.com/didact-rendering-dom-elements-91c9aa08323b) | [codepen](https://codepen.io/pomber/pen/xddXwq?editors=0010) | [diff]() |
| [Element creation and JSX](https://engineering.hexacta.com/didact-rendering-dom-elements-91c9aa08323b) | [codepen](https://codepen.io/pomber/pen/xddXwq?editors=0010) | [diff]() |
| [Virtual DOM and reconciliation](https://engineering.hexacta.com/didact-instances-reconciliation-and-virtual-dom-9316d650f1d0) | [codepen](https://codepen.io/pomber/pen/KmyBvO?editors=0010)  | [diff]() |
| [Components and State]() | [codepen](https://codepen.io/pomber/pen/KmyBvO?editors=0010) | [diff]() |

Things that are not included in Didact (yet):  
- Functional components (but should be easy to add)
- Context
- Lifecycle methods
- The `ref` attribute
- Reconciliation by `key` (only reconciliation by children order)
- [Fiber](https://facebook.github.io/react/contributing/codebase-overview.html#fiber-reconciler)
- Others renderers (only DOM is supported)
- Old browsers support

## Usage
> 🚧 Don't use this for production code!

Install it with npm or yarn:  

```
$ yarn add didact
```

And then use it like you use React:  

```jsx
/** @jsx Didact.createElement */
import Didact from 'didact';

class HelloMessage extends Didact.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

Didact.render(
  <HelloMessage name="John" />,
  document.getElementById('container')
);
```

## Demos
[hello-world](https://rawgit.com/hexacta/didact/master/examples/hello-world/index.html)  
[hello-world-jsx](https://rawgit.com/hexacta/didact/master/examples/hello-world-jsx/index.html)  
[todomvc](https://didact-todomvc.surge.sh)  

## License

MIT © [Hexacta](https://www.hexacta.com)
