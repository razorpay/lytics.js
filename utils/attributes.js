/**
 * Returns all attribute names.
 * @param {DOMNode} el
 * 
 * @return {Array}
 */
function getAllAttributeNames(el) {
  const attributes = [];

  for (let i = 0; i < el.attributes.length; i++) {
    attributes.push(el.attributes[i].nodeName);
  }

  return attributes;
}

/**
 * Returns all attribute names that
 * start with "data-lytics-" or
 * name is "data-lytics".
 * @param {DOMNode} el
 * 
 * @return {Array}
 */
function getLyticsAttributeNames(el) {
  return getAllAttributeNames(el).filter(name => {
    name = name.toLowerCase();

    return (
      name !== 'data-lytics-trigger' &&
      (name === 'data-lytics' || name.indexOf('data-lytics-') === 0)
    );
  });
}

/**
 * Converts data-lytics-* string
 * to camelCase.
 * @param {String} name 
 * 
 * @return {String}
 */
function convertNameToLyticsProperty(name) {
  if (name === 'data-lytics') {
    return 'trigger';
  }

  name = name.toLowerCase().replace('data-lytics-', '').split('-').map((name, index) => {
    if (index === 0) {
      return name;
    }

    return name[0].toUpperCase() + name.slice(1, name.length);
  }).join('');

  return name;
}

/**
 * Returns the key-value pair of all lytics attributes.
 * @param {DOMNode} el
 * 
 * @return {Object}
 */
export function getLyticsAttributes(el) {
  const attributes = {};

  getLyticsAttributeNames(el).forEach(name => {

    attributes[convertNameToLyticsProperty(name)] = el.getAttribute(name);
  });

  return attributes;
}
