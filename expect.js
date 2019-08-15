function arrayEqual(result, expected) {
  if (result === expected) {
    return true;
  }
  if (result.length !== expected.length) {
    return false;
  }
  for (let i = 0; i < result.length; i += 1) {
    if (result[i] !== expected[i]) {
      return false;
    }
  }
  return true;
}

function expect(result) {
  return {
    isEqual(expected) {
      if (Array.isArray(result) && Array.isArray(expected)) {
        if (!arrayEqual(result, expected)) {
          throw new Error(`${result} is not equal to ${expected}`);
        }
        return;
      }
      if (result !== expected) {
        throw new Error(`${result} is not equal to ${expected}`);
      }
    },
    shouldError() {
      let errorOccured = false;
      try {
        result();
      } catch (e) {
        errorOccured = true;
      }
      if (!errorOccured) {
        throw new Error('Expect error but not founded');
      }
    },
  };
}

function test(title, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`Failed Test::${title}`);
    throw error;
  }
  console.log(`Succeed::${title}`);
}

module.exports = {
  test,
  expect,
};
