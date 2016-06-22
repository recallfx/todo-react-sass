/*eslint no-new-func:0*/
export default class Context {
  hasLocalStorage = false;
  isBrowser = false;
  data = [];

  constructor() {
    // check if browser
    // http://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser
    const testIfBrowser = new Function('try {return this===window;}catch(e){ return false;}');

    if (testIfBrowser()) {
      this.isBrowser = true;

      // check if browser has local storage
      if (typeof (Storage) !== 'undefined') {
        this.hasLocalStorage = true;
      }
    }
  }
}
