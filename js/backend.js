'use strict';

(function (global) {
  var URL = 'https://js.dump.academy/keksobooking';
  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var OK_STATUS = 200;

  global.backend = {
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status !== OK_STATUS) {
          var error = {
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
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error = {
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
