'use strict';

(function(global) {
  let PIN_SHOW_TIME = 100;

  let mainMap = document.querySelector('.map');
  let template = document.querySelector('template').content;
  let pictureTemplate = template.querySelector('.picture__show');
  let pictureContainer = pictureTemplate.cloneNode(true);
  let picture = pictureContainer.querySelector('img');
  let leftFlipButton = pictureContainer.querySelector('.arrow__left');
  let closeButtonPic = pictureContainer.querySelector('.popup__close');

  function closePicture() {
    pictureContainer.remove();

    document.querySelector('.shadow').remove();
    document.removeEventListener('keydown', onPictureEscPress);
  }

  function onPictureEscPress(evt) {
    window.util.isEscEvent(evt, closePicture);
  };

  // function pictureLeftFlip(evt) {

  //   // console.log(picture);

  // }

  function createShadow() {
    let shadow = document.createElement('div');

    shadow.classList.add('shadow');
    document.body.prepend(shadow);
  }

  global.picturePopupHandler = function(advert) {
    let popupShow = document.querySelector('.popup');
    let popupPictures = popupShow.querySelectorAll('.popup__pictures img');

    popupPictures.forEach(function(item) {
      item.addEventListener('click', function(evt) {
        let sourceImg = evt.target.src;

        createShadow();
        picture.src = sourceImg;
        pictureContainer.appendChild(picture);
        mainMap.appendChild(pictureContainer);
        pictureContainer.style.transform = `translateX(-${picture.offsetWidth / 2}px)`;

        closeButtonPic.addEventListener('click', closePicture);
        document.addEventListener('keydown', onPictureEscPress);

        leftFlipButton.addEventListener('click', function() {
          popupPictures.indexOf = [].indexOf;
          console.log(popupPictures);
          console.log(sourceImg);

          let index = popupPictures.indexOf(sourceImg);
          console.log(index);
        });
      });
    });
    setTimeout(function() {
      popupShow.classList.add('popup__show');
    }, PIN_SHOW_TIME);
  }
})(window);