Config.prototype = new BoostObject({});

Config.prototype.getTypeName = function(){
	return "config";
}

function Config(object){
	BoostObject.call(this, object);

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

function retrieveConfig(space, callback){
	retrieveBoostResources("my:ns:config", function(object){return new Config(object)}, function(config){
		//If no config file is stored in the space just return a default one
		if(config.length == 0){
			var defaultConfig = new Config({});
			callback(defaultConfig);
		}
		else{
			if(config.length > 1)
				console.log("Warning: More than one boost config resource is stored in the space. This leads to unwanted behaviour.");
			callback(config[0]);
		}
	});
}