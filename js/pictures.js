'use strict';
var descriptionList = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];
var commentList = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

var createArrayOfPhotos = function (quantityOfPhotos, commentsList, descriptionsList) {

  var numList = [];
  var descriptions = [];
  var comments = [];
  var photosArr = [];

  for (var i = 0; i < quantityOfPhotos; i++) { // Заполняю массивы
    numList[i] = i + 1; // чиселами 1-25
    descriptions[i] = descriptionsList[getRandomInt(1, descriptionsList.length - 1)]; // подписями

    var commentArr = []; // массивами с одним или двумя комментариями
    comments[i] = {commentArr: commentArr};
    comments[i].commentArr.push(commentsList[getRandomInt(1, commentsList.length - 1)]);
    var randForComments = getRandomInt(1, 2);
    if (randForComments === 2) {
      var t = commentsList[getRandomInt(1, commentsList.length - 1)];
      while (commentArr[0] === t) { // Проверка на одинаковые комментарии
        t = commentsList[getRandomInt(1, commentsList.length - 1)];
      }
      comments[i].commentArr.push(t);
    }
  }
  numList = shuffleArray(numList); // перемешиваю массив чисел

  for (i = 0; i < quantityOfPhotos; i++) { // Наполняю массив с фото
    photosArr[i] = {
      url: 'photos/' + numList[i] + '.jpg',
      likes: getRandomInt(15, 200),
      comments: comments[i],
      description: descriptions[i]};
  }
  return photosArr;
};

var renderSmallPics = function (array) {
  var templateSmallPicture = document.querySelector('#picture').content.querySelector('a');
  var smallPicturesArea = document.querySelector('.pictures');
  for (var i = 0; i < array.length; i++) {
    var element = templateSmallPicture.cloneNode(true);
    element.children[0].src = array[i].url;
    element.querySelector('.picture__stat--likes').textContent = array[i].likes;
    element.querySelector('.picture__stat--comments').textContent = '' + array[i].comments.commentArr.length;
    smallPicturesArea.appendChild(element);
  }
};

var renderBigPic = function (elementOfArr) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').children[0].src = elementOfArr.url;
  bigPicture.querySelector('.likes-count').textContent = elementOfArr.likes;
  bigPicture.querySelector('.comments-count').textContent = '' + elementOfArr.comments.commentArr.length;
  bigPicture.querySelector('.social__caption').textContent = elementOfArr.description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');

  var templateComment = document.querySelector('#comment').content.querySelector('li');
  for (var i = 0; i < elementOfArr.comments.commentArr.length; i++) {
    var element = templateComment.cloneNode(true);
    element.children[0].src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    document.querySelector('.social__comments').appendChild(element);
    element.children[1].textContent = elementOfArr.comments.commentArr[i];
  }
};

var arrayOfPhotos = createArrayOfPhotos(25, descriptionList, commentList);
renderSmallPics(arrayOfPhotos);
renderBigPic(arrayOfPhotos[0]);
