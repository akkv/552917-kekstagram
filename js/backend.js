'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var SUCCESS_STATUS = 200;
  window.backend = function (method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    }
    );
    if (method === 'load') {
      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
    if (method === 'save') {
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    }
  };
})();
