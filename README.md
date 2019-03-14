# lytics.js
> Simpler analytics using HTML attributes.

<a href="https://www.npmjs.com/package/lytics.js" alt="npm"><img src="https://img.shields.io/npm/v/lytics.js.svg" /></a> <a href="https://github.com/razorpay/lytics.js/tree/master/LICENSE" alt="license"><img src="https://img.shields.io/github/license/razorpay/lytics.js.svg" /></a>

Lytics enables analytics tracking by adding `data-lytics-*` attributes to HTML elements, without having to write JavaScript for individual elements.

### Why?

There are lots of "clicks" and "submits" on websites that we need to track. Writing code to add event listeners to lots of elements is not really elegant.

# Getting Started

### Installing

NPM
```bash
npm i lytics --save
```

Unpkg
```html
<script src="pathtounpkg" type="text/javascript"></script>
```

### Initialising

Add `data-lytics-*` attributes to elements, and initialize Lytics by invoking `lytics.init(opts)`.

Import the package if you are using npm.

```js
import lytics from 'lytics.js';
```

If the script is included using a `<script>` tag, lytics will be available as `window.lytics`.

Initialise lytics:
```js
lytics.init({
  parent: '#myContainer',
  track: (props, callback) => {
    trackAnalyticsForWebsite(props)
      .then(() => {
        callback();
      });
  }
})
```

# Documentation

### Triggers

Currently, only two types of triggers are supported:
1. click
2. submit

### `data-lytics-*`

- Attributes to track have to be specified as data attributes with the prefix `data-lytics-`. Example: `data-lytics-foo-bar="baz"`. When this property is sent to the tracker, it is converted into camelCase. The tracker will receive `{ fooBar: "baz" }` as the event properties.
- The trigger is specified using the attribute `data-lytics`. For example, for click tracking, we would use `data-lytics="click"`. Due to this, `data-lytics-trigger` will not be respected and hence will not work.

### `lytics.init`

`lytics.init` accepts on parameter: an object with the following properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| parent | String or HTMLElement | `document.documentElement` | Parent element or selector. Delegated events will be listened from this element. |
| track | Function | (p, cb) => cb(); | Function that gets two parameters: `props`, `callback`. Make sure to invoke callback in the tracking method that you provide. |
| ignoreSynthetic | Boolean | `true` | Whether or not to ignore synthetic events. Synthetic events are events trigerred programmatically. |
| timeout | Number | 300 | Timeout for automatic invocation of callback. If the callback isn't executed within `timeout` ms by you, it will automatically be executed.

We need the `timeout` property because in case of links (with lytics attributes) being opened in new tabs, if there's a huge delay before the callback is executed, the browser will prevent the new tab from being opened due to popup blocking. In case you are confident about executing the callback, you can pass `0` as the timeout value, it will disable automativc invocation of callback.

It returns an object, which has the following properties.

| Property | Type | Description |
| --- | --- | --- |
| off | Function | Turns off tracking. |

### Tracker method

The tracker method that you pass while initializing lytics will receive two argumetns upon each event:
1. `props` - Contains the event properties.
2. `callback` - Callback to invoke once processing is done. When callback is invoked, the default behaviour of the event will be triggered. For example, when a link is clicked, redirection will only happen after `callback` is invoked.

### `lytics.getLyticsAttributes(el)`

This method takes a DOM Element as an argument and returns an object containing values for Lytics that exist on that element.

# Misc

- Lytics is supposed to be used only on elements whose behaviour isn't being overriden manually by JavaScript.

#### Browser Support

| Browser | Version |
| --- | --- |
| Chrome | 1 |
| Edge | All |
| Firefox | 3.5 |
| IE | 8 |
| Opera | 10 |
| Safari | 3.2 |

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details