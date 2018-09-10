'use strict';

(function (global) {
  let PHOTO_WIDTH = '40px';
  let PHOTO_HEIGHT = '40px';

  let mainMap = document.querySelector('.map');
  let popupTemplate = document.querySelector('template').content.querySelector('.map__card');
  let popup = popupTemplate.cloneNode(true);
  let fragmentPopup = document.createDocumentFragment();
  let crossCloseButton = popup.querySelector('.popup__close');

  let getPopup = function (advert) {
    while (popup.querySelector('.popup__pictures').lastChild) {
      popup.querySelector('.popup__pictures').removeChild(popup.querySelector('.popup__pictures').lastChild);
    }
    while (popup.querySelector('.popup__features').lastChild) {
      popup.querySelector('.popup__features').removeChild(popup.querySelector('.popup__features').lastChild);
    }

    let specification = popup.querySelectorAll('p');
    popup.querySelector('img').src = advert.author.avatar;
    popup.querySelector('h3').textContent = advert.offer.title;
    specification[0].querySelector('small').textContent = advert.offer.address;
    specification[1].textContent = advert.offer.price + '\u20BD/ночь';

    switch (advert.offer.type) {
      case 'flat':
        popup.querySelector('h4').textContent = 'Квартира';
        break;
      case 'house':
        popup.querySelector('h4').textContent = 'Дом';
        break;
      case 'bungalo':
        popup.querySelector('h4').textContent = 'Лачуга';
        break;
      case 'palace':
        popup.querySelector('h4').textContent = 'Дворец';
        break;
    }

    let amountRooms = ' комнаты';
    if (advert.offer.rooms === 1) {
      amountRooms = ' комната';
    }
    let amountGuests = ' гостей';
    if (advert.offer.guests === 1) {
      amountGuests = ' гостя';
    }
    specification[2].textContent = advert.offer.rooms + amountRooms + ' для ' + advert.offer.guests + amountGuests;
    specification[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    getFeatures(advert);
    specification[4].textContent = advert.offer.description;
    popup.appendChild(getPopupPhoto(advert));

    return popup;
  };

  let getFeatures = function (advert) {
    let featuresCard = popupTemplate.querySelector('.popup__features').cloneNode(true);
    let features = featuresCard.querySelectorAll('li');
    for (let i = 0; i < advert.offer.features.length; i++) {
      switch (advert.offer.features[i]) {
        case 'wifi':
          popup.querySelector('.popup__features').appendChild(features[0]);
          break;
        case 'dishwasher':
          popup.querySelector('.popup__features').appendChild(features[1]);
          break;
        case 'parking':
          popup.querySelector('.popup__features').appendChild(features[2]);
          break;
        case 'washer':
          popup.querySelector('.popup__features').appendChild(features[3]);
          break;
        case 'elevator':
          popup.querySelector('.popup__features').appendChild(features[4]);
          break;
        case 'conditioner':
          popup.querySelector('.popup__features').appendChild(features[5]);
          break;
      }
    }
  };

  let getPopupPhoto = function (advert) {
    let popupPhoto = popup.querySelector('.popup__pictures');

    let addPopupPhoto = function (photo) {
      let flatPhoto = popupTemplate.querySelector('.popup__pictures').querySelector('li').cloneNode(true);
      flatPhoto.querySelector('img').style.width = PHOTO_WIDTH;
      flatPhoto.querySelector('img').style.height = PHOTO_HEIGHT;
      flatPhoto.querySelector('img').src = photo;
      return flatPhoto;
    };
    for (let i = 0; i < advert.offer.photos.length; i++) {
      popupPhoto.appendChild(addPopupPhoto(advert.offer.photos[i]));
    }
    return popupPhoto;
  };

  let closePopup = function () {
    document.querySelector('.popup').remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  let onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };
  let onPopupEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  let renderPopup = function (data) {
    fragmentPopup.appendChild(getPopup(data));
    mainMap.appendChild(fragmentPopup);

    crossCloseButton.addEventListener('click', closePopup);
    crossCloseButton.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscPress);
  };

  global.setupPinHandler = function (pin, data) {
    pin.addEventListener('click', function () {
      renderPopup(data);
    });

    pin.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        renderPopup(data);
      });
    });
  };
})(window);
