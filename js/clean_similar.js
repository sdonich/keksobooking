'use strict';

(function (global) {

  var mapPins = document.querySelector('.map__pins');

  global.remove = {
    mapPins: function () {
      while (mapPins.children[2]) {
        mapPins.removeChild(mapPins.children[2]);
      }
    },
    popup: function () {
      if (document.querySelector('.popup')) {
        document.querySelector('.popup').remove();
      }
    }
  };
})(window);
