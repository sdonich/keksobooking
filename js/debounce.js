'use strict';

(function (global) {
  let DEBOUNCE_INTERVAL = 500;

  let lastTimeout;
  
  global.debounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(func, DEBOUNCE_INTERVAL);
  };
})(window);

