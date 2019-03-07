import * as Attributes from './utils/attributes';
import * as Listeners from './utils/listeners';

const noopTracker = function (props, cb) {
  cb && cb(props);
};

/**
 * Initialize Lytics.
 * For documentation, refer to README in this directory.
 * @param {Object} params
 *
 * @return {Object}
 */
function lytics(options = {}) {
  let {
    parent = document.documentElement,
    tracker = noopTracker,
    ignoreSynthetic = true,
  } = options;

  // Check if parent is a string.
  if (typeof parent === 'string') {
    parent = document.querySelector(parent);
  }

  // If parent is not an HTMLElement, do nothing and simply return.
  if (!(parent instanceof HTMLElement)) {
    return;
  }

  const off = Listeners.initListeners(parent, tracker, ignoreSynthetic);

  return {
    off
  };
}

lytics.getAttribsFromEl = Attributes.getLyticsAttributes;

// Set in window.
if (window) {
  window.lytics = lytics;
}

export default lytics;
