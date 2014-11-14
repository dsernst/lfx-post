// Letsfix Chrome Extension
// 
// Share URL with crowd.
// Connect with other who are feeling what you're feeling at that exact moment.
// by: letsfix.net

document.addEventListener('DOMContentLoaded', function () {

  $('#submitComment').click(function (e) {
    e.preventDefault();
    collectComment();
  });
});

var collectComment = function () {
  var url = $('#pageURL').html();
  var title = $('#pageTitle').html();

  // escape special characters to prep for base64 encoding
  url = encodeWeirdChars(url);
  title = encodeWeirdChars(title);

  var comment = $('#commentField').val();

  buildMessage(url, title, comment);
};

var encodeWeirdChars = function (string) {
  var encoded = encodeURI(string);
  var normalSpaces = encoded.replace(/%20/g, ' ');
  return normalSpaces;
};

var buildMessage = function (url, title, comment) {
  // Build email parameters (to, subject, body)
  var message = {'title': title, 'url': url, 'note': comment};

  console.log(message);

  postItem(message);
};

var postItem = function (message) {
  var timestamp = new Date().getTime();
  var uploadPath = 'http://lfxpost.s3.amazonaws.com/receive/' + timestamp + '.json';
  $.ajax({
    type: "PUT",
    url: uploadPath,
    dataType: 'json',
    async: false,
    data: JSON.stringify(message),
    error: noteErrors,
    success: noteSuccess
  });
};

var noteErrors = function (jqXHR, textStatus, errorThrown) {
  console.log(jqXHR + '\n\n' + textStatus + '\n\n' + errorThrown);
};

var noteSuccess = function (data, textStatus, jqXHR) {
  document.body.innerHTML = "<h3>Success...?</h3>";
  console.log(data + '\n\n' + textStatus + '\n\n' + jqXHR);
};

// Begin running our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  // Gather Tab Info
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var title = tabs[0].title;

    // Pass Info To Popup
    $('#pageURL').html(url);
    //  $('#pageURL').attr('href', url);    // commented out due to focus bug.
    $('#pageTitle').html(title);
    $('#commentField').focus();
  });
});