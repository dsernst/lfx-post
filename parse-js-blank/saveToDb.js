// Add to db
var saveToDb = function(className, obj) {

	var feed = new className();

	feed.save(obj, {
	  success: function(object) {
	    console.log('saved object', object);
	  },
	  error: function(model, error) {
	    console.log(error);
	  }
	});

}