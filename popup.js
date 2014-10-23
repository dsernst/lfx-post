// Letsfix Chrome Extension
// 
// Share URL with crowd.
// Connect with other who are feeling what you're feeling at that exact moment.
// by: letsfix.net


var gatherTabInfo = function(){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){
    var url = tabs[0].url;
    var title = tabs[0].title;

    passInfoToPopup(url, title);
  });
};


var passInfoToPopup = function(url, title){
  $('#pageURL').html(url);
//  $('#pageURL').attr('href', url);
  $('#pageTitle').html(title);
  $('#commentField').focus();
};


document.addEventListener('DOMContentLoaded', function() {

  $('#submitComment').click(function (e) {
    e.preventDefault();
    collectComment();
  });
});


var collectComment = function(){
  var url = $('#pageURL').html();
  var title = $('#pageTitle').html();

  // escape special characters to prep for base64 encoding
  url = encodeWeirdChars(url);
  title = encodeWeirdChars(title);

  var comment = $('#commentField').val();

  buildMessage(url, title, comment);

}


var encodeWeirdChars = function(string){
  var encoded = encodeURI(string);
  var normalSpaces = encoded.replace(/%20/g," ");
  return normalSpaces;
};


var buildMessage = function(url, title, comment){
  // Build email parameters (to, subject, body)
  var message = "To: <problems@letsfix.net>\nSubject: [Lfx-post] " + title + "\n\n" + url + "\n\n" + comment;

  console.log(message);

  auth(message);

};


var auth = function(message){
  // Ask user permission to authorize Gmail OAuth API
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    
    console.log(token);

    sendMessage(message, noteSuccess() );
  });

};


// Send mail through SMTP with Gmail OAuth API
// see https://developers.google.com/gmail/api/v1/reference/users/messages/send
var sendMessage = function(message, callback){
  var base64EncodedEmail = btoa(message);
  console.log("about to send gapi request");
  var request = gapi.client.gmail.users.messages.send({
    // 'me' is a special value, uses authenticated user
    'userId': 'me',
    'message': {
      'raw': base64EncodedEmail
    }
  });
  request.execute(callback);
};


var noteSuccess = function(){
  document.body.innerHTML = "<h3>Success!</h3>";
};


// Begin running our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  gatherTabInfo();
});