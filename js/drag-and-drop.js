'use strict';
(function () {
  window.form.pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();
      var newLeft;
      var minX = window.form.effectLine.getBoundingClientRect().left;
      var maxX = window.form.effectLine.getBoundingClientRect().right;

      if (moveEvt.clientX >= minX && moveEvt.clientX <= maxX) {
        newLeft = moveEvt.clientX - window.form.effectLine.getBoundingClientRect().left;
        if (newLeft < 0) {
          newLeft = 0;
        }
        if (newLeft > window.form.effectLine.offsetWidth) {
          newLeft = window.form.effectLine.offsetWidth;
        }

        window.form.pinHandler.style.left = newLeft + 'px';
        window.form.effectValueDiv.style.width = newLeft + 'px';
      }
      window.form.effectChangeOnMouseMove();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
