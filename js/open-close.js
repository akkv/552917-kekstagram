'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var photosElements = window.smallPhotosContainer.querySelectorAll('a');
  var closeBigPhotoButton = document.querySelector('.big-picture__cancel');

  var openBigPhoto = function (element, data) {
    element.addEventListener('click', function () {
      window.generateBigPhoto(data);
      window.bigPhoto.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', onBigPhotoEscPress);
    });
  };
  var addClickListeners = function () {
    for (var i = 0; i < window.NUMBER_OF_PHOTOS; i++) {
      var element = photosElements[i];
      openBigPhoto(element, window.photosData[i]);
    }
  };
  addClickListeners();

  var closeBigPhoto = function () {
    window.bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    while (window.commentsContainer.firstChild) {
      window.commentsContainer.removeChild(window.commentsContainer.firstChild);
    }
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  closeBigPhotoButton.addEventListener('click', function () {
    closeBigPhoto();
  });
  var onBigPhotoEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var closeUploadButton = document.querySelector('.img-upload__cancel');
  var uploadInput = document.querySelector('.img-upload__input');
  window.upload = document.querySelector('.img-upload__overlay');

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (!(document.activeElement.classList.contains('text__hashtags') || document.activeElement.classList.contains('text__description'))) {
        closeUploadPopup();
      }
    }
  };
  var openUploadPopup = function () {
    window.upload.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
  };
  var closeUploadPopup = function () {
    window.upload.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEscPress);
    uploadInput.value = '';
  };

  uploadInput.addEventListener('change', function () {
    openUploadPopup();
  });

  closeUploadButton.addEventListener('click', function () {
    closeUploadPopup();
  });
})();
