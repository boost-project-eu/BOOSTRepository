function Expert(object){
	if(object.hasOwnProperty("uri"))
		this.uri = object.uri;
	else
		this.uri = "";

	if(object.hasOwnProperty("bcnUri"))
		this.bcnUri = object.bcnUri;
	else
		this.bcnUri = "";

	if(object.hasOwnProperty("liId"))
		this.liId = object.liId;
	else
		this.liId = "";

	if(object.hasOwnProperty("name"))
		this.name = object.name;
	else
		this.name = "";

	if(object.hasOwnProperty("email"))
		this.email = object.email;
	else
		this.email = "";

	if(object.hasOwnProperty("tel"))
		this.tel = object.tel;
	else
		this.tel = "";

	if(object.hasOwnProperty("address"))
		this.address = object.address;
	else
		this.address = "";

	if(object.hasOwnProperty("website"))
		this.website = object.website;
	else
		this.website = "";

	if(object.hasOwnProperty("skype"))
		this.skype = object.skype;
	else
		this.skype = "";

	if(object.hasOwnProperty("profile"))
		this.profile = object.profile;
	else
		this.profile = "";

}

Expert.prototype.create = function(callback){
	var space = new openapp.oo.Resource(openapp.param.space());
	var thisExpert = this;
	space.create({
		relation: openapp.ns.role + "data",
		type: "my:ns:Expert",
		representation: this, //The representation refers to the object
		callback: function(ExpertResource){
			//Now we have an URI for our Expert and we need to update the resource
			thisExpert.uri = ExpertResource.getURI();
			ExpertResource.setRepresentation(thisExpert, "application/json", function(){
				callback();
			});
		}
	});
}

Expert.prototype.update = function(callback){
	var ExpertResource = new openapp.oo.Resource(this.uri);
	ExpertResource.setRepresentation(this, "application/json", function(){
		callback();
	});
}

Expert.prototype.delete = function(callback){
	openapp.resource.del(this.uri, function(){
		callback();
	});
}

function retrieveAllExperts(callback){
	retrieveBoostResources("my:ns:Expert", function(object){return new Expert(object)}, callback);
}
