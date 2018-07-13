'use strict';
(function () {
  window.formProps.pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var mouseMove = function (moveEvt) {

      moveEvt.preventDefault();
      var newLeft;
      var minX = window.formProps.effectLine.getBoundingClientRect().left;
      var maxX = window.formProps.effectLine.getBoundingClientRect().right;

      if (moveEvt.clientX >= minX && moveEvt.clientX <= maxX) {
        newLeft = moveEvt.clientX - window.formProps.effectLine.getBoundingClientRect().left;
        if (newLeft < 0) {
          newLeft = 0;
        }
        if (newLeft > window.formProps.effectLine.offsetWidth) {
          newLeft = window.formProps.effectLine.offsetWidth;
        }

        window.formProps.pinHandler.style.left = newLeft + 'px';
        window.formProps.effectValueDiv.style.width = newLeft + 'px';
      }
      window.formProps.effectChangeOnMouseMove();
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
