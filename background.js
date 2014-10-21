// Letsfix Chrome Extension
// 
// Share URL with crowd.
// Connect with other who are feeling what you're feeling at that exact moment.


var post = function(url, title){
  // TODO: Gmail OAuth connection
  var message = {to: 'problems@letsfix.net', subject: title, message: url};
  // gmailSend(message); //not finished
  console.log(message);
};

var gmailSend = function(content){


  // doesn't work
  //  return GmailIMAPlibrary;
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