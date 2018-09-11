'use strict';

(function (global) {

  let MAIN_PIN_RADIUS = 31;
  let NEEDLE = 22;
  let START_X = 600;
  let START_Y = 375;
  let MAIN_X = START_X + MAIN_PIN_RADIUS;
  let MAIN_Y = START_Y + MAIN_PIN_RADIUS;

  let mainPin = document.querySelector('.map__pin--main');
  let mainPinAddress = document.querySelector('#address');

  global.getCoords = {
    start() {
      mainPinAddress.value = `${MAIN_X}, ${MAIN_Y}`;
      mainPin.style.left = `${START_X}px`;
      mainPin.style.top = `${START_Y}px`;
    },
    form() {
      let mainPinCoordinateX = mainPin.offsetLeft + MAIN_PIN_RADIUS;
      let mainPinCoordinateY = mainPin.offsetTop + MAIN_PIN_RADIUS + NEEDLE;
      mainPinAddress.value = `${mainPinCoordinateX}, ${mainPinCoordinateY}`;
    }
  };

})(window);
