<p align="center"><img src="https://cloud.githubusercontent.com/assets/1911623/26426031/5176c348-40ad-11e7-9f1a-1e2f8840b562.jpeg"></p>

# Didact [![Build Status](https://travis-ci.org/hexacta/didact.svg?branch=master)](https://travis-ci.org/hexacta/didact) [![npm version](https://img.shields.io/npm/v/didact.svg?style=flat)](https://www.npmjs.com/package/didact)
 
> A DIY guide to build your own React

This repository goes together with a [series of posts](https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5) that explains how to build React from scratch step by step.  


## Motivation

Didact's goal is to make React internals easier to understand by providing a simpler implementation of the same API and step-by-step instructions on how to build it. Once you understand how React works on the inside, using it will be easier. 

## Step-by-step guide

| Medium Post | Code sample | Commits |
| --- | :---: | :---: |
| [Introduction](https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5) |  |  | 
| [Rendering DOM elements](https://engineering.hexacta.com/didact-rendering-dom-elements-91c9aa08323b) | [codepen](https://codepen.io/pomber/pen/eWbwBq?editors=0010) | [diff](https://github.com/hexacta/didact/commit/fc4d360d91a1e68f0442d39dbce5b9cca5a08f24) |
| [Element creation and JSX](https://engineering.hexacta.com/didact-element-creation-and-jsx-d05171c55c56) | [codepen](https://codepen.io/pomber/pen/xdmoWE?editors=0010) | [diff](https://github.com/hexacta/didact/commit/15010f8e7b8b54841d1e2dd9eacf7b3c06b1a24b) |
| [Virtual DOM and reconciliation](https://engineering.hexacta.com/didact-instances-reconciliation-and-virtual-dom-9316d650f1d0) | [codepen](https://codepen.io/pomber/pen/WjLqYW?editors=0010)  | [diff](https://github.com/hexacta/didact/commit/8eb7ffd6f5e210526fb4c274c4f60d609fe2f810) [diff](https://github.com/hexacta/didact/commit/6f5fdb7331ed77ba497fa5917d920eafe1f4c8dc) [diff](https://github.com/hexacta/didact/commit/35619a039d48171a6e6c53bd433ed049f2d718cb) |
| [Components and State](https://engineering.hexacta.com/didact-components-and-state-53ab4c900e37) | [codepen](https://codepen.io/pomber/pen/RVqBrx) | [diff](https://github.com/hexacta/didact/commit/2e290ff5c486b8a3f361abcbc6e36e2c21db30b8) |
| [Fiber: Incremental reconciliation](https://engineering.hexacta.com/didact-fiber-incremental-reconciliation-b2fe028dcaec) | [codepen](https://codepen.io/pomber/pen/veVOdd) | [diff](https://github.com/hexacta/didact/commit/6174a2289e69895acd8fc85abdc3aaff1ded9011) [diff](https://github.com/hexacta/didact/commit/accafb81e116a0569f8b7d70e5b233e14af999ad) |

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

  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    const name = this.props.name;
    const times = this.state.count;
    return (
      <div onClick={e => this.handleClick()}>
        Hello {name + "!".repeat(times)}
      </div>
    );
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
[incremental-rendering-demo](https://pomber.github.io/incremental-rendering-demo/didact.html)

## License

MIT © [Hexacta](https://www.hexacta.com)
