'use strict';
(function () {
  window.utils = {
    getRandomInt: function (min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    },
    ESC_KEYCODE: 27,
  };
})();
