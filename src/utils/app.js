
export const getValue = (obj, expression) => {
  try {
    return expression.split(".").reduce((o, x, i) => {
      if (i === 0) {
        return o;
      }
      return typeof o === "undefined" || o === null ? undefined : o[x];
    }, obj);
  } catch (e) {
    console.error("getValue => " + e);
    return undefined;
  }
};

export const MONTH_ARRAY = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDomain = () => {
  return process.env.REACT_APP_SUB_DOMAIN;
};
