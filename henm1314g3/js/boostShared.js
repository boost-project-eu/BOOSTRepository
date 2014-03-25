function retrieveBoostResources(typeName, constructorFunction, callback){
	var space = new openapp.oo.Resource(openapp.param.space());
	space.getSubResources({
		relation: openapp.ns.role + "data",
		type: typeName,
		onAll: function(resources) {
					/*
						Be careful here. The getRepresentation(...) function runs
						asynchronously. This means that the whole for loop is finished
						before even one resource has been added to the array. To get informed
						when the array is finished I used this callback mechanism in the
						if block. 
					*/
					var resourcesList = [];
					if(resources.length == resourcesList.length)
							callback(resourcesList);
					for(var i = 0; i < resources.length; i++){
						resources[i].getRepresentation("rdfjson", function(resourceObject){
						resourcesList.push(constructorFunction(resourceObject));
						if(resources.length == resourcesList.length){
							callback(resourcesList);

						}
						
						});
					}
				}
	});
}