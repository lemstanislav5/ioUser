export const storage = {
  set: (id, item) => {window.localStorage.setItem(id, JSON.stringify(item))},
  get: (id) => {
    let res = window.localStorage.getItem(id);
    if(res === undefined || res === null || res === 'undefined'){
      return undefined
    } else {
      return JSON.parse(window.localStorage.getItem(id));
    }
  },
  clear: () => window.localStorage.clear(),
};