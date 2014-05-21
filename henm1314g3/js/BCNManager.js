var priorityColors = ["#b2b2b2", "#333333"];  
var priorityNames = ["normal", "high"];

var priorityArray = [{"color" : "#b2b2b2", "name" : "normal"}, {"color" : "#333333", "name" : "high"}];

BCN.prototype = new BoostObject({});

BCN.prototype.getTypeName = function(){
	return "bcn";
}

function BCN(object){
	BoostObject.call(this, object);

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
	else{
		this.learningIndicators = [];
		this.addLI("");
	}

	//added attr priority to the object BCN

	if(object.hasOwnProperty("priority"))
		this.priority = object.priority;
	else
		this.priority = 0;
}

BCN.prototype.getPriorityColor = function(){
	return priorityArray[this.priority].color;
}

BCN.prototype.setPriorityColor = function(color){
	return priorityArray[this.priority].color = color;
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
BCN.prototype.clone = function(){
	var clone = JSON.parse(JSON.stringify(this));
	return new BCN(clone);
}

function createBCNfromUri(uri, callback){
	var bcnResource = new openapp.oo.Resource(uri);

	bcnResource.getRepresentation("rdfjson", function(bcnObject){
		callback(new BCN(bcnObject));
	});
}

function retrieveAllBcns(space, callback){
	retrieveBoostResources("my:ns:bcn", function(object){return new BCN(object)}, callback);
}

function sortBcns(bcns){
	bcns.sort(function(a, b){
		if (a.priority==b.priority){
			return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		}
		if(a.priority > b.priority){
			return -1;
		}
		else{
			return 1;
		}
	});
}