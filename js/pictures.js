'use strict';
(function () {
  var templateOfSmallPhoto = document.querySelector('#picture').content;
  var smallPhotosContainer = document.querySelector('.pictures');
  window.generateSmallPhotosElements = function (data) {
    clearPhotos();
    smallPhotosContainer.appendChild(window.utils.createNewElements(data, templateOfSmallPhoto, function (picture, index, element) {
      element.querySelector('.picture__img').src = picture.url;
      element.querySelector('.picture__stat--likes').textContent = picture.likes;
      element.querySelector('.picture__stat--comments').textContent = '' + picture.comments.length;
      element.querySelector('.picture__link').addEventListener('click', function (evt) {
        evt.preventDefault();
        window.openClose.openBigPhoto(picture);
      });
      return element;
    }));
  };


  var clearPhotos = function () {
    var photos = smallPhotosContainer.querySelectorAll('a');
    photos.forEach(function (element) {
      element.remove();
    });
  };

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  var onLoad = function (data) {
    window.photosData = data;
    window.generateSmallPhotosElements(window.photosData);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };
  window.backend('load', onLoad, window.utils.onError);
})();
