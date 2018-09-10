'use strict';

(function (global) {
  let MAX_MAP_PINS = 100;
  let mapPins = document.querySelector('.map__pins');
  let loadAdverts = [];
  let fragmentMapPin = document.createDocumentFragment();
  let similaradvertsTemplate = document.querySelector('template').content.querySelector('.map__pin');

  let formContainer = document.querySelector('.map__filters');
  formContainer.addEventListener('change', function () {
    window.remove.mapPins();
    window.remove.popup();
    window.debounce(global.createMapPins);
  });

  let renderMapPin = function (pin) {
    let mapPin = similaradvertsTemplate.cloneNode(true);

    mapPin.style.left = pin.location.x + 'px';
    mapPin.style.top = pin.location.y + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    return mapPin;
  };

  let chooseMapPin = function () {
    let adverts = window.useFilter(loadAdverts);

    for (let i = 0; i < MAX_MAP_PINS && i < adverts.length; i++) {
      let pin = renderMapPin(adverts[i]);
      window.setupPinHandler(pin, adverts[i]);
      fragmentMapPin.appendChild(pin);
    }
    return fragmentMapPin;
  };

  global.createMapPins = function () {
    window.backend.load(function (response) {
      loadAdverts = response.slice();
      mapPins.appendChild(chooseMapPin());
    },
    window.notice.error);
  };

  let features = formContainer.querySelectorAll('input[type=checkbox]');
  for (let i = 0; i < features.length; i++) {
    features[i].addEventListener('focus', function (evt) {
      evt.target.nextElementSibling.style.boxShadow = '0 0 4px 1px #ff6547';
    });
    features[i].addEventListener('blur', function (evt) {
      evt.target.nextElementSibling.style.boxShadow = '';
    });

    features[i].addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        if (evt.target.checked === false) {
          evt.target.checked = true;
          window.remove.mapPins();
          window.remove.popup();
          window.debounce(global.createMapPins);

        } else {
          evt.target.checked = false;
          window.remove.mapPins();
          window.remove.popup();
          window.debounce(global.createMapPins);
        }
      });
    });
  }
})(window);
