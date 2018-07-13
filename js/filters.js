'use strict';
(function () {
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterPopular = document.querySelector('#filter-popular');

  var clearPhotos = function () {
    var photos = window.picturesProps.smallPhotosContainer.querySelectorAll('a');
    photos.forEach(function (element) {
      element.remove();
    });
  };
  var filters = {
    onNewChange: function () {},
    onPopularChange: function () {},
    onDiscussedChange: function () {}
  };
  filterNew.addEventListener('click', function () {
    filters.onNewChange();
  });

  filterPopular.addEventListener('click', function () {
    filters.onPopularChange();
  });

  filterDiscussed.addEventListener('click', function () {
    filters.onDiscussedChange();
  });

  filters.onNewChange = window.debounce(function () {
    filterNew.classList.toggle('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    var array = window.photosData.slice();
    window.utils.shuffleArray(array);
    array = array.slice(0, 10);

    clearPhotos();
    window.picturesProps.smallPhotosContainer.appendChild(window.picturesProps.renderSmallPhotosElements(array));
    window.uploadProps.addClickListeners(array);
  });

  filters.onPopularChange = window.debounce(function () {
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterPopular.classList.toggle('img-filters__button--active');

    clearPhotos();
    window.picturesProps.smallPhotosContainer.appendChild(window.picturesProps.renderSmallPhotosElements(window.photosData));
    window.uploadProps.addClickListeners(window.photosData);
  });

  filters.onDiscussedChange = window.debounce(function () {
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.toggle('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    var compareCommentsLength = function (lengthA, lengthB) {
      return lengthB.comments.length - lengthA.comments.length;
    };
    var array = window.photosData.slice();
    array.sort(compareCommentsLength);

    clearPhotos();
    window.picturesProps.smallPhotosContainer.appendChild(window.picturesProps.renderSmallPhotosElements(array));
    window.uploadProps.addClickListeners(array);
  });
})();
