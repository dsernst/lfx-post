// get from db
var getFromDb = function(className, callback) {
   var query = new Parse.Query(className);
    query.find().then(function(results) {
      var objects = [];
      results.forEach(function(obj) {
        //adding the object id so we can uniquely identify this object later
        obj.attributes['parseID'] = obj.id;
        objects.push(obj.attributes);
      })
      return objects;
    }).then(callback);
	
}