'use strict'

var BaseEvent = require('value-event/base-event')
var Delegator = require('dom-delegator')
var extend = require('xtend')

var events = ['start', 'end']
var delegator = Delegator()

module.exports = events.reduce(function (acc, event) {
  acc[event] = BaseEvent(handleTransition)
  return acc
}, {})

events.forEach(function (event) {
  delegator.listenTo('transition' + event)
})

function handleTransition (event, broadcast) {
  // If option is given, only fire for transition events that fired on
  // the element that has the listener
  var allowBubble = this.opts && this.opts.allowBubble

  if (event.currentTarget !== event.target && !allowBubble) {
    return
  }

  var data = extend({
    time: event._rawEvent.elapsedTime
  }, this.data)

  broadcast(data)
}
