'use strict';
(function () {
  window.utils = {
    getRandomInt: function (min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    },
    ESC_KEYCODE: 27,
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 1; i--) {
        var r = Math.round(Math.random() * i);
        var t = array[i];
        array[i] = array[r];
        array[r] = t;
      }
    }
  };
})();
