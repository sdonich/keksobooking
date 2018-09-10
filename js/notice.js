'use strict';

(function (global) {
  let ERROR_CODE = 400;
  let TIME = 2000;

  let getError = function (error) {
    let note = document.createElement('div');

    document.body.appendChild(note);
    note.classList.add('descript-notice');

    if (error.code === 0 || !error.code) {
      note.textContent = 'Произошла ошибка соединения с сервером. Проверьте интернет-соединение';
    } else if (error.code === ERROR_CODE) {
      note.textContent = 'Ошибка ' + error.code + '. ' + 'Ваши данные не соответсвуют требованиям';
    } else {
      note.textContent = 'Oops! Произошла ошибка: ' + error.code;
    }

    setTimeout(function () {
      note.remove();
    }, TIME);
  };

  let getSucces = function () {
    let note = document.createElement('div');

    document.body.appendChild(note);
    note.classList.add('descript-notice');
    note.textContent = 'Ваши данные успешно отправлены';

    setTimeout(function () {
      note.remove();
    }, TIME);
  };

  let reset = function () {
    let note = document.createElement('div');

    document.body.appendChild(note);
    note.classList.add('descript-notice');
    note.textContent = 'Введенные данные сброшены';

    setTimeout(function () {
      note.remove();
    }, TIME);
  };

  global.notice = {
    error: getError,
    succes: getSucces,
    reset: reset
  };

})(window);
