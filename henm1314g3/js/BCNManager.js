var priorityColors = ["green", "orange", "red"];  
var priorityNames = ["low", "medium", "high"];


function BCN(object){
	if(object.hasOwnProperty("uri"))
		this.uri = object.uri;
	else
		this.uri = "";

	if(object.hasOwnProperty("name"))
		this.name = object.name;
	else
		this.name = "";

	if(object.hasOwnProperty("description"))
		this.description = object.description;
	else
		this.description = "";

	if(object.hasOwnProperty("learningIndicators"))
		this.learningIndicators = object.learningIndicators;
	else
		this.learningIndicators = [];

	if(object.hasOwnProperty("learningDocuments"))
		this.learningDocuments = object.learningDocuments;
	else
		this.learningDocuments = [];

	//added attr priority to the object BCN

	if(object.hasOwnProperty("priority"))
		this.priority = object.priority;
	else
		this.priority = 0;
}


BCN.prototype.addLI = function(name){
	var li = {};
	li.name = name;
	li.description = "";
	//We just increment the LI id whenever a new LI is added
	//We also assume that the LIs are ordered by id in the array
	if(this.learningIndicators.length == 0){
		li.id = 0;
	}
	else{
		li.id = this.learningIndicators[this.learningIndicators.length - 1].id + 1;
	}
	this.learningIndicators.push(li);
	return li;
}

BCN.prototype.removeLI = function(id){
	for(var i = 0; i < this.learningIndicators.length; i++){
		if(this.learningIndicators[i].id == id){
			this.learningIndicators.splice(i, 1);
		}
	}
}

BCN.prototype.create = function(callback){
	var space = new openapp.oo.Resource(openapp.param.space());
	var thisBcn = this;
	space.create({
		relation: openapp.ns.role + "data",
		type: "my:ns:bcn",
		representation: this, //The representation refers to the object
		callback: function(bcnResource){
			//Now we have an URI for our BCN and we need to update the resource
			thisBcn.uri = bcnResource.getURI();
			bcnResource.setRepresentation(thisBcn, "application/json", function(){
				callback();
			});
		}
	});
}

BCN.prototype.update = function(callback){
	var bcnResource = new openapp.oo.Resource(this.uri);
	bcnResource.setRepresentation(this, "application/json", function(){
		callback();
	});
}

BCN.prototype.delete = function(callback){
	openapp.resource.del(this.uri, function(){
		callback();
	});
}

BCN.prototype.clone = function(){
	var jsonText = JSON.stringify(this);
	return new BCN(eval('(' + jsonText + ')'));
}

function createBCNfromUri(uri, callback){
	var bcnResource = new openapp.oo.Resource(uri);

	bcnResource.getRepresentation("rdfjson", function(bcnObject){
		callback(new BCN(bcnObject));
	});
}

function saveBCN(bcn, space, callback){
	//Check consistency
	if(!bcn.hasOwnProperty("name"))
		throw("bcn object has no name");
	if(!bcn.hasOwnProperty("description"))
		throw("bcn object has no description");
	if(!bcn.hasOwnProperty("learningIndicators"))
		throw("bcn object has no learningIndicators");
	if(!$.isArray(bcn.learningIndicators))
		throw("learningIndicators property must be an array");
	if(bcn.learningIndicators.length == 0)
		throw("bcns must have at least one learning indicator");
	bcn.uri = "";
	//Here we create the resource. The BCN gets stored in the space.
	space.create({
		relation: openapp.ns.role + "data",
		type: "my:ns:bcn",
		representation: bcn, //The representation refers to the object
		callback: function(bcnResource){
			//Now we have an URI for our BCN and we need to update the resource
			bcn.uri = bcnResource.getURI();
			bcnResource.setRepresentation(bcn, "application/json", function(){
				callback(bcn);
			});
		}
	});
}

function updateBCN(bcn, callback){
	bcnResource = new openapp.oo.Resource(bcn.uri);
	bcnResource.setRepresentation(bcn, "application/json", callback);
}

function deleteBCN(bcn, callback){
	openapp.resource.del(bcn.uri, callback());
}

function retrieveAllBcns(space, callback){
	retrieveBoostResources("my:ns:bcn", function(object){return new BCN(object)}, callback);
}