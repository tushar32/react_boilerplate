export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  return window.localStorage.getItem(key);
};

export const getLocalStorageAsJSON = (key) => {
  let value = {};
  try {
    value = JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    console.log(`Error parsing localstorage item with key ${key}`);
  }
  return value;
};

export const deleteLocalStorage = (key) => {
  window.localStorage.removeItem(key);
};

export const setSessionStorage = (key, value) => {
  window.sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key) => {
  return window.sessionStorage.getItem(key);
};

export const getSessionStorageAsJSON = (key) => {
  let value = {};
  try {
    value = JSON.parse(window.sessionStorage.getItem(key));
  } catch (error) {
    console.log(`Error parsing localstorage item with key ${key}`);
  }
  return value;
};

export const deleteSessionStorage = (key) => {
  window.sessionStorage.removeItem(key);
};
