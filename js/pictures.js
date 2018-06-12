'use strict';
var exampleDescriptionParts = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];
var exampleCommentsParts = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var templateOfSmallPhotos = document.querySelector('#picture').content.querySelector('a');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 1; i--) {
    var r = Math.floor(Math.random() * i);
    var t = array[i];
    array[i] = array[r];
    array[r] = t;
  }
  return array;
};

var getRandomArray = function (amount) {
  var array = [];
  for (var i = 0; i < amount; i++) {
    array[i] = i + 1;
  }
  array = shuffleArray(array);
  return array;
};

var createArrayOfPhotos = function (amountOfPhotos, commentsParts, descriptionsParts, urls) {
  var photosArray = [];
  for (var i = 0; i < amountOfPhotos; i++) {
    photosArray[i] = {
      url: 'photos/' + urls[i] + '.jpg',
      likes: getRandomInt(15, 200),
      comments: commentsParts[getRandomInt(0, commentsParts.length)],
      commentsCount: 1,
      description: descriptionsParts[getRandomInt(0, descriptionsParts.length)]
    };
    var randomForOneOrTwoComments = Math.round(Math.random());
    if (!randomForOneOrTwoComments) {
      var t = commentsParts[getRandomInt(0, commentsParts.length)];
      while (photosArray[i].comments === t) {
        t = commentsParts[getRandomInt(0, commentsParts.length)];
      }
      photosArray[i].comments += t;
    }
  }
  return photosArray;
};

var renderSmallPhotos = function (template, whereToAdd, photosArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photosArray.length; i++) {
    var smallPhoto = template.cloneNode(true);
    smallPhoto.querySelector('.picture__img').src = photosArray[i].url;
    smallPhoto.querySelector('.picture__stat--likes').textContent = photosArray[i].likes;
    smallPhoto.querySelector('.picture__stat--comments').textContent = '' + photosArray[i].commentsCount;
    fragment.appendChild(smallPhoto);
  }
  whereToAdd.appendChild(fragment);
};

var renderBigPhoto = function (oneOfPhotos) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = oneOfPhotos.url;
  bigPicture.querySelector('.likes-count').textContent = oneOfPhotos.likes;
  bigPicture.querySelector('.comments-count').textContent = '' + oneOfPhotos.commentsCount;
  bigPicture.querySelector('.social__caption').textContent = oneOfPhotos.description;
  bigPicture.querySelector('.social__comment').querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
  bigPicture.querySelector('.social__text').textContent = oneOfPhotos.comments;

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
};

var exampleUrls = getRandomArray(25);
var photosArray = createArrayOfPhotos(25, exampleCommentsParts, exampleDescriptionParts, exampleUrls);
var whereToAdd = document.querySelector('.pictures');
renderSmallPhotos(templateOfSmallPhotos, whereToAdd, photosArray);
renderBigPhoto(photosArray[0]);

