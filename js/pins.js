'use strict';

(function (global) {
  let MAX_MAP_PINS = 100;
  let mapPins = document.querySelector('.map__pins');
  let loadAdverts = [];
  let fragmentMapPin = document.createDocumentFragment();
  let similaradvertsTemplate = document.querySelector('template').content.querySelector('.map__pin');

  //отчистка карты от mapPins и popup при активации фильтров
  let formContainer = document.querySelector('.map__filters');
  formContainer.addEventListener('change', function () {
    window.remove.mapPins();
    window.remove.popup();
    window.debounce(global.createMapPins);
  });

  //получение координатов mapPin и аватарки пользователя
  function renderMapPin(pin) {
    let mapPin = similaradvertsTemplate.cloneNode(true);

    mapPin.style.left = `${pin.location.x}px`;
    mapPin.style.top = `${pin.location.y}px`;
    mapPin.querySelector('img').src = pin.author.avatar;
    return mapPin;
  };

  //получение mapPin'ов на основании действия фильтров и развешивание на них обработчиков событий
  function getMapPin() {
    let adverts = window.useFilter(loadAdverts);

    for (let i = 0; i < MAX_MAP_PINS && i < adverts.length; i++) {
      let pin = renderMapPin(adverts[i]);
      window.setupPinHandler(pin, adverts[i]);
      fragmentMapPin.appendChild(pin);
    }
    return fragmentMapPin;
  };

  //загрузка данных с сервера и экспорт этой функции создания mapPins в глобальную область видимости
  global.createMapPins = function () {
    window.backend.load(function (response) {
      loadAdverts = response.slice();
      mapPins.appendChild(getMapPin());
    },
    window.notice.error);
  };

  //вешаем обработчики событий на кнопки-чекбоксы фильтров, чтобы они подсвечивались
  let features = formContainer.querySelectorAll('input[type=checkbox]');
  features.forEach(function(item) {
    item.addEventListener('focus', function (evt) {
      evt.target.nextElementSibling.style.boxShadow = '0 0 4px 1px #ff6547';
    });

    item.addEventListener('blur', function (evt) {
      evt.target.nextElementSibling.style.boxShadow = '';
    });

    item.addEventListener('keydown', function (evt) {
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
  });
})(window);
