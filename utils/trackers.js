import * as Attributes from './attributes';
import * as Callbacks from './callbacks';

function noop () {}

/**
 * Parses parameters on e.target and tracks event.
 * @param {DOMNode} el DOM Element
 * @param {Event} e Event
 * @param {String} action Type of action.
 * @param {Function} tracker Tracker method.
 */
function parseParamsAndTrack(el, e, action, tracker) {
  const attributes = Attributes.getLyticsAttributes(el);

  // If there are not attributes, do nothing.
  if (Object.getOwnPropertyNames(attributes).length === 0) {
    return;
  }

  const nodeName = el.nodeName.toLowerCase();
  let callback;

  if (action === 'click') {
    // If it's an anchor tag, get special callback.
    if (nodeName === 'a') {
      callback = Callbacks.getCallbackAndPreventDefault(Callbacks.getCallbackForAnchorClick, el, e);
    }
  } else if (action === 'submit') {
    // If it's a form, get special callback.
    if (nodeName === 'form') {
      callback = Callbacks.getCallbackAndPreventDefault(Callbacks.getCallbackForFormSubmit, el, e);
    }
  }

  if (!callback) {
    callback = noop;
  }

  // Track the attributes.
  tracker(attributes, callback);
}

/**
 * Checks for Lytics present on element.
 * @param {DOMNode} el Element on which Lytics needs to be checked.
 * @param {Event} event Event
 * @param {String} type Type of event.
 * @param {Function} tracker Tracker method.
 */
export function checkLyticsAndTrack(el, event, type = 'click', tracker) {
  // Check if the clicked element has Lytics to be tracked.
  if (!el) return;

  const attributes = Attributes.getLyticsAttributes(el);

  if (attributes.trigger && attributes.trigger === type) {
    parseParamsAndTrack(el, event, type, tracker);
  }
}
