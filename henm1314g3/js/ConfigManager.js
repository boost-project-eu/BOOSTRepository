function Config(object){
	if(object.hasOwnProperty("uri"))
		this.uri = object.uri;
	else
		this.uri = "";

	if(object.hasOwnProperty("repositorySelection"))
		this.repositorySelection = object.repositorySelection;
	else{
		this.repositorySelection = [];
		for(var i = 0; i < repositories.length; i++){
			var repository = repositories[i];
			this.repositorySelection.push({name: repository.name, isSelected: true});
		}
	}
}

Config.prototype.create = function(callback){
	var space = new openapp.oo.Resource(openapp.param.space());
	var thisConfig = this;
	space.create({
		relation: openapp.ns.role + "data",
		type: "my:ns:config",
		representation: thisConfig, //The representation refers to the object
		callback: function(configResource){
			//Now we have an URI for our config and we need to update the resource
			thisConfig.uri = configResource.getURI();
			configResource.setRepresentation(thisConfig, "application/json", function(){
				callback();
			});
		}
	});
}

Config.prototype.update = function(callback){
	//If update is called before the resource was created in the space (uri == "")
	//just call create.
	if(this.uri == ""){
		this.create(function(){
			callback();
		});
	}
	else {
		var configResource = new openapp.oo.Resource(this.uri);
		configResource.setRepresentation(this, "application/json", function(){
			callback();
		});
	}
}

function updateConfig(config, callback){
	configResource = new openapp.oo.Resource(config.uri);
	configResource.setRepresentation(config, "application/json", callback);
}


function retrieveConfig(space, callback){
	retrieveBoostResources("my:ns:config", function(object){return new Config(object)}, function(config){
		//If no config file is stored in the space just return a default one
		if(config.length == 0){
			var defaultConfig = new Config({});
			callback(defaultConfig);
		}
		else{
			callback(config[0]);
		}
	});
}