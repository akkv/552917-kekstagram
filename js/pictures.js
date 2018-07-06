'use strict';
(function () {
  var templateOfSmallPhoto = document.querySelector('#picture').content.querySelector('a');
  window.smallPhotosContainer = document.querySelector('.pictures');

  var renderSmallPhotosElements = function (photosData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosData.length; i++) {
      var smallPhoto = templateOfSmallPhoto.cloneNode(true);
      smallPhoto.querySelector('.picture__img').src = photosData[i].url;
      smallPhoto.querySelector('.picture__stat--likes').textContent = photosData[i].likes;
      smallPhoto.querySelector('.picture__stat--comments').textContent = '' + photosData[i].commentsCount;
      fragment.appendChild(smallPhoto);
    }
    return fragment;
  };
  window.smallPhotosContainer.appendChild(renderSmallPhotosElements(window.photosData));
})();
