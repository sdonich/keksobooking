'use strict';

(function (global) {

  let MAIN_PIN_RADIUS = 31;
  let NEEDLE = 22;
  let START_X = 600;
  let START_Y = 375;
  let MAIN_X = START_X + MAIN_PIN_RADIUS;
  let MAIN_Y = START_Y + MAIN_PIN_RADIUS;

  let mainPin = document.querySelector('.map__pin--main');
  let formNotice = document.querySelector('.notice__form');
  let fieldsets = formNotice.querySelectorAll('fieldset');
  let mainPinAdress = fieldsets[2].querySelector('input');

  global.getCoords = {
    start: function () {
      mainPinAdress.value = MAIN_X + ', ' + MAIN_Y;
      mainPin.style.left = START_X + 'px';
      mainPin.style.top = START_Y + 'px';
    },
    form: function () {
      let mainCoordinateX = mainPin.offsetLeft + MAIN_PIN_RADIUS;
      let mainCoordinateY = mainPin.offsetTop + MAIN_PIN_RADIUS + NEEDLE;
      mainPinAdress.value = mainCoordinateX + ', ' + mainCoordinateY;
    }
  };

})(window);
