// Letsfix Chrome Extension
// 
// Share URL with crowd.
// Connect with other who are feeling what you're feeling at that exact moment.

// Authentic with Google OAuth

// Ask user permission to authorize Gmail OAuth API

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  // Use the token.
});


// Send Ajax request to your server with email parameters (to, subject, body, etc.)
var post = function(url, title){
  var message = {to: 'problems@letsfix.net', subject: title, message: url};
  // gmailSend(message); //not finished
  console.log(message);
};

// Send mail through SMTP with Gmail OAuth API


var gmailSend = function(content){

};

// Display a notification for sending success
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