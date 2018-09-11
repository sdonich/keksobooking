'use strict';

(function (global) {
  let MAIN_PIN_RADIUS = 31;
  let NEEDLE = 22;
  let HORIZON = 150;
  let BOTTOM_HORIZON = 700;

  let mainMap = document.querySelector('.map');
  let mainPin = mainMap.querySelector('.map__pin--main');
  let formNotice = document.querySelector('.notice__form');

  window.getCoords.start();

  //блок переменных для области, доступной для позиционирования mainPin
  let rightMapBorder = mainMap.clientWidth - MAIN_PIN_RADIUS;
  let leftMapBorder = MAIN_PIN_RADIUS;
  let bottomMapBorder = BOTTOM_HORIZON - MAIN_PIN_RADIUS - NEEDLE;
  let topMapBorder = HORIZON - MAIN_PIN_RADIUS;

  //обработчик на mainPin
  global.setupMainPinHandler = function (evt) {
    evt.preventDefault();

    mainMap.classList.remove('map--faded');
    formNotice.classList.remove('notice__form--disabled');
    window.setFormState(false);

    let startCoords = {
      x: evt.target.parentElement.clientX,
      y: evt.target.parentElement.clientY
    };

    function onMouseMove(moveEvt) {
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // проверка на выход mainPin за область
      if (mainPin.offsetTop - shift.y < bottomMapBorder && mainPin.offsetTop - shift.y > topMapBorder) {
        mainPin.style.top = `${mainPin.offsetTop - shift.y}px`;
      }
      if (mainPin.offsetLeft - shift.x > leftMapBorder && mainPin.offsetLeft - shift.x < rightMapBorder) {
        mainPin.style.left = `${mainPin.offsetLeft - shift.x}px`;
      }
      window.getCoords.form();
    };

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      window.getCoords.form();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  //вешаем обработчика на mainPin и на функцию, подружающую данные с сервера по перемещению mainPin
  mainPin.addEventListener('mousedown', window.setupMainPinHandler);
  mainPin.addEventListener('click', window.loadDataPinHandler);
})(window);

 
