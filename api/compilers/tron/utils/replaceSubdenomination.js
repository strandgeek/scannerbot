function replaceSubdenominationWithValue(obj, value) {
  // Check if the input is an object
  if (obj !== null && typeof obj === 'object') {
    // Iterate over each key in the object
    for (const key in obj) {
      // Check if the key is "subdenomination"
      if (key === 'subdenomination') {
        obj[key] = value;
      } else {
        // If the value is an object or an array, recursively call the function
        if (typeof obj[key] === 'object') {
          replaceSubdenominationWithValue(obj[key]);
        } else if (Array.isArray(obj[key])) {
          // If the value is an array, iterate over its elements
          obj[key].forEach((element) =>
            replaceSubdenominationWithValue(element),
          );
        }
      }
    }
  }
  return obj;
}

module.exports = {
  replaceSubdenominationWithValue,
};
