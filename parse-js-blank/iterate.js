var iterate = function (array) {
 var counter = 1;
 var results = [];
 var tableEntry;
 array.forEach(function (entry) {
   tableEntry = "<tr parseID=" + entry.parseID + "><th scope='row'>" + counter + "</th><td>" + entry.user + "</td><td>" + entry.comment + "</td><td>" + entry.url + "</td><td>" + new Date(entry.timestamp) + "</td><td>" + entry.votes + "</td><td><button type='button' parseID=" + entry.parseID + ">Click Me!</button></tr>";
   counter++;
   results.push(tableEntry);
 });
 results.forEach(function (element) {
   $('tbody').append(element.toString());
 });
};