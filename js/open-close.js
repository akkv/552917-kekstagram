'use strict';
(function () {
  var closeBigPhotoButton = document.querySelector('.big-picture__cancel');
  var upload = document.querySelector('.img-upload__overlay');
  var openBigPhoto = function (data) {
    window.preview.generateBigPhoto(data);
    window.preview.bigPhoto.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onBigPhotoEscPress);
    closeBigPhotoButton.addEventListener('click', closeBigPhoto);
  };
  var closeBigPhoto = function () {
    window.preview.bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    while (window.preview.commentsContainer.firstChild) {
      window.preview.commentsContainer.removeChild(window.preview.commentsContainer.firstChild);
    }
    document.removeEventListener('keydown', onBigPhotoEscPress);
    closeBigPhotoButton.removeEventListener('click', closeBigPhoto);
  };

  var onBigPhotoEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var closeUploadButton = document.querySelector('.img-upload__cancel');
  window.openClose = {
    openBigPhoto: openBigPhoto,
    uploadInput: document.querySelector('.img-upload__input'),
    commentInput: document.querySelector('.text__description'),
    closeUploadPopup: function () {
      upload.classList.add('hidden');
      document.removeEventListener('keydown', onUploadEscPress);
      window.form.resetDefault();
    }
  };

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      if (!(document.activeElement.classList.contains('text__hashtags') || document.activeElement.classList.contains('text__description'))) {
        window.openClose.closeUploadPopup();
      }
    }
  };
  var openUploadPopup = function () {
    upload.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
  };

  window.openClose.uploadInput.addEventListener('change', openUploadPopup);
  closeUploadButton.addEventListener('click', window.openClose.closeUploadPopup);

})();
