/**
 * Tells if the meta key was pressed (Ctrl, Cmd, Win, Shift)
 * @param {Event} e Event
 *
 * @return {Boolean}
 */
function hasMetaKey(e) {
  return e.ctrlKey || e.metaKey || e.shiftKey;
}

/**
 * Prevents default behavior if something is being opened in a new tab. Returns new callback.
 * @param {Event} e Event
 * @param {Function} callback Existing callback.
 *
 * @return {Function}
 */
function preventDefaultIfOpeningInNewTab(e, callback) {
  if (!hasMetaKey(e)) {
    e.preventDefault();
    return callback;
  }
}

/**
 * Gets callback and prevents default if required.
 * @param {Function} callbackGetter Method to get the callback from.
 * @param {DOMNode} el
 * @param {Event} e
 *
 * @return {Function} callback
 */
export function getCallbackAndPreventDefault(callbackGetter, el, e) {
  let callback = callbackGetter.call(null, el, e);
  if (callback) {
    callback = preventDefaultIfOpeningInNewTab(e, callback);
  }

  return callback;
}

/**
 * Generates specialized callback for anchor elem.
 * @param {DOMNode} el Anchor elem.
 * @param {Event} e Event
 *
 * @return {Function}
 */
export function getCallbackForAnchorClick(el) {
  /**
   * Return noop if el.target is not present,
   * or if el.target = '_self' as it will
   * open the link in a new tab or something and
   * won't affect JS execution on this page.
   */
  const target = el.getAttribute('target');
  if (target && target !== '_self') {
    return;
  }

  // Othewise, redirect to href.
  return function () {
    const href = el.getAttribute('href');
    if (href) {
      window.location.href = href;
    }
  };
}

/**
 * Generates specialized callback for form submission.
 * @param {DOMNode} el Form elem.
 * @param {Event} e Event
 *
 * @return {Function}
 */
export function getCallbackForFormSubmit(el) {
  /**
   * Return noop if el.target is not present,
   * or if el.target = '_self' as it will
   * submit the form in a new tab or something and
   * won't affect JS execution on this page.
   */
  const target = el.getAttribute('target');
  if (target && target !== '_self') {
    return;
  }

  // Othweise, submit the form.
  return function () {
    el.submit();
  };
}