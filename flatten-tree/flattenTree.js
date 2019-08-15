function flattenTree(obj, parent = []) {
  const keys = Object.keys(obj);

  const type = typeof obj;
  if (type !== 'object' || type === 'function' || Array.isArray(obj)) {
    throw new Error(`${obj} is not an object`);
  }
  if (keys.length === 0) {
    return parent.length > 0 ? [parent.join(' > ')] : [];
  }
  return keys.reduce(
    (res, key) => [...res, ...flattenTree(obj[key], [...parent, key])],
    [],
  );
}

module.exports = flattenTree;
