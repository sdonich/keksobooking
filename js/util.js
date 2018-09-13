'use strict';

(function (global) {
  let ESC_KEYCODE = 27;
  let ENTER_KEYCODE = 13;

  global.util = {
    isEscEvent(evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent(evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})(window);
