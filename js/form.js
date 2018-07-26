'use strict';
(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var EFFECT_NONE = 'none';
  var RESIZE_STEP = 25;
  var SYMBOL = {
    PERCENT: '%',
    EMPTY: ''
  };
  var MAX_RESIZE_VALUE = 100;
  var MAX_NUMBER_OF_HASHTAGS = 5;
  var effectValueInput = document.querySelector('.scale__value');
  var DEFAULT_EFFECT_VALUE = '100';
  var upload = document.querySelector('.img-upload__wrapper');
  var uploadImage = upload.querySelector('.img-upload__preview');
  var effects = upload.querySelectorAll('.effects__radio');
  var resizeMinus = upload.querySelector('.resize__control--minus');
  var resizePlus = upload.querySelector('.resize__control--plus');
  var resizeValue = upload.querySelector('.resize__control--value');
  var resizePercent = resizeValue.value;

  var changeEffect = function (element, effect) {
    element.addEventListener('click', function () {
      uploadImage.classList.remove(uploadImage.classList[1]);
      uploadImage.classList.add('effects__preview--' + effect);

      uploadImage.style.filter = SYMBOL.EMPTY;
      window.form.pinHandler.style.left = DEFAULT_EFFECT_VALUE + SYMBOL.PERCENT;
      window.form.effectValueDiv.style.width = DEFAULT_EFFECT_VALUE + SYMBOL.PERCENT;
      effectValueInput.value = DEFAULT_EFFECT_VALUE;

      document.querySelector('.img-upload__scale').classList.add('hidden');
      if (effect !== EFFECT_NONE) {
        document.querySelector('.img-upload__scale').classList.remove('hidden');
      }
    });
  };
  effects.forEach(function (element) {
    changeEffect(element, element.value);
  });

  window.form = {
    effectValueDiv: document.querySelector('.scale__level'),
    effectLine: document.querySelector('.scale__line'),
    pinHandler: document.querySelector('.scale__pin'),
    effectChangeOnMouseMove: function () {
      effectValueInput.value = (this.effectValueDiv.offsetWidth / this.effectLine.offsetWidth * 100).toFixed(0);
      uploadImage.style.filter = generateEffectStyle(uploadImage.classList[1], (effectValueInput.value / 100));
    },
    resetDefault: function () {
      window.openClose.uploadInput.value = SYMBOL.EMPTY;
      hashtagsInput.value = SYMBOL.EMPTY;
      window.openClose.commentInput.value = SYMBOL.EMPTY;
      uploadImage.style.filter = SYMBOL.EMPTY;
      this.pinHandler.style.left = DEFAULT_EFFECT_VALUE + SYMBOL.PERCENT;
      this.effectValueDiv.style.width = DEFAULT_EFFECT_VALUE + SYMBOL.PERCENT;
      effectValueInput.value = DEFAULT_EFFECT_VALUE;
      resizeValue.value = MAX_RESIZE_VALUE + SYMBOL.PERCENT;
      resizePercent = resizeValue.value;
      resizePercent = resizePercent.replace(SYMBOL.PERCENT, SYMBOL.EMPTY);
      uploadImage.style.transform = generateResizeTransformStyle(resizePercent);
      window.utils.deleteErrorMessage();
    },
  };
  var generateEffectStyle = function (effectName, value) {
    var effect = {
      'effects__preview--chrome': 'grayscale(' + value + ')',
      'effects__preview--sepia': 'sepia(' + value + ')',
      'effects__preview--marvin': 'invert(' + (value * 100) + '%)',
      'effects__preview--phobos': 'blur(' + (value * 3) + 'px)',
      'effects__preview--heat': 'brightness(' + (1 + (value * 2)) + ')'
    };
    return effect[effectName];
  };

  // масштаб
  resizePercent = resizePercent.replace(SYMBOL.PERCENT, SYMBOL.EMPTY);

  var generateResizeTransformStyle = function (value) {
    return 'scale(' + value / 100 + ')';
  };
  resizeMinus.addEventListener('click', function () {
    if (resizePercent > RESIZE_STEP) {
      resizePercent -= RESIZE_STEP;
      resizeValue.value = resizePercent + SYMBOL.PERCENT;
      uploadImage.style.transform = generateResizeTransformStyle(resizePercent);
    }
  });
  resizePlus.addEventListener('click', function () {
    if (resizePercent < MAX_RESIZE_VALUE) {
      resizePercent += RESIZE_STEP;
      resizeValue.value = resizePercent + SYMBOL.PERCENT;
      uploadImage.style.transform = generateResizeTransformStyle(resizePercent);
    }
  });
  // Валидация
  var descriptionInput = upload.querySelector('.text__description');
  var hashtagsInput = upload.querySelector('.text__hashtags');

  var onDescriptionInvalid = function () {
    if (!descriptionInput.validity.valid) {
      descriptionInput.style.outline = '2px solid red';

      if (descriptionInput.validity.tooLong) {
        descriptionInput.setCustomValidity('Комментарий не должен превышать 140 символов');
      }
    }
  };
  var onDescriptionChange = function () {
    descriptionInput.setCustomValidity(SYMBOL.EMPTY);
    descriptionInput.style.outline = SYMBOL.EMPTY;
  };
  descriptionInput.addEventListener('change', onDescriptionChange);
  var validityMessages = {
    startWithPoundSign: 'Хэштег должен начинаться с #',
    onlyPoundSign: 'Хэштег не может состоять только из #',
    maxLength: 'Хэштег не может быть длинее 20 символов',
    noRepeat: 'Не может быть двух одинаковых хештегов',
    overFive: 'Не может быть больше пяти хештегов'
  };

  var onHashtagsInvalid = function () {
    hashtagsInput.value = (hashtagsInput.value || SYMBOL.EMPTY).trim().replace(/\s{2,}/g, ' ');
    if (hashtagsInput.value) {
      var hashtags = hashtagsInput.value.split(' ');
      hashtags.sort();
      var customValidityMessage;
      hashtags.forEach(function (element, i) {
        element = element.toLowerCase();
        if (element.length > 0 && element.charAt(0) !== '#') {
          customValidityMessage = validityMessages.startWithPoundSign;
        } else if (element.length === 1) {
          customValidityMessage = validityMessages.onlyPoundSign;
        } else if (element.length > MAX_HASHTAG_LENGTH) {
          customValidityMessage = validityMessages.maxLength;
        } else if (hashtags.indexOf(element) !== i) {
          customValidityMessage = validityMessages.noRepeat;
        } else if (hashtags.length > MAX_NUMBER_OF_HASHTAGS) {
          customValidityMessage = validityMessages.overFive;
        }
      });
    }
    if (customValidityMessage) {
      hashtagsInput.style.outline = '2px solid red';
      hashtagsInput.setCustomValidity(customValidityMessage);
    } else {
      onHashtagChange();
    }
  };
  var onHashtagChange = function () {
    hashtagsInput.style.outline = SYMBOL.EMPTY;
    hashtagsInput.setCustomValidity(SYMBOL.EMPTY);
  };
  hashtagsInput.addEventListener('change', onHashtagChange);

  // Отправка на сервер
  var submitButton = upload.querySelector('.img-upload__submit');
  var form = upload.querySelector('.img-upload__form');
  var onSave = function () {
    window.openClose.closeUploadPopup();
    window.form.resetDefault();
  };
  submitButton.addEventListener('click', function (evt) {
    onHashtagsInvalid();
    onDescriptionInvalid();
    if (hashtagsInput.validity.valid && descriptionInput.validity.valid) {
      evt.preventDefault();
      window.backend('save', onSave, window.utils.onError, new FormData(form));
    }
  });

})();
