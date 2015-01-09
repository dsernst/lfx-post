// get from db
var getFromDb = function(className, callback) {
   var query = new Parse.Query(className);
    query.find().then(function(results) {
      var objects = [];
      results.forEach(function(obj) {
        objects.push(obj.attributes);
      })
      return objects;
    }).then(callback);
	
}