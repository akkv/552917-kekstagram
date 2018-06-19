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
var templateOfSmallPhoto = document.querySelector('#picture').content.querySelector('a');
var smallPhotosContainer = document.querySelector('.pictures');

var NUMBER_OF_PHOTOS = 25;
var bigPhoto = document.querySelector('.big-picture');

var bigPhotoProps = {
  photo: bigPhoto.querySelector('.big-picture__img img'),
  likes: bigPhoto.querySelector('.likes-count'),
  comments: bigPhoto.querySelector('.social__text'),
  commentsCount: bigPhoto.querySelector('.comments-count'),
  descriptions: bigPhoto.querySelector('.social__caption'),
  avatar: bigPhoto.querySelector('.social__comment .social__picture')
};

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 1; i--) {
    var r = Math.round(Math.random() * i);
    var t = array[i];
    array[i] = array[r];
    array[r] = t;
  }
};

var generateUrls = function () {
  var urls = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    urls.push('photos/' + (i + 1) + '.jpg');
  }
  shuffleArray(urls);
  return urls;
};

var generateComment = function () {
  var comment = exampleCommentsParts[getRandomInt(0, exampleCommentsParts.length - 1)];
  var randomForOneOrTwoComments = Math.round(Math.random());
  if (!randomForOneOrTwoComments) {
    var tmp = exampleCommentsParts[getRandomInt(0, exampleCommentsParts.length - 1)];
    while (comment === tmp) {
      tmp = exampleCommentsParts[getRandomInt(0, exampleCommentsParts.length - 1)];
    }
    comment += ' ' + tmp;
  }
  return comment;
};

var generatePhotosData = function () {
  var urls = generateUrls();
  var photos = [];

  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    photos.push({
      url: urls[i],
      likes: getRandomInt(15, 200),
      comments: generateComment(),
      commentsCount: 1,
      description: exampleDescriptionParts[getRandomInt(0, exampleDescriptionParts.length - 1)]
    });
  }
  return photos;
};

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

var photosData = generatePhotosData();
smallPhotosContainer.appendChild(renderSmallPhotosElements(photosData));

var generateBigPhoto = function (photoData) {
  bigPhotoProps.photo.src = photoData.url;
  bigPhotoProps.likes.textContent = photoData.likes;
  bigPhotoProps.comments.textContent = photoData.comments;
  bigPhotoProps.commentsCount.textContent = '' + photoData.commentsCount;
  bigPhotoProps.descriptions.textContent = photoData.description;
  bigPhotoProps.avatar.src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';

  bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPhoto.querySelector('.social__loadmore').classList.add('visually-hidden');
};

generateBigPhoto(photosData[0]);
bigPhoto.classList.remove('hidden');
