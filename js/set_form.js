'use strict';

(function (global) {
  // активация и деактивация полей формы
  global.setFormState = function (state) {
    let noticeFormFields = document.querySelectorAll('.notice__form fieldset');

    noticeFormFields.forEach(function(item) {
      item.disabled = state;
    })
  };
})(window);
