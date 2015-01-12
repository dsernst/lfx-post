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