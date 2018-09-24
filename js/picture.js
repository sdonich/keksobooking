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


  function getSrc(arrPics) {
    // let sourceImg = evt.target.src;
    // console.log(sourceImg);
    // console.log(evt.target.parentElement.parentElement);
    let pictures = [];
    
    arrPics.forEach(function(item) {
      // console.log(item);
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
        pictureContainer.style.transform = `translateX(-${picture.offsetWidth / 2}px)`;

        closeButtonPic.addEventListener('click', closePicture);
        document.addEventListener('keydown', onPictureEscPress);

        // leftFlipButton.addEventListener('click', function() {
        //   let currentIndex = srcPictures.indexOf(sourceImg);
        //   let index;

        //   console.log(currentIndex);
          
        //   if(currentIndex === 0) {
        //     index = srcPictures.length - 1;
        //   }else{
        //     index = currentIndex - 1;
        //   }
        //   picture.src = srcPictures[index];
        //   sourceImg = picture.src;
        //   // console.log(picture);


          




          
        // });

        pictureContainer.addEventListener('click', function(evt) {
          let currentIndex = srcPictures.indexOf(sourceImg);
          let index;
          console.log(evt.target.tagName !== 'BUTTON');

          if(evt.target.tagName !== 'BUTTON') {
            return;
          }

          // console.log(evt.target.className === 'arrow__left arrow');

          if (evt.target.className === 'arrow__left arrow') {
            if(currentIndex === 0) {
              index = srcPictures.length - 1;
            }else{
              index = currentIndex - 1;
            }
           
          }
          if (evt.target.className === 'arrow__right arrow') {
            if(currentIndex === srcPictures.length - 1) {
              index = 0;
            }else{
              index = currentIndex + 1;
            }
          }

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