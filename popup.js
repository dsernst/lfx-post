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

// Begin running our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  var message = {pageDetails: false, votes: 1, comments: {}};

  // Add event handler to Toggle Page Details link
  $('#togglePageDetails').click(function () {
    $('#pageDetails').toggle();
    message.pageDetails = !message.pageDetails;
  });

  // Gather Tab Info
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    message.url = encodeWeirdChars(tabs[0].url);
    message.title = encodeWeirdChars(tabs[0].title);

    // Pass Info To Popup
    $('#pageURL').html(message.url);
    //  $('#pageURL').attr('href', url);    // TODO: fix focus bug
    $('#pageTitle').html(message.title);
    $('#commentField').focus();
  });


  $('#submitComment').click(function (e) {
    e.preventDefault();
    message.comment = $('#commentField').val();
    message.timestamp = new Date().getTime();

    // Grab user's email address from localstorage settings
    chrome.storage.sync.get({user: ''}, function (localstorage) {
      if (localstorage.user === '') {
        localstorage.user = 'unknown-user';
        chrome.tabs.create({url: "options.html"});
      }
      message.user = localstorage.user;

      // Post item
      var firebase = new Firebase('https://feedbyte.firebaseio.com/');
      firebase.push(message);

      // Show confirmation
      document.body.innerHTML = "<h3>Thank you!</h3>";
    });

  });

});
