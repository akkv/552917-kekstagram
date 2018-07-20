'use strict';
(function () {
  var templateOfSmallPhoto = document.querySelector('#picture').content.querySelector('a');
  window.picturesProps = {
    smallPhotosContainer: document.querySelector('.pictures'),

    generateSmallPhotosElements: function (data) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        var smallPhoto = templateOfSmallPhoto.cloneNode(true);
        smallPhoto.querySelector('.picture__img').src = data[i].url;
        smallPhoto.querySelector('.picture__stat--likes').textContent = data[i].likes;
        smallPhoto.querySelector('.picture__stat--comments').textContent = '' + data[i].comments.length;
        fragment.appendChild(smallPhoto);
      }
      return fragment;
    }
  };

  var onLoad = function (data) {
    window.photosData = data;
    window.picturesProps.smallPhotosContainer.appendChild(window.picturesProps.generateSmallPhotosElements(window.photosData));
    window.uploadProps.addClickListeners(window.photosData);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };
  window.backend.load(onLoad, window.utils.onError);
})();
