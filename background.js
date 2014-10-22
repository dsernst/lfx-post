// Letsfix Chrome Extension
// 
// Share URL with crowd.
// Connect with other who are feeling what you're feeling at that exact moment.
// by: letsfix.net


// Load Google API Client Library
// <script src = "https://apis.google.com/js/client.js?onload=handleClientLoad" >


var getTabInfo = function(){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){
    var url = tabs[0].url;
    var title = tabs[0].title;

    // escape special characters
    url = encodeBadChars(url);
    title = encodeBadChars(title);

    askForComments(url, title);
  });
};


var encodeBadChars = function(string){
  var encoded = encodeURI(string);
  var normalSpaces = encoded.replace(/%20/g," ");
  return normalSpaces;
};


var askForComments = function(url, title){

  var comment = "";

  // TODO: Show input field in popup.html to ask for comments

  post(url, title, comment)
}



var post = function(url, title, comment){
  // Build email parameters (to, subject, body)
  var message = "To: <problems@letsfix.net>\nSubject: [Lfx-post] " + title + "\n\n" + url + "\n\n" + comment;

  console.log(message);

  auth(message);

};


var auth = function(msg){
  // Ask user permission to authorize Gmail OAuth API
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    
    console.log(token);

    // 'me' is a special value to use authenticated user
    sendMessage('me', msg);
  });

};


// Send mail through SMTP with Gmail OAuth API
// see: https://developers.google.com/gmail/api/v1/reference/users/messages/send
var sendMessage = function(userId, email, callback){
  var base64EncodedEmail = btoa(email);
  var request = gapi.client.gmail.users.messages.send({
    'userId': userId,
    'message': {
      'raw': base64EncodedEmail
    }
  });
  request.execute(callback);
};


// TODO: Display a notification for sending success
var noteSuccess = function(){
};


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  var action_url = getTabInfo();
  chrome.tabs.update(tab.id, {url: action_url});
});