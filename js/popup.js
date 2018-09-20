'use strict';

(function (global) {
  let PHOTO_WIDTH = '40px';
  let PHOTO_HEIGHT = '40px';
  let OFFER_TYPE = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Лачуга',
    'palace': 'Дворец'
  };
  let PIN_SHOW_TIME = 100;

  let mainMap = document.querySelector('.map');
  let template = document.querySelector('template').content;
  let popupTemplate = template.querySelector('.map__card');
  let popup = popupTemplate.cloneNode(true);
  let fragmentPopup = document.createDocumentFragment();

  let crossCloseButton = popup.querySelector('.popup__close');

  // получение данных по условиям, предоставляемым арендодателями
  function getPopup(advert) {
    let specification = popup.querySelectorAll('p');

    popup.querySelector('img').src = advert.author.avatar;
    popup.querySelector('h3').textContent = advert.offer.title;
    specification[0].querySelector('small').textContent = advert.offer.address;
    specification[1].textContent = `${advert.offer.price} \u20BD/ночь`;
    popup.querySelector('h4').textContent = OFFER_TYPE[advert.offer.type];
   
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
    specification[4].textContent = advert.offer.description;

    setFeatures(advert);
    setPopupPhoto(advert);

    return popup;
  };

  //функция для получение данных по удобствам квартиры арендодателя
  function setFeatures(advert) {
    let popupFeatures = popup.querySelector('.popup__features');
    let featuresPattern = popupTemplate.querySelector('.popup__features').cloneNode(true);
    let feats = featuresPattern.querySelectorAll('li');
    
    while (popupFeatures.lastChild) {
      popupFeatures.removeChild(popupFeatures.lastChild);
    }
 
    advert.offer.features.forEach(function(item) {
      popupFeatures.appendChild(feats[advert.offer.features.indexOf(item)]);
    });
  };

  //функция для получение фотографий квартиры арендодателя-конкурента
  function setPopupPhoto(advert) {
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

    advert.offer.photos.forEach(function(item) {
      popupPhoto.appendChild(addPopupPhoto(item));
    });
  };

  //функции для закрытия popup'a и picture'a
  function closePopup() {
    popup.classList.remove('popup__show');
    popup.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  function onPopupEscPress(evt) {
    if(document.querySelector('.picture__show')) {
      document.querySelector('.picture__show').remove();

      return;
    } 

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
      window.picturePopupHandler();
    });

    pin.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        renderPopup(data);

        setTimeout(function() {
          let popupShow = document.querySelector('.popup');
          popupShow.classList.add('popup__show');
        }, PIN_SHOW_TIME);

      });
    });
  };
})(window);
