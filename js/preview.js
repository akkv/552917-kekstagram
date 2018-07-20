'use strict';
(function () {
  window.preview = {
    bigPhoto: document.querySelector('.big-picture'),
    commentsContainer: document.querySelector('.social__comments'),
    generateBigPhoto: function (data) {
      bigPhotoProps.photo.src = data.url;
      bigPhotoProps.likes.textContent = data.likes;
      bigPhotoProps.descriptions.textContent = data.description;
      bigPhotoProps.commentsCount.textContent = '' + data.comments.length;
      this.commentsContainer.appendChild(renderComments(data));
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

  var renderComments = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.comments.length; i++) {
      var element = commentTemplate.cloneNode(true);
      element.querySelector('.social__text').textContent = data.comments[i];
      element.querySelector('.social__comment .social__picture').src = 'img/avatar-' + window.utils.getRandomInt(1, 6) + '.svg';
      fragment.appendChild(element);
    }
    return fragment;
  };
})();


