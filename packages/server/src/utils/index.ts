export const filterEmptyObjectField = (obj: Object): Object => {
  return Object.keys(obj).reduce((filteredObject: Object, key: string) => {
    if (obj[key]) {
      return { ...filteredObject, [key]: obj[key] };
    }
    return { ...filteredObject };
  }, {});
};
