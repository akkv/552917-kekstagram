'use strict';
(function () {
  var hashtagsInput = document.querySelector('.text__hashtags');
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
