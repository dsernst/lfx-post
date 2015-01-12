/*global chrome*/
// Letsfix Chrome Extension
// 
// Share URL with crowd.
// Connect with others who are feeling what you're feeling at that exact moment.
// by: letsfix.net

var encodeWeirdChars = function (string) {
  var encoded = encodeURI(string);
  var normalSpaces = encoded.replace(/%20/g, ' ');
  return normalSpaces;
};

var noteErrors = function (jqXHR, textStatus, errorThrown) {
  jqXHR = JSON.stringify(jqXHR);
  console.error(jqXHR + '\n\n' + textStatus + '\n\n' + errorThrown);
};

var noteSuccess = function (data, textStatus, jqXHR) {
  document.body.innerHTML = "<h3>Success</h3>";
  jqXHR = JSON.stringify(jqXHR);
  console.info(data + '\n\n' + textStatus + '\n\n' + jqXHR);
};

//map of dangerous characters to a hex representation
var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "\n": "<br>"
};

// escaping html for XSS attacks
function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]|[\n]/g, function (s) {
    return entityMap[s];
  });
}

var postItem = function (message) {
  var timestamp = new Date().getTime();
  var safeMessage = escapeHtml(message);
  var uploadPath = 'http://lfxpost.s3.amazonaws.com/' + escapeHtml(message.user) + '/' + timestamp + '.json';
  $.ajax({
    type: "PUT",
    url: uploadPath,
    contentType: 'application/json',
    async: false,
    headers: {'x-amz-acl': 'bucket-owner-full-control'},
    data: JSON.stringify({"data": safeMessage}),
    error: noteErrors,
    success: noteSuccess
  });
};

var getEmail = function (message) {
  return chrome.storage.sync.get({user: ''}, function (items) {
    console.log("I am the chrome.storage.sync.get callback: " + items.user);
    if (items.user === '') {
      items.user = 'unknown-user';
      chrome.tabs.create({url: "options.html"});
    }
    message.user = escapeHtml(items.user);
    console.log(message);
    postItem(message);
  });
};


// Begin running our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  var message = {};
  // Gather Tab Info
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    message.url = escapeHtml(encodeWeirdChars(tabs[0].url));
    message.title = escapeHtml(encodeWeirdChars(tabs[0].title));

    // Pass Info To Popup
    $('#pageURL').html(message.url);
    //  $('#pageURL').attr('href', url);    // commented out due to focus bug.
    $('#pageTitle').html(message.title);
    $('#commentField').focus();
  });

  $('#submitComment').click(function (e) {
    e.preventDefault();
    message.comment = escapeHtml($('#commentField').val());
    message.timestamp = new Date().getTime();
    getEmail(message);
  });

});