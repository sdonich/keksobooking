'user strict';

(function(global) {
  function left(currentIndex, length) {
    let index = currentIndex - 1;
    if(currentIndex === 0) {
      index = length - 1;
    }
    return index;
  }

  function right(currentIndex, length) {
    let index = currentIndex + 1;
    if(currentIndex === length - 1) {
      index = 0;
    }
    return index;
  }

  global.fliper = {
    left,
    right
  }
})(window);