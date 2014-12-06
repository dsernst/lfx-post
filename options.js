// Saves options to chrome.storage
function save_options() {
  var email = document.getElementById('userEmail').value;
  chrome.storage.sync.set({
    user: email,
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

// Restores the preferences stored in chrome.storage.
function restore_options() {
  // Use default value user = ''.
  chrome.storage.sync.get({
    user: '',
  }, function (items) {
    document.getElementById('userEmail').value = items.user;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);