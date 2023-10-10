export const diffObject = (o1, o2) =>
  Object.keys(o1).reduce((diff, key) => {
    if (JSON.stringify(o1[key]) === JSON.stringify(o2[key])) return diff;
    return {
      ...diff,
      [key]: o1[key],
    };
  }, {});
