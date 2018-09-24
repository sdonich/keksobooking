'use strict';

(function(global) {
  let PIN_SHOW_TIME = 100;

  let mainMap = document.querySelector('.map');
  let template = document.querySelector('template').content;
  let pictureTemplate = template.querySelector('.picture__show');
  let pictureContainer = pictureTemplate.cloneNode(true);
  let picture = pictureContainer.querySelector('img');
  
  function closePicture() {
    pictureContainer.remove();
    document.querySelector('.shadow').remove();
    document.removeEventListener('keydown', onPictureEscPress);
  }

  function onPictureEscPress(evt) {
    window.util.isEscEvent(evt, closePicture);
  }

  function getSrc(arrPics) {
    let pictures = [];
    arrPics.forEach(function(item) {
      let src = item.src;
      pictures.push(src);
    });
    return pictures;
  }

  function createShadow() {
    let shadow = document.createElement('div');
    shadow.classList.add('shadow');
    document.body.prepend(shadow);
  }

  global.picturePopupHandler = function() {
    let popupShow = document.querySelector('.popup');
    let popupPictures = popupShow.querySelectorAll('.popup__pictures img');

    popupPictures.forEach(function(item) {
      item.addEventListener('click', function(evt) {
        let sourceImg = evt.target.src;
        let srcPictures = getSrc(popupPictures);

        createShadow();
        picture.src = sourceImg;
        pictureContainer.appendChild(picture);
        mainMap.appendChild(pictureContainer);
        
        document.addEventListener('keydown', onPictureEscPress);
        pictureContainer.addEventListener('click', function(evt) {
          if(evt.target.classList.contains('cross--vk')) {
            closePicture();
            return;
          }

          let currentIndex = srcPictures.indexOf(sourceImg);
          let picLength = srcPictures.length;
          let direction = evt.target.getAttribute('direction');
          let index = window.fliper[direction](currentIndex, picLength);
          
          picture.src = srcPictures[index];
          sourceImg = picture.src;
        });
      });
    });
    setTimeout(function() {
      popupShow.classList.add('popup__show');
    }, PIN_SHOW_TIME);
  }
})(window);