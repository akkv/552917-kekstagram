'use strict';
(function () {
  var errorMessage = document.querySelector('.img-upload__message--error');
  window.utils = {
    getRandomInt: function (min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    },
    ESC_KEYCODE: 27,
    LEFT_KEYCODE: 37,
    RIGHT_KEYCODE: 39,

    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 1; i--) {
        var r = Math.round(Math.random() * i);
        var t = array[i];
        array[i] = array[r];
        array[r] = t;
      }
    },
    onError: function () {
      if (!errorMessage) {
        var errorFragment = document.querySelector('#error').content.querySelector('.img-upload__message--error').cloneNode(true);
        errorMessage = document.body.appendChild(errorFragment);
      }
      errorMessage.classList.remove('hidden');
    },
    deleteErrorMessage: function () {
      if (errorMessage) {
        errorMessage.classList.add('hidden');
      }
    },
    createNewElements: function (data, template, cb) {
      var fragment = document.createDocumentFragment();
      data.forEach(function (item, index) {
        var element = template.cloneNode(true);
        element = cb(item, index, element);
        fragment.appendChild(element);
      });
      return fragment;
    }
  };
})();
