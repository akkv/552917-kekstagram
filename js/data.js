'use strict';
(function () {
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
  window.NUMBER_OF_PHOTOS = 25;

  window.getRandomInt = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  window.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 1; i--) {
      var r = Math.round(Math.random() * i);
      var t = array[i];
      array[i] = array[r];
      array[r] = t;
    }
  };

  var generateUrls = function () {
    var urls = [];
    for (var i = 0; i < window.NUMBER_OF_PHOTOS; i++) {
      urls.push('photos/' + (i + 1) + '.jpg');
    }
    window.shuffleArray(urls);
    return urls;
  };

  var generateComment = function () {
    var comment = [];
    comment.push(exampleCommentsParts[window.getRandomInt(0, exampleCommentsParts.length - 1)]);
    var randomForOneOrTwoComments = Math.round(Math.random());
    if (!randomForOneOrTwoComments) {
      var tmp = exampleCommentsParts[window.getRandomInt(0, exampleCommentsParts.length - 1)];
      while (comment[0] === tmp) {
        tmp = exampleCommentsParts[window.getRandomInt(0, exampleCommentsParts.length - 1)];
      }
      comment.push(' ' + tmp);
    }
    return comment;
  };

  window.generatePhotosData = function () {
    var urls = generateUrls();
    var photos = [];

    for (var i = 0; i < window.NUMBER_OF_PHOTOS; i++) {
      var tmp = generateComment();
      photos.push({
        url: urls[i],
        likes: window.getRandomInt(15, 200),
        description: exampleDescriptionParts[window.getRandomInt(0, exampleDescriptionParts.length - 1)],
        comments: tmp,
        commentsCount: tmp.length
      });
    }
    return photos;
  };
})();
