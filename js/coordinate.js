'use strict';

(function (global) {

  var MAIN_PIN_RADIUS = 31;
  var NEEDLE = 22;
  var START_X = 600;
  var START_Y = 375;
  var MAIN_X = START_X + MAIN_PIN_RADIUS;
  var MAIN_Y = START_Y + MAIN_PIN_RADIUS;

  var mainPin = document.querySelector('.map__pin--main');
  var formNotice = document.querySelector('.notice__form');
  var fieldsets = formNotice.querySelectorAll('fieldset');
  var mainPinAdress = fieldsets[2].querySelector('input');

  global.getCoords = {
    start: function () {
      mainPinAdress.value = MAIN_X + ', ' + MAIN_Y;
      mainPin.style.left = START_X + 'px';
      mainPin.style.top = START_Y + 'px';
    },
    form: function () {
      var mainCoordinateX = mainPin.offsetLeft + MAIN_PIN_RADIUS;
      var mainCoordinateY = mainPin.offsetTop + MAIN_PIN_RADIUS + NEEDLE;
      mainPinAdress.value = mainCoordinateX + ', ' + mainCoordinateY;
    }
  };

})(window);
