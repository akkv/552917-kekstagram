'use strict';
(function () {
  var closeBigPhotoButton = document.querySelector('.big-picture__cancel');

  var openBigPhoto = function (element, data) {
    element.addEventListener('click', function () {
      window.preview.generateBigPhoto(data);
      window.preview.bigPhoto.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', onBigPhotoEscPress);
    });
  };

  var closeBigPhoto = function () {
    window.preview.bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    while (window.preview.commentsContainer.firstChild) {
      window.preview.commentsContainer.removeChild(window.preview.commentsContainer.firstChild);
    }
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  closeBigPhotoButton.addEventListener('click', function () {
    closeBigPhoto();
  });
  var onBigPhotoEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var closeUploadButton = document.querySelector('.img-upload__cancel');
  window.uploadProps = {
    uploadInput: document.querySelector('.img-upload__input'),
    upload: document.querySelector('.img-upload__overlay'),
    commentInput: document.querySelector('.text__description'),
    closeUploadPopup: function () {
      window.uploadProps.upload.classList.add('hidden');
      document.removeEventListener('keydown', onUploadEscPress);
      window.formProps.resetDefault();
    },
    addClickListeners: function () {
      var photosElements = window.smallPhotosContainer.querySelectorAll('a');
      for (var i = 0; i < window.NUMBER_OF_PHOTOS; i++) {
        var element = photosElements[i];
        openBigPhoto(element, window.photosData[i]);
      }
    },
  };

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      if (!(document.activeElement.classList.contains('text__hashtags') || document.activeElement.classList.contains('text__description'))) {
        window.uploadProps.closeUploadPopup();
      }
    }
  };
  var openUploadPopup = function () {
    window.uploadProps.upload.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
  };

  window.uploadProps.uploadInput.addEventListener('change', function () {
    openUploadPopup();
  });

  closeUploadButton.addEventListener('click', function () {
    window.uploadProps.closeUploadPopup();
  });
})();
