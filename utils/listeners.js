import * as Trackers from './trackers';

/**
 * Create and attach a listener.
 * @param {String} type Type of listener.
 * @param {DOMNode} parent Parent element.
 * @param {Funciton} tracker Tracker method.
 * @param {Boolean} ignoreSynthetic Whether or not to ignore synthetic events.
 * @param {Number} timeout Time after which to invoke callback automatically.
 * 
 * @return {Function} off Turn off the listeners.
 */
function createAndAttachListener(type, parent, tracker, ignoreSynthetic, timeout) {
  const children = parent.querySelectorAll(`*[data-lytics=${type}]`);

  if (!children || children.length === 0) return;

  const listener = e => {
    if (ignoreSynthetic && !e.isTrusted) {
      return;
    }

    // Traverse through all the elements in the path and check if events need to be tracked.
    let current = e.target;
    while (current && current !== e.currentTarget) {
      Trackers.checkLyticsAndTrack(current, e, type, tracker, timeout);
      current = current.parentElement;
    }
  };

  parent.addEventListener(type, listener, true);

  return () => {
    parent.removeEventListner(type, listener);
  }
}

/**
 * Initializes all listeners.
 * @param {DOMNode} parent Parent element.
 * @param {Funciton} tracker Tracker method.
 * @param {Boolean} ignoreSynthetic Whether or not to ignore synthetic events.
 * @param {Number} timeout Time after which to invoke callback automatically.
 *
 * @return {Function} off Turn off the listeners.
 */
export function initListeners(parent, tracker, ignoreSynthetic, timeout) {
  const click = createAndAttachListener('click', parent, tracker, ignoreSynthetic, timeout);
  const submit = createAndAttachListener('submit', parent, tracker, ignoreSynthetic, timeout);

  return () => {
    click();
    submit();
  }
}