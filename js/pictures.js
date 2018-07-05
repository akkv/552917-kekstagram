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
var commentsContainer = document.querySelector('.social__comments');
var commentTempate = document.querySelector('#comment').content.querySelector('li');

var bigPhotoProps = {
  photo: bigPhoto.querySelector('.big-picture__img img'),
  likes: bigPhoto.querySelector('.likes-count'),
  commentsCount: bigPhoto.querySelector('.comments-count'),
  descriptions: bigPhoto.querySelector('.social__caption'),
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
  var comment = [];
  comment.push(exampleCommentsParts[getRandomInt(0, exampleCommentsParts.length - 1)]);
  var randomForOneOrTwoComments = Math.round(Math.random());
  if (!randomForOneOrTwoComments) {
    var tmp = exampleCommentsParts[getRandomInt(0, exampleCommentsParts.length - 1)];
    while (comment[0] === tmp) {
      tmp = exampleCommentsParts[getRandomInt(0, exampleCommentsParts.length - 1)];
    }
    comment.push(' ' + tmp);
  }
  return comment;
};

var generatePhotosData = function () {
  var urls = generateUrls();
  var photos = [];

  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    var tmp = generateComment();
    photos.push({
      url: urls[i],
      likes: getRandomInt(15, 200),
      description: exampleDescriptionParts[getRandomInt(0, exampleDescriptionParts.length - 1)],
      comments: tmp,
      commentsCount: tmp.length
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

var renderComments = function (photoData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoData.comments.length; i++) {
    var element = commentTempate.cloneNode(true);
    element.querySelector('.social__text').textContent = photoData.comments[i];
    element.querySelector('.social__comment .social__picture').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    fragment.appendChild(element);
  }
  return fragment;
};

var generateBigPhoto = function (photoData) {
  bigPhotoProps.photo.src = photoData.url;
  bigPhotoProps.likes.textContent = photoData.likes;
  bigPhotoProps.descriptions.textContent = photoData.description;
  bigPhotoProps.commentsCount.textContent = '' + photoData.comments.length;
  commentsContainer.appendChild(renderComments(photoData));

  bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPhoto.querySelector('.social__loadmore').classList.add('visually-hidden');
};

var photosData = generatePhotosData();
smallPhotosContainer.appendChild(renderSmallPhotosElements(photosData));


var ESC_KEYCODE = 27;
var photosElements = smallPhotosContainer.querySelectorAll('a');
var closeBigPhotoButton = document.querySelector('.big-picture__cancel');

var openBigPhoto = function (element, data) {
  element.addEventListener('click', function () {
    generateBigPhoto(data);
    bigPhoto.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onBigPhotoEscPress);
  });
};
var addClickListeners = function () {
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    var element = photosElements[i];
    openBigPhoto(element, photosData[i]);
  }
};
addClickListeners();

var closeBigPhoto = function () {
  bigPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
  document.removeEventListener('keydown', onBigPhotoEscPress);
};

closeBigPhotoButton.addEventListener('click', function () {
  closeBigPhoto();
});
var onBigPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPhoto();
  }
};
var onUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (!(document.activeElement.classList.contains('text__hashtags') || document.activeElement.classList.contains('text__description'))) {
      closeUploadPopup();
    }
  }
};

var closeUploadButton = document.querySelector('.img-upload__cancel');
var uploadInput = document.querySelector('.img-upload__input');
var upload = document.querySelector('.img-upload__overlay');

var openUploadPopup = function () {
  upload.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscPress);
};
var closeUploadPopup = function () {
  upload.classList.add('hidden');
  document.removeEventListener('keydown', onUploadEscPress);
  uploadInput.value = '';
};

uploadInput.addEventListener('change', function () {
  openUploadPopup();
});

closeUploadButton.addEventListener('click', function () {
  closeUploadPopup();
});

// Эффекты

var uploadImage = document.querySelector('.img-upload__preview');
var effects = document.querySelectorAll('.effects__radio');

var changeEffect = function (element, effect) {
  element.addEventListener('click', function () {
    uploadImage.classList.remove(uploadImage.classList[1]);
    uploadImage.classList.add('effects__preview--' + effect);

    uploadImage.style.filter = '';
    effectPin.style.left = '20%';
    effectValueWidth.style.width = '20%';

    upload.querySelector('.img-upload__scale').classList.add('hidden');
    if (effect !== 'none') {
      upload.querySelector('.img-upload__scale').classList.remove('hidden');
    }
  });
};
(function () {
  for (var i = 0; i < effects.length; i++) {
    var element = effects[i];
    changeEffect(element, effects[i].value);
  }
})();

var effectValueInput = document.querySelector('.scale__value');
var effectValueWidth = document.querySelector('.scale__level');
var effectLineWidth = document.querySelector('.scale__line');
var effectPin = document.querySelector('.scale__pin');

var generateEffectStyle = function (effectName, value) {
  var style;
  switch (effectName) {
    case 'effects__preview--chrome':
      style = 'grayscale(' + value + ')';
      break;
    case 'effects__preview--sepia':
      style = 'sepia(' + value + ')';
      break;
    case 'effects__preview--marvin':
      style = 'invert(' + (value * 100) + '%)';
      break;
    case 'effects__preview--phobos':
      style = 'blur(' + (value * 3) + 'px)';
      break;
    case 'effects__preview--heat':
      style = 'brightness(' + (1 + (value * 2)) + ')';
      break;
  }
  return style;
};

effectPin.addEventListener('mouseup', function () {
  effectValueInput.value = effectValueWidth.offsetWidth / effectLineWidth.offsetWidth;
  uploadImage.style.filter = generateEffectStyle(uploadImage.classList[1], (effectValueInput.value));
});


// масштаб
var resizeMinus = upload.querySelector('.resize__control--minus');
var resizePlus = upload.querySelector('.resize__control--plus');
var resizeValue = upload.querySelector('.resize__control--value');

var resizePercent = resizeValue.value;
resizePercent = resizePercent.replace('%', '');

resizeMinus.addEventListener('click', function () {
  if (resizePercent > 25) {
    resizePercent -= 25;
    resizeValue.value = resizePercent + '%';
    uploadImage.style.transform = 'scale(' + (resizePercent / 100) + ')';
  }
});
resizePlus.addEventListener('click', function () {
  if (resizePercent < 100) {
    resizePercent += 25;
    resizeValue.value = resizePercent + '%';
    uploadImage.style.transform = 'scale(' + (resizePercent / 100) + ')';
  }
});

// Валидация
(function () {
  var hashtagsInput = upload.querySelector('.text__hashtags');
  hashtagsInput.addEventListener('change', function () {
    var hashtags = hashtagsInput.value.split(' ');
    hashtags.sort();
    for (var i = 0; i < hashtags.length; i++) {
      hashtags[i] = hashtags[i].toLowerCase();
      if (hashtags[i].length > 0 && hashtags[i].charAt(0) !== '#') {
        hashtagsInput.setCustomValidity('Хэштег должен начинаться с #');
      } else if (hashtags[i].length === 1) {
        hashtagsInput.setCustomValidity('Хэштег не может состоять только из #');
      } else if (hashtags[i].length > 20) {
        hashtagsInput.setCustomValidity('Хэштег не может быть длинее 20 символов');
      } else if (hashtags.indexOf(hashtags[i]) !== i) {
        hashtagsInput.setCustomValidity('Не может быть двух одинаковых хештегов');
      } else {
        hashtagsInput.setCustomValidity('');
      }
    }
  });
})();
