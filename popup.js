/*global chrome,Firebase*/
// Letsfix Chrome Extension
//
// Share URL with crowd.
// Connect with other who are feeling what you're feeling at that exact moment.
// by: letsfix.net

var encodeWeirdChars = function (string) {
  var encoded = encodeURI(string);
  var normalSpaces = encoded.replace(/%20/g, ' ');
  return normalSpaces;
};

var postItem = function (message) {
  var firebase = new Firebase('https://feedbyte.firebaseio.com/');
  firebase.push(message);
  document.body.innerHTML = "<h3>Thank you!</h3>";
};

var getEmail = function (message) {
  return chrome.storage.sync.get({user: ''}, function (items) {
    console.log("I am the chrome.storage.sync.get callback: " + items.user);
    if (items.user === '') {
      items.user = 'unknown-user';
      chrome.tabs.create({url: "options.html"});
    }
    message.user = items.user;
    console.log(message);
    postItem(message);
  });
};


// Begin running our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  var message = {pageDetails: false, votes: 1, comments: {}};
  // Gather Tab Info
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    message.url = encodeWeirdChars(tabs[0].url);
    message.title = encodeWeirdChars(tabs[0].title);

    // Pass Info To Popup
    $('#pageURL').html(message.url);
    //  $('#pageURL').attr('href', url);    // commented out due to focus bug.
    $('#pageTitle').html(message.title);
    $('#commentField').focus();
  });

  $('#togglePageDetails').click(function () {
    $('#pageDetails').toggle();
    message.pageDetails = !message.pageDetails;
  });

  $('#submitComment').click(function (e) {
    e.preventDefault();
    message.comment = $('#commentField').val();
    message.timestamp = new Date().getTime();
    getEmail(message);
  });

});
