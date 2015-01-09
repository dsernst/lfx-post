var iterate = function (array) {
 var counter = 1;
 var results = [];
 var $tableEntry;
 array.forEach(function (entry) {
   $tableEntry = "<tr><th scope='row'>" + counter + "</th><td>" + entry.user + "</td><td>" + entry.content + "</td><td>" + entry.url + "</td><td>" + entry.date + "</td><td>" + entry.votes + "</td></tr>";  
   counter++;
   results.push($tableEntry);
 });
 results.forEach(function (element) {
   $('tbody').append(element.toString());
 });
};