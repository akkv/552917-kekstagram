'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка загрузки данных. Ответ сервера:' + xhr.status + ' ' + xhr.statusText);
        }
      }
      );
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка отправки данных. Ответ сервера :' + xhr.status + ' ' + xhr.statusText);
        }
      }
      );
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    },

    createErrorMessage: function (message) {
      var element = document.createElement('div');
      element.classList.add('error-message');
      element.style.background = 'red';
      element.style.position = 'fixed';
      element.style.zIndex = 5;
      element.style.top = '10px';
      element.style.width = '100%';
      element.style.textAlign = 'center';
      element.textContent = message;
      return element;
    }
  };
})();


