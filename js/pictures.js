'use strict';
var exampleDescriptionParts = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var exampleCommentsParts = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var templateForSmallPhoto = document.querySelector('#picture').content.querySelector('a');
var whereToAddSmallPhotos = document.querySelector('.pictures');

var numberOfPhotos = 25;
var bigPhoto = document.querySelector('.big-picture');

var bigPhotoProps = {
  photo: bigPhoto.querySelector('.big-picture__img').querySelector('img'),
  likes: bigPhoto.querySelector('.likes-count'),
  comments: bigPhoto.querySelector('.social__text'),
  commentsCount: bigPhoto.querySelector('.comments-count'),
  descriptions: bigPhoto.querySelector('.social__caption'),
  avatar: bigPhoto.querySelector('.social__comment').querySelector('.social__picture')
};

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var generateUrls = function (count) {
  var urls = [];
  for (var i = 0; i < count; i++) {
    urls[i] = 'photos/' + (i + 1) + '.jpg';
  }
  for (i = urls.length - 1; i > 1; i--) {
    var r = Math.round(Math.random() * i);
    var t = urls[i];
    urls[i] = urls[r];
    urls[r] = t;
  }
  return urls;
};

var generateComment = function () {
  var comment = exampleCommentsParts[getRandomInt(0, exampleCommentsParts.length - 1)];
  var randomForOneOrTwoComments = Math.round(Math.random());
  if (!randomForOneOrTwoComments) {
    var t = exampleCommentsParts[getRandomInt(0, exampleCommentsParts.length - 1)];
    while (comment === t) {
      t = exampleCommentsParts[getRandomInt(0, exampleCommentsParts.length - 1)];
    }
    comment += ' ' + t;
  }
  return comment;
};

var generatePhotosObjects = function (count) {
  var photos = [];

  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: urls[i],
      likes: getRandomInt(15, 200),
      comments: generateComment(),
      commentsCount: 1,
      description: exampleDescriptionParts[getRandomInt(0, exampleDescriptionParts.length - 1)]
    };
  }
  return photos;
};

var renderSmallPhotos = function (whereToAdd, photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var smallPhoto = templateForSmallPhoto.cloneNode(true);
    smallPhoto.querySelector('.picture__img').src = photos[i].url;
    smallPhoto.querySelector('.picture__stat--likes').textContent = photos[i].likes;
    smallPhoto.querySelector('.picture__stat--comments').textContent = '' + photos[i].commentsCount;
    fragment.appendChild(smallPhoto);
  }
  whereToAdd.appendChild(fragment);
};

var renderBigPhoto = function (onePhoto) {
  bigPhotoProps.photo.src = onePhoto.url;
  bigPhotoProps.likes.textContent = onePhoto.likes;
  bigPhotoProps.comments.textContent = onePhoto.comments;
  bigPhotoProps.commentsCount.textContent = '' + onePhoto.commentsCount;
  bigPhotoProps.descriptions.textContent = onePhoto.description;
  bigPhotoProps.avatar.src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';

  bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPhoto.querySelector('.social__loadmore').classList.add('visually-hidden');
};

var urls = generateUrls(numberOfPhotos);
var photosObjects = generatePhotosObjects(numberOfPhotos);

renderSmallPhotos(whereToAddSmallPhotos, photosObjects);
renderBigPhoto(photosObjects[0]);
bigPhoto.classList.remove('hidden');

