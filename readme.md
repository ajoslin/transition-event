# transition-event [![Build Status](https://travis-ci.org/ajoslin/transition-event.svg?branch=master)](https://travis-ci.org/ajoslin/transition-event)

> CSS Transition handlers for value-event

## Install

```
$ npm install --save transition-event
```

## Usage

```js
var transitionEndEvent = require('transition-event')
var h = require('virtual-dom/h')

h('div', {
  'ev-transitionend': transitionEvent.end(transitionEndHandler)
})
```

## API

#### `transitionEvent.start(handler, [data], [options])` -> `function`
#### `transitionEvent.end(handler, [data], [options])` -> `function`

##### handler

*Required*
Type: `function`

The handler to call when the element receives the specified animation event.

By default, the handler will only be called for transitions happening directly on the given element, not events bubbled from children. See `options.allowBubble` below.

##### data

Type: `object`
Default: `{}`

Data to pass to the handler. This will be extended with:

###### time

Type: `number`

The transition duration in seconds, read from the event's `elapsedTime`.

##### options

Type: `object`
Default: `{}`

###### allowBubble

Type: `boolean`
Default: `false`

Whether to allow transition events bubbled from children. By default, events bubbled from children do *not* cause the handler to be called.

## License

MIT © [Andrew Joslin](http://ajoslin.com)
