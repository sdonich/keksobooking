'use strict';

(function (global) {
  let DEBOUNCE_INTERVAL = 500;

  let lastTimeout;
  
  global.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})(window);

