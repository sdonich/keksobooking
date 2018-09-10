'use strict';

(function (global) {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_DEFAULT = 'img/muffin.png';

  var formNotice = document.querySelector('.notice__form');
  var mainMap = document.querySelector('.map');
  var mainPin = mainMap.querySelector('.map__pin--main');
  var fileChooser = document.querySelector('#images');
  var photoPreview = fileChooser.nextElementSibling;
  var fileChooserAvatar = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview img');

  window.setFormState(true);

  global.loadDataPinHandler = function (evt) {
    evt.preventDefault();
    window.createMapPins();
    mainPin.removeEventListener('click', window.loadDataPinHandler);
  };

  var resetSet = function () {
    formNotice.reset();
    document.querySelector('.map__filters').reset();
    window.remove.mapPins();
    window.remove.popup();
    window.getCoords.start();
    mainMap.classList.add('map--faded');
    formNotice.classList.add('notice__form--disabled');
    photoPreview.style.backgroundImage = '';
    avatarPreview.src = AVATAR_DEFAULT;
    mainPin.addEventListener('mousedown', window.setupMainPinHandler);
    mainPin.addEventListener('click', window.loadDataPinHandler);
  };

  formNotice.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(formNotice), function () {
      window.notice.succes();
      resetSet();
    },
    window.notice.error);
  });

  var resetButton = document.querySelector('.form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.notice.reset();
    resetSet();
  });

  document.querySelector('#timein').addEventListener('change', function (evt) {
    var changeTimeCheckin = document.querySelector('#timeout');
    changeTimeCheckin.value = evt.target.value;
  });

  document.querySelector('#timeout').addEventListener('change', function (evt) {
    var changeTimeCheckin = document.querySelector('#timein');
    changeTimeCheckin.value = evt.target.value;
  });

  document.querySelector('#type').addEventListener('change', function (evt) {
    var minPrice = document.querySelector('#price');

    if (evt.target.value === 'flat') {
      minPrice.min = '1000';
      minPrice.placeholder = '5000';
    }
    if (evt.target.value === 'bungalo') {
      minPrice.min = '0';
      minPrice.placeholder = '5000';
    }
    if (evt.target.value === 'house') {
      minPrice.min = '5000';
      minPrice.placeholder = '5000';
    }
    if (evt.target.value === 'palace') {
      minPrice.min = '10000';
      minPrice.placeholder = '10000';
    }
  });

  document.querySelector('#room_number').addEventListener('change', function (evt) {
    var numGuests = document.querySelector('#capacity');
    var option = numGuests.querySelectorAll('option');

    if (evt.target.value === '1') {
      option[0].disabled = true;
      option[1].disabled = true;
      option[2].disabled = false;
      option[3].disabled = true;
      numGuests.value = '1';
    }
    if (evt.target.value === '2') {
      option[0].disabled = false;
      option[1].disabled = false;
      option[2].disabled = false;
      option[3].disabled = true;
      numGuests.value = '2';
    }
    if (evt.target.value === '3') {
      option[0].disabled = false;
      option[1].disabled = false;
      option[2].disabled = false;
      option[3].disabled = true;
      numGuests.value = '3';
    }
    if (evt.target.value === '100') {
      option[0].disabled = true;
      option[1].disabled = true;
      option[2].disabled = true;
      option[3].disabled = false;
      numGuests.value = '0';
    }
  });

  var formFeatures = formNotice.querySelectorAll('input[type=checkbox]');
  for (var i = 0; i < formFeatures.length; i++) {

    formFeatures[i].addEventListener('focus', function (evt) {
      evt.target.nextElementSibling.style.boxShadow = '0 0 4px 1px #ff6547';
    });

    formFeatures[i].addEventListener('blur', function (evt) {
      evt.target.nextElementSibling.style.boxShadow = '';
    });

    formFeatures[i].addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        evt.preventDefault();

        if (evt.target.checked === false) {
          evt.target.checked = true;
        } else {
          evt.target.checked = false;
        }
      });
    });
  }

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreview.style.backgroundImage = 'url(' + reader.result + ')';
      });
      reader.readAsDataURL(file);
    }
  });

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})(window);
