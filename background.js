// Letsfix Chrome Extension
// 
// Share URL with crowd.
// Connect with other who are feeling what you're feeling at that exact moment.
// by: letsfix.net


// Load Google API Client Library
// <script src = "https://apis.google.com/js/client.js?onload=handleClientLoad" >

var stripBadChars = function(string){
  var encoded = encodeURI(string);
  var normalSpaces = encoded.replace(/%20/g," ");

  return normalSpaces
};

// Build email parameters (to, subject, body, etc.)
var post = function(url, title){
  
  // escape special characters
  url = stripBadChars(url);
  title = stripBadChars(title);


  var message = "To: <problems@letsfix.net>\nSubject: Lfx-post: " + title + "\n\n" + url;
  console.log(message);

  auth(message);

};


// Send mail through SMTP with Gmail OAuth API
/**
 * Send Message.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} email RFC 5322 formatted String.
 * @param  {Function} callback Function to call when the request is complete.
 */
function sendMessage(userId, email, callback) {
  var base64EncodedEmail = btoa(email);
  var request = gapi.client.gmail.users.messages.send({
    'userId': userId,
    'message': {
      'raw': base64EncodedEmail
    }
  });
  request.execute(callback);
};


// Authenticate with Google OAuth
var auth = function(msg){

  // Ask user permission to authorize Gmail OAuth API
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    
    console.log(token);

    sendMessage('me', msg);
  });

};


// TODO: Display a notification for sending success
var noteSuccess = function(){
};



var lfxURL = function(){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){
    var url = tabs[0].url;
    var title = tabs[0].title;
    post(url, title);
  });
};


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  var action_url = lfxURL();
  chrome.tabs.update(tab.id, {url: action_url});
});