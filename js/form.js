'use strict';
(function () {
// Эффекты
  var effects = document.querySelectorAll('.effects__radio');
  var uploadImage = document.querySelector('.img-upload__preview');
  var changeEffect = function (element, effect) {
    element.addEventListener('click', function () {
      uploadImage.classList.remove(uploadImage.classList[1]);
      uploadImage.classList.add('effects__preview--' + effect);

      uploadImage.style.filter = '';
      window.formProps.pinHandler.style.left = window.formProps.DEFAULT_EFFECT_VALUE + 'px';
      window.formProps.effectValueDiv.style.width = window.formProps.DEFAULT_EFFECT_VALUE + 'px';

      document.querySelector('.img-upload__scale').classList.add('hidden');
      if (effect !== 'none') {
        document.querySelector('.img-upload__scale').classList.remove('hidden');
      }
    });
  };
  for (var i = 0; i < effects.length; i++) {
    var element = effects[i];
    changeEffect(element, effects[i].value);
  }
  window.formProps = {
    effectValueInput: document.querySelector('.scale__value'),
    effectValueDiv: document.querySelector('.scale__level'),
    effectLine: document.querySelector('.scale__line'),
    pinHandler: document.querySelector('.scale__pin'),
    DEFAULT_EFFECT_VALUE: 90,
    effectChangeOnMouseMove: function () {
      this.effectValueInput.value = (this.effectValueDiv.offsetWidth / this.effectLine.offsetWidth * 100).toFixed(0);
      uploadImage.style.filter = generateEffectStyle(uploadImage.classList[1], (this.effectValueInput.value / 100));
    },
    resetDefault: function () {
      window.uploadProps.uploadInput.value = '';
      hashtagsInput.value = '';
      window.uploadProps.commentInput.value = '';
      uploadImage.style.filter = '';
      this.pinHandler.style.left = this.DEFAULT_EFFECT_VALUE + 'px';
      this.effectValueDiv.style.width = this.DEFAULT_EFFECT_VALUE + 'px';
      resizeValue.value = '100%';
      var resizePercent = resizeValue.value;
      resizePercent = resizePercent.replace('%', '');
      uploadImage.style.transform = 'scale(' + (resizePercent / 100) + ')';
      window.utils.deleteErrorMessage();
    },
  };

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

  // масштаб
  var resizeMinus = document.querySelector('.resize__control--minus');
  var resizePlus = document.querySelector('.resize__control--plus');
  var resizeValue = document.querySelector('.resize__control--value');
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
  // Валидация
  var descriptionInput = document.querySelector('.text__description');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var MAX_LENGTH = 20;

  var onDescriptionInvalid = function () {
    if (!descriptionInput.validity.valid) {
      descriptionInput.style.outline = '2px solid red';

      if (descriptionInput.validity.tooLong) {
        descriptionInput.setCustomValidity('Комментарий не должен превышать 140 символов');
      }
    }
  };
  var onDescriptionValid = function () {
    descriptionInput.setCustomValidity('');
    descriptionInput.style.outline = '';
  };
  descriptionInput.addEventListener('change', onDescriptionValid);

  var onHashtagsInvalid = function () {
    hashtagsInput.value = (hashtagsInput.value || '').trim().replace(/\s{2,}/g, ' ');
    if (hashtagsInput.value) {
      var hashtags = hashtagsInput.value.split(' ');
      hashtags.sort();
      var customValidityMessage;
      for (i = 0; i < hashtags.length; i++) {
        hashtags[i] = hashtags[i].toLowerCase();
        if (hashtags[i].length > 0 && hashtags[i].charAt(0) !== '#') {
          customValidityMessage = 'Хэштег должен начинаться с #';
        } else if (hashtags[i].length === 1) {
          customValidityMessage = 'Хэштег не может состоять только из #';
        } else if (hashtags[i].length > MAX_LENGTH) {
          customValidityMessage = 'Хэштег не может быть длинее 20 символов';
        } else if (hashtags.indexOf(hashtags[i]) !== i) {
          customValidityMessage = 'Не может быть двух одинаковых хештегов';
        } else if (hashtags.length > 5) {
          customValidityMessage = 'Не может быть больше пяти хештегов';
        }
      }
    }
    if (customValidityMessage) {
      hashtagsInput.style.outline = '2px solid red';
      hashtagsInput.setCustomValidity(customValidityMessage);
    } else {
      onHashtagsValid();
    }
  };
  var onHashtagsValid = function () {
    hashtagsInput.style.outline = '';
    hashtagsInput.setCustomValidity('');
  };
  hashtagsInput.addEventListener('change', onHashtagsValid);

  // Отправка на сервер
  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');
  var onSave = function () {
    window.uploadProps.closeUploadPopup();
    window.formProps.resetDefault();
  };
  submitButton.addEventListener('click', function (evt) {
    onHashtagsInvalid();
    onDescriptionInvalid();
    if (hashtagsInput.validity.valid && descriptionInput.validity.valid) {
      evt.preventDefault();
      window.backend.save(new FormData(form), onSave, window.utils.onError);
    }
  });

})();

