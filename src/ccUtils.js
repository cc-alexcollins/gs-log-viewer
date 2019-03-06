function cloneDeep(obj) {
  if (obj === undefined || obj === null) {
    return obj;
  }

  if (typeof obj === "object") {
    return Object.keys(obj).reduce(
      (ret, key) => {
        ret[key] = cloneDeep(obj[key]);
        return ret;
      },
      Array.isArray(obj) ? [] : {}
    );
  } else {
    return obj;
  }
}

exports.cloneDeep = cloneDeep;
