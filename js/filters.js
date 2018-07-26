'use strict';
(function () {
  var filterElement = document.querySelector('.img-filters');
  var formElement = filterElement.querySelector('.img-filters__form');
  var filterControlElements = formElement.querySelectorAll('.img-filters__button');
  var ACTIVE_CLASS = 'img-filters__button--active';
  var FILTER_NEW_AMOUNT = 10;

  var activeClassRemove = function () {
    filterControlElements.forEach(function (element) {
      element.classList.remove(ACTIVE_CLASS);
    });
  };

  var newFilter = function (data) {
    var newPhotos = data.slice();
    window.utils.shuffleArray(newPhotos);
    newPhotos = newPhotos.slice(0, FILTER_NEW_AMOUNT);
    return newPhotos;
  };
  var discussedFilter = function (data) {
    var compareCommentsLength = function (lengthA, lengthB) {
      return lengthB.comments.length - lengthA.comments.length;
    };
    var discussedPhotos = data.slice();
    discussedPhotos.sort(compareCommentsLength);
    return discussedPhotos;
  };

  var changeFilter = function (filterName) {
    switch (filterName) {
      case 'filter-popular':
        window.generateSmallPhotosElements(window.photosData);
        break;
      case 'filter-new':
        window.generateSmallPhotosElements(newFilter(window.photosData));
        break;
      case 'filter-discussed':
        window.generateSmallPhotosElements(discussedFilter(window.photosData));
        break;
      default:
        break;
    }
  };

  formElement.addEventListener('click', function (evt) {
    if (evt.target.tagName.toLocaleLowerCase() === 'button') {
      activeClassRemove();
      evt.target.classList.add(ACTIVE_CLASS);
      window.debounce(function () {
        changeFilter(evt.target.id);
      });
    }
  });

})();
