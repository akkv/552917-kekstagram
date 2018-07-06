'use strict';
(function () {
  window.window.bigPhoto = document.querySelector('.big-picture');
  window.commentsContainer = document.querySelector('.social__comments');
  var commentTempate = document.querySelector('#comment').content.querySelector('li');

  var bigPhotoProps = {
    photo: window.bigPhoto.querySelector('.big-picture__img img'),
    likes: window.bigPhoto.querySelector('.likes-count'),
    commentsCount: window.bigPhoto.querySelector('.comments-count'),
    descriptions: window.bigPhoto.querySelector('.social__caption'),
  };

  var renderComments = function (photoData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoData.comments.length; i++) {
      var element = commentTempate.cloneNode(true);
      element.querySelector('.social__text').textContent = photoData.comments[i];
      element.querySelector('.social__comment .social__picture').src = 'img/avatar-' + window.getRandomInt(1, 6) + '.svg';
      fragment.appendChild(element);
    }
    return fragment;
  };
  window.generateBigPhoto = function (photoData) {
    bigPhotoProps.photo.src = photoData.url;
    bigPhotoProps.likes.textContent = photoData.likes;
    bigPhotoProps.descriptions.textContent = photoData.description;
    bigPhotoProps.commentsCount.textContent = '' + photoData.comments.length;
    window.commentsContainer.appendChild(renderComments(photoData));

    window.bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
    window.bigPhoto.querySelector('.social__loadmore').classList.add('visually-hidden');
  };
})();


