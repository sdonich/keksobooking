'use strict';

(function (global) {

  let FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  let AVATAR_DEFAULT = 'img/muffin.png';
  let PRICE_OFFER = {
    'flat': {
      price: {
        min: '1000',
        placeholder: '5000'
      }  
    },
    'bungalo': {
      price: {
        min: '0',
        placeholder: '5000'
      }  
    },
    'house': {
      price: {
        min: '5000',
        placeholder: '5000'
      }  
    },
    'palace': {
      price: {
        min: '10000',
        placeholder: '10000'
      }  
    },
    defaultHolder: 5000
  };

  let formNotice = document.querySelector('.notice__form');
  let mainMap = document.querySelector('.map');
  let mainPin = mainMap.querySelector('.map__pin--main');
  let avatarPreview = document.querySelector('.notice__preview img');

  window.setFormState(true);

  ['drop', 'dragover'].forEach(function(item) {
    global.addEventListener(item, preventDefaults);
  })

  global.loadDataPinHandler = function (evt) {
    evt.preventDefault();
    window.createMapPins();
    mainPin.removeEventListener('click', window.loadDataPinHandler);
  };

  function resetSet() {
    formNotice.reset();
    document.querySelector('#price').placeholder = PRICE_OFFER.defaultHolder;
    window.setFormState(true);
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

  let resetButton = document.querySelector('.form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.notice.reset();
    resetSet();
  });

  document.querySelector('#timein').addEventListener('change', function (evt) {
    let changeTimeCheckin = document.querySelector('#timeout');
    changeTimeCheckin.value = evt.target.value;
  });

  document.querySelector('#timeout').addEventListener('change', function (evt) {
    let changeTimeCheckin = document.querySelector('#timein');
    changeTimeCheckin.value = evt.target.value;
  });

  document.querySelector('#type').addEventListener('change', function (evt) {
    let price = document.querySelector('#price');
    let value = evt.target.value;

    price.min = PRICE_OFFER[value].price.min;
    price.placeholder = PRICE_OFFER[value].price.placeholder;
  });

  document.querySelector('#room_number').addEventListener('change', function (evt) {
    let numGuests = document.querySelector('#capacity');
    let option = numGuests.querySelectorAll('option');

    if (evt.target.value === '1' ||
        evt.target.value === '2' ||
        evt.target.value === '3') {

      option[0].disabled = false;
      option[1].disabled = false;
      option[2].disabled = false;
      option[3].disabled = true;
      numGuests.value = evt.target.value;
    } 

    if (evt.target.value === '100') {
      option[0].disabled = true;
      option[1].disabled = true;
      option[2].disabled = true;
      option[3].disabled = false;
      numGuests.value = '0';
    }
  });

  let formFeatures = formNotice.querySelectorAll('input[type=checkbox]');

  formFeatures.forEach(function(item) {
    item.addEventListener('focus', function (evt) {
      evt.target.nextElementSibling.style.boxShadow = '0 0 4px 1px #ff6547';
    });

    item.addEventListener('blur', function (evt) {
      evt.target.nextElementSibling.style.boxShadow = '';
    });

    item.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        evt.preventDefault();
        evt.target.checked = !evt.target.checked;
      });
    });
  })
  // загрузка фотографий
  function preventDefaults(evt) {
    evt.preventDefault();
  }

  //загрузка фотографий квартиры
  let fileChooser = document.querySelector('#images');
  let photoPreview = fileChooser.nextElementSibling;

  fileChooser.addEventListener('change', function () {
    let file = fileChooser.files[0];
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreview.style.backgroundImage = `url('${reader.result}')`;
      });
      reader.readAsDataURL(file);
    }
  });

  //загрузка аватара
  let fileChooserAvatar = document.querySelector('#avatar');

  fileChooserAvatar.addEventListener('change', function (evt) {
    let file = fileChooserAvatar.files[0];
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  let dropzones = document.querySelectorAll('.drop-zone');

  dropzones.forEach(function(item) {
    item.addEventListener('drop', function(evt) {
      let grandpaClass = evt.target.parentElement.parentElement.className;

      if(grandpaClass === 'notice__photo') {
        fileChooserAvatar.files = evt.dataTransfer.files;
      }
      if(grandpaClass === 'form__photo-container') {
        fileChooser.files = evt.dataTransfer.files;
      }
    });
  });
})(window);
