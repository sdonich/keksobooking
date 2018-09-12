'use strict';

(function (global) {
  let mapPins = document.querySelector('.map__pins');
  let selectorMapPin = '.map__pin:not(.map__pin--main)';
  
  global.remove = {
    mapPins() {
      while (mapPins.querySelector(selectorMapPin)) {
        mapPins.removeChild(mapPins.querySelector(selectorMapPin));
      }
    },
    popup() {
      if (document.querySelector('.popup')) {
        document.querySelector('.popup').remove();
      }
    }
  };
})(window);
