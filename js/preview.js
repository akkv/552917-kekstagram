'use strict';
(function () {
  var AVATAR_SRC_INDEX = {
    MIN: 1,
    MAX: 6
  };
  var commentTemplate = document.querySelector('#comment').content.querySelector('li');
  window.preview = {
    bigPhoto: document.querySelector('.big-picture'),
    commentsContainer: document.querySelector('.social__comments'),
    generateBigPhoto: function (data) {
      bigPhotoProps.photo.src = data.url;
      bigPhotoProps.likes.textContent = data.likes;
      bigPhotoProps.descriptions.textContent = data.description;
      bigPhotoProps.commentsCount.textContent = '' + data.comments.length;
      this.commentsContainer.appendChild(window.utils.createNewElements(data.comments, commentTemplate, function (comment, index, element) {
        element.querySelector('.social__text').textContent = comment;
        element.querySelector('.social__comment .social__picture').src = generateAvatarSrc();
        return element;
      }));
      this.bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
      this.bigPhoto.querySelector('.social__loadmore').classList.add('visually-hidden');
    }
  };

  var bigPhotoProps = {
    photo: window.preview.bigPhoto.querySelector('.big-picture__img img'),
    likes: window.preview.bigPhoto.querySelector('.likes-count'),
    commentsCount: window.preview.bigPhoto.querySelector('.comments-count'),
    descriptions: window.preview.bigPhoto.querySelector('.social__caption'),
  };

  var generateAvatarSrc = function () {
    return 'img/avatar-' + window.utils.getRandomInt(AVATAR_SRC_INDEX.MIN, AVATAR_SRC_INDEX.MAX) + '.svg';
  };
})();


