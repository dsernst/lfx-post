TODO
====

- [ ] Add instructions
- [x] Add Neil to AUTHORS document
- [ ] Add thank you for downloading extension
- [ ] Clarify success message
- [ ] Fix keyboard shortcuts -- tab to select 'submit' button

-------------

USERNAME feature: We want to be able to see who's sending incoming data.
- [x] Load options if no email saved
- [x] Give user area to enter email address authentication
- [x] Store user authentication in LocalStorage
- [x] Pass userID to message before sending
- [x] store data to indiv folder by userID
- [ ] Add warning if no email address stored
- [ ] Check extension settings on install/update
- [ ] Add note about setting email if forced open options.html

------------

QUEUE feature: store incomplete data in local storage until ready
- [ ] Store if no internet connection
- [ ] Store if no username set
- [ ] Clear queue periodically

FEEDBYTE
========
1. escape XSS attacks
2. figure out security around public keys
3. add button
  a. figure out how to send data to parse
  b. figure out how to update data on a specific parse object
  c. append a vote button next to each row
  d. when that vote button is clicked, send off an update for that object
  e. tie each row back to the parse object it's coming from
4. Add filter for "wants to have url displayed"