'use strict';
(function () {
  window.preview = {
    bigPhoto: document.querySelector('.big-picture'),
    commentsContainer: document.querySelector('.social__comments'),
    generateBigPhoto: function (photoData) {
      bigPhotoProps.photo.src = photoData.url;
      bigPhotoProps.likes.textContent = photoData.likes;
      bigPhotoProps.descriptions.textContent = photoData.description;
      bigPhotoProps.commentsCount.textContent = '' + photoData.comments.length;
      this.commentsContainer.appendChild(renderComments(photoData));
      this.bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
      this.bigPhoto.querySelector('.social__loadmore').classList.add('visually-hidden');
    }
  };
  var commentTemplate = document.querySelector('#comment').content.querySelector('li');

  var bigPhotoProps = {
    photo: window.preview.bigPhoto.querySelector('.big-picture__img img'),
    likes: window.preview.bigPhoto.querySelector('.likes-count'),
    commentsCount: window.preview.bigPhoto.querySelector('.comments-count'),
    descriptions: window.preview.bigPhoto.querySelector('.social__caption'),
  };

  var renderComments = function (photoData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoData.comments.length; i++) {
      var element = commentTemplate.cloneNode(true);
      element.querySelector('.social__text').textContent = photoData.comments[i];
      element.querySelector('.social__comment .social__picture').src = 'img/avatar-' + window.utils.getRandomInt(1, 6) + '.svg';
      fragment.appendChild(element);
    }
    return fragment;
  };
})();


