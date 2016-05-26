'use strict'

var test = require('tape')
var h = require('virtual-dom/h')
var thermometer = require('thermometer')
var dispatchEvent = require('dispatch-event')
var transitionEvent = require('./')

test(function (t) {
  t.plan(1)

  var Component = createComponent(function render (state) {
    return h('div', {
      'ev-transitionend': transitionEvent.end(state.onEnd, {foo: 'bar'})
    })
  })

  thermometer.createComponent(Component, {onEnd: onEnd}, function (state, element, done) {
    dispatchEvent(element, 'transitionend', {
      elapsedTime: 1
    })
    done()
  })

  function onEnd (data) {
    t.deepEqual(data, {foo: 'bar', time: 1})
  }
})

test('no bubbled events allowed by default', function (t) {
  t.plan(1)

  var Component = createComponent(function render (state) {
    return h('div', {
      'ev-transitionend': transitionEvent.end(state.onEnd, {foo: 'bar'})
    }, [
      h('child')
    ])
  })

  thermometer.createComponent(Component, {onEnd: onEnd}, function (state, element, done) {
    dispatchEvent(element.childNodes[0], 'transitionend', {
      elapsedTime: 1,
      bubbles: true
    })
    done()
    t.pass()
  })

  function onEnd (data) {
    t.fail('should not be called, no bubbling from children allowed')
  }
})

test('bubbled events allowed with option', function (t) {
  t.plan(1)

  var Component = createComponent(function render (state) {
    return h('div', {
      'ev-transitionend': transitionEvent.end(state.onEnd, {foo: 'bar'}, {allowBubble: true})
    }, [
      h('child')
    ])
  })

  thermometer.createComponent(Component, {onEnd: onEnd}, function (state, element, done) {
    dispatchEvent(element.childNodes[0], 'transitionend', {
      elapsedTime: 1,
      bubbles: true
    })
    done()
  })

  function onEnd (data) {
    t.deepEqual(data, {foo: 'bar', time: 1})
  }
})

function createComponent (renderFn) {
  function Component (data) {
    return () => data
  }
  Component.render = renderFn

  return Component
}
