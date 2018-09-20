'use strict';



(function(global) {
  let PIN_SHOW_TIME = 100;

  let mainMap = document.querySelector('.map');

  let template = document.querySelector('template').content;
  let pictureTemplate = template.querySelector('.picture__show');
  let pictureContainer = pictureTemplate.cloneNode(true);
  let picture = pictureContainer.querySelector('img');
  let closeButtonPic = pictureContainer.querySelector('.popup__close');


  function closePicture() {
    pictureContainer.remove();

    document.removeEventListener('click', stopClick, true);
    // document.removeEventListener('change', stopClick, false);

  }

  function stopClick(evt) {
    console.log('hello');
    if(evt.target !== closeButtonPic) {
      evt.stopImmediatePropagation();
      console.log('ffff');
      evt.preventDefault();
      
    }
  }

  global.picturePopupHandler = function() {
    let popupShow = document.querySelector('.popup');
    let popupPictures = popupShow.querySelectorAll('img');
    popupPictures.forEach(function(item) {
      item.addEventListener('click', function(evt) {
        let sourceImg = evt.target.src;
        

        picture.src = sourceImg;
        pictureContainer.appendChild(picture);
        mainMap.appendChild(pictureContainer);

        pictureContainer.style.transform = `translateX(-${picture.offsetWidth / 2}px)`;
        closeButtonPic.addEventListener('click', closePicture);

        document.addEventListener('click', stopClick, true);
        // debugger;
        // document.addEventListener('change', stopClick, false);


        // document.addEventListener('click', function(evt) {
        //   closePicture();
        // evt.stopPropagation();
        // })
        
      });
    });
    setTimeout(function() {
      popupShow.classList.add('popup__show');
    }, PIN_SHOW_TIME);
  }

})(window);