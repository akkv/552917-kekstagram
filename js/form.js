'use strict';
(function () {
// Эффекты
  var DEFAULT_EFFECT_VALUE = 90;

  var uploadImage = document.querySelector('.img-upload__preview');
  var effects = document.querySelectorAll('.effects__radio');

  var changeEffect = function (element, effect) {
    element.addEventListener('click', function () {
      uploadImage.classList.remove(uploadImage.classList[1]);
      uploadImage.classList.add('effects__preview--' + effect);

      uploadImage.style.filter = '';
      window.pinHandler.style.left = DEFAULT_EFFECT_VALUE + 'px';
      window.effectValueDiv.style.width = DEFAULT_EFFECT_VALUE + 'px';

      window.upload.querySelector('.img-upload__scale').classList.add('hidden');
      if (effect !== 'none') {
        window.upload.querySelector('.img-upload__scale').classList.remove('hidden');
      }
    });
  };
  for (var i = 0; i < effects.length; i++) {
    var element = effects[i];
    changeEffect(element, effects[i].value);
  }

  window.effectValueInput = document.querySelector('.scale__value');
  window.effectValueDiv = document.querySelector('.scale__level');
  window.effectLine = document.querySelector('.scale__line');
  window.pinHandler = document.querySelector('.scale__pin');

  var generateEffectStyle = function (effectName, value) {
    var style;
    switch (effectName) {
      case 'effects__preview--chrome':
        style = 'grayscale(' + value + ')';
        break;
      case 'effects__preview--sepia':
        style = 'sepia(' + value + ')';
        break;
      case 'effects__preview--marvin':
        style = 'invert(' + (value * 100) + '%)';
        break;
      case 'effects__preview--phobos':
        style = 'blur(' + (value * 3) + 'px)';
        break;
      case 'effects__preview--heat':
        style = 'brightness(' + (1 + (value * 2)) + ')';
        break;
    }
    return style;
  };
  window.effectChangeOnMouseMove = function () {
    window.effectValueInput.value = (window.effectValueDiv.offsetWidth / window.effectLine.offsetWidth * 100).toFixed(0);
    uploadImage.style.filter = generateEffectStyle(uploadImage.classList[1], (window.effectValueInput.value / 100));
  };

  // масштаб
  var resizeMinus = window.upload.querySelector('.resize__control--minus');
  var resizePlus = window.upload.querySelector('.resize__control--plus');
  var resizeValue = window.upload.querySelector('.resize__control--value');

  var resizePercent = resizeValue.value;
  resizePercent = resizePercent.replace('%', '');

  resizeMinus.addEventListener('click', function () {
    if (resizePercent > 25) {
      resizePercent -= 25;
      resizeValue.value = resizePercent + '%';
      uploadImage.style.transform = 'scale(' + (resizePercent / 100) + ')';
    }
  });
  resizePlus.addEventListener('click', function () {
    if (resizePercent < 100) {
      resizePercent += 25;
      resizeValue.value = resizePercent + '%';
      uploadImage.style.transform = 'scale(' + (resizePercent / 100) + ')';
    }
  });

  var deleteErrorMessage = function () {
    if (document.querySelector('.error-message') !== null) {
      var error = document.querySelector('.error-message');
      error.parentNode.removeChild(error);
    }
  };
  window.resetDefault = function () {
    window.uploadInput.value = '';
    window.hashtagsInput.value = '';
    window.commentInput.value = '';
    uploadImage.style.filter = '';
    window.pinHandler.style.left = DEFAULT_EFFECT_VALUE + 'px';
    window.effectValueDiv.style.width = DEFAULT_EFFECT_VALUE + 'px';
    resizeValue.value = '100%';
    resizePercent = resizeValue.value;
    resizePercent = resizePercent.replace('%', '');
    uploadImage.style.transform = 'scale(' + (resizePercent / 100) + ')';
    deleteErrorMessage();
  };
})();

(function () {
  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');
  var onSave = function () {
    window.closeUploadPopup();
  };
  submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSave, window.onError);
  });
})();

