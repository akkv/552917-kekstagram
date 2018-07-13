'use strict';
(function () {
  var MAX_LENGTH = 20;
  window.hashtagsInput = document.querySelector('.text__hashtags');
  window.hashtagsInput.addEventListener('change', function () {
    var hashtags = window.hashtagsInput.value.split(' ');
    hashtags.sort();
    for (var i = 0; i < hashtags.length; i++) {
      hashtags[i] = hashtags[i].toLowerCase();
      if (hashtags[i].length > 0 && hashtags[i].charAt(0) !== '#') {
        window.hashtagsInput.setCustomValidity('Хэштег должен начинаться с #');
      } else if (hashtags[i].length === 1) {
        window.hashtagsInput.setCustomValidity('Хэштег не может состоять только из #');
      } else if (hashtags[i].length > MAX_LENGTH) {
        window.hashtagsInput.setCustomValidity('Хэштег не может быть длинее 20 символов');
      } else if (hashtags.indexOf(hashtags[i]) !== i) {
        window.hashtagsInput.setCustomValidity('Не может быть двух одинаковых хештегов');
      } else {
        window.hashtagsInput.setCustomValidity('');
      }
    }
  });
})();
