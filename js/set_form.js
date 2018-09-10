'use strict';

(function (global) {
  var formNotice = document.querySelector('.notice__form');
  var fieldsets = formNotice.querySelectorAll('fieldset');

  global.setFormState = function (state) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = state;
    }
  };
})(window);
