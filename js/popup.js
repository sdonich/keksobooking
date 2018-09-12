'use strict';

(function (global) {
  let PHOTO_WIDTH = '40px';
  let PHOTO_HEIGHT = '40px';

  let mainMap = document.querySelector('.map');
  let popupTemplate = document.querySelector('template').content.querySelector('.map__card');
  let popup = popupTemplate.cloneNode(true);
  let fragmentPopup = document.createDocumentFragment();
  let crossCloseButton = popup.querySelector('.popup__close');

  function getPopup(advert) {
    let specification = popup.querySelectorAll('p');

    popup.querySelector('img').src = advert.author.avatar;
    popup.querySelector('h3').textContent = advert.offer.title;
    specification[0].querySelector('small').textContent = advert.offer.address;
    specification[1].textContent = `${advert.offer.price} \u20BD/ночь`;

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

    let amountRooms = 'комнаты';
    if (advert.offer.rooms === 0) {
      amountRooms = 'комнат';
    }
    if (advert.offer.rooms === 1) {
      amountRooms = 'комната';
    }
    let amountGuests = 'гостей';
    if (advert.offer.guests === 1) {
      amountGuests = 'гостя';
    }
    specification[2].textContent = `${advert.offer.rooms} ${amountRooms} для ${advert.offer.guests} ${amountGuests}`;
    specification[3].textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
    getFeatures(advert);
    specification[4].textContent = advert.offer.description;
    popup.appendChild(getPopupPhoto(advert));

    return popup;
  };

  function getFeatures(advert) {
    let popupFeatures = popup.querySelector('.popup__features');
    let featuresPattern = popupTemplate.querySelector('.popup__features').cloneNode(true);
    let feats = featuresPattern.querySelectorAll('li');
    
    while (popupFeatures.lastChild) {
      popupFeatures.removeChild(popupFeatures.lastChild);
    }
 
    advert.offer.features.forEach(function(item) {
      popupFeatures.appendChild(feats[advert.offer.features.indexOf(item)]);

      // switch (item) {
      //   case 'wifi':
      //     popupFeatures.appendChild(feats[0]);
      //     break;
      //   case 'dishwasher':
      //     popupFeatures.appendChild(feats[1]);
      //     break;
      //   case 'parking':
      //     popupFeatures.appendChild(feats[2]);
      //     break;
      //   case 'washer':
      //     popupFeatures.appendChild(feats[3]);
      //     break;
      //   case 'elevator':
      //     popupFeatures.appendChild(feats[4]);
      //     break;
      //   case 'conditioner':
      //     popupFeatures.appendChild(feats[5]);
      //     break;
      // }
    });
  };

  function getPopupPhoto(advert) {
    let popupPhoto = popup.querySelector('.popup__pictures');
    
    while (popupPhoto.lastChild) {
      popupPhoto.removeChild(popupPhoto.lastChild);
    }

    function addPopupPhoto(photo) {
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

  function closePopup() {
    popup.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closePopup);
  };
  function onPopupEnterPress(evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  function renderPopup(data) {
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
