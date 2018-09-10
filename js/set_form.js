'use strict';

(function (global) {
  let formNotice = document.querySelector('.notice__form');
  let fieldsets = formNotice.querySelectorAll('fieldset');

  global.setFormState = function (state) {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = state;
    }
  };
})(window);
