function BoostObject(object){
	if(object && object.hasOwnProperty("uri"))
		this.uri = object.uri;
	else
		this.uri = "";
}

BoostObject.prototype.create = function(callback, parentResource){
	if(parentResource === undefined)
		var parentResource = new openapp.oo.Resource(openapp.param.space());
	var thisObject = this;
	parentResource.create({
		relation: openapp.ns.role + "data",
		type: "my:ns:" + thisObject.getTypeName(),
		representation: thisObject, //The representation refers to the actual object
		callback: function(resource){
			//Now we have an URI for our BCN and we need to update the resource
			thisObject.uri = resource.getURI();
			resource.setRepresentation(thisObject, "application/json", function(){
				callback();
			});
		}
	});
}

BoostObject.prototype.getTypeName = function(){
	return "BoostObject";
}

BoostObject.prototype.update = function(callback){
	//If resource was not created, create it instead
	if(this.uri == ""){
		this.create(callback);
	}
	else{
		var boostResource = new openapp.oo.Resource(this.uri);
		boostResource.setRepresentation(this, "application/json", function(){
			callback();
		});
	}
}

BoostObject.prototype.delete = function(callback){
	openapp.resource.del(this.uri, function(){
		callback();
	});
}

function retrieveBoostResources(typeName, constructorFunction, callback, parentResource){
	if(parentResource === undefined)
		var parentResource = new openapp.oo.Resource(openapp.param.space());

	parentResource.getSubResources({
		relation: openapp.ns.role + "data",
		type: typeName,
		onAll: function(resources) {
			var objectList = [];
			var getRepresentation = function(resource, done){
				resource.getRepresentation("rdfjson", function(object){
					objectList.push(constructorFunction(object));
					done();
				});
			};

			async.forEach(resources, getRepresentation, function(){
				callback(objectList);
			});
		}
	});
}