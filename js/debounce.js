'use strict';

(function (global) {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  global.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})(window);

