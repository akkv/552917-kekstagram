'use strict';
(function () {
  window.pinHandler = document.querySelector('.scale__pin');
  window.pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var mouseMove = function (moveEvt) {

      moveEvt.preventDefault();
      var newLeft;
      var minX = window.effectLine.getBoundingClientRect().left;
      var maxX = window.effectLine.getBoundingClientRect().right;

      if (moveEvt.clientX >= minX && moveEvt.clientX <= maxX) {
        newLeft = moveEvt.clientX - window.effectLine.getBoundingClientRect().left;
        if (newLeft < 0) {
          newLeft = 0;
        }
        if (newLeft > window.effectLine.offsetWidth) {
          newLeft = window.effectLine.offsetWidth;
        }

        window.pinHandler.style.left = newLeft + 'px';
        window.effectValueDiv.style.width = newLeft + 'px';
      }
      window.effectChangeOnMouseMove();
    };

    var mouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });
})();
