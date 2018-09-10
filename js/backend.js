'use strict';

(function (global) {
  let URL = 'https://js.dump.academy/keksobooking';
  let URL_DATA = 'https://js.dump.academy/keksobooking/data';
  let OK_STATUS = 200;

  global.backend = {
    save: function (data, onLoad, onError) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status !== OK_STATUS) {
          let error = {
            code: xhr.status
          };
          onError(error);
        } else {
          onLoad();
        }
      });

      xhr.addEventListener('error', function () {
        onError(xhr.status);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        let error = {
          code: xhr.status
        };

        if (xhr.status !== OK_STATUS) {
          onError(error);
        } else {
          onLoad(xhr.response);
        }
      });

      xhr.addEventListener('error', function () {
        onError(xhr.status);
      });

      xhr.open('GET', URL_DATA);
      xhr.send();
    }
  };


})(window);
