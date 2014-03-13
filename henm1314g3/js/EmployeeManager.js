// descriptions of learning levels used for tooltips.
	llevel = [];
	llevel[0] = "0";
	llevel[1] = "1";
	llevel[2] = "2";
	llevel[3] = "4";
	llevel[4] = "5";

function Employee(object){
	if(object.hasOwnProperty("uri"))
		this.uri = object.uri;
	else
		this.uri = "";

	if(object.hasOwnProperty("name"))
		this.name = object.name;
	else
		this.name = "";

	if(object.hasOwnProperty("email"))
		this.email = object.email;
	else
		this.email = "noemail@example.com";

	if(object.hasOwnProperty("learningLevels"))
		this.learningLevels = object.learningLevels;
	else
		this.learningLevels = {};
}

Employee.prototype.create = function(callback){
	var space = new openapp.oo.Resource(openapp.param.space());
	var thisEmployee = this;
	space.create({
		relation: openapp.ns.role + "data",
		type: "my:ns:employee",
		representation: this, //The representation refers to the object
		callback: function(employeeResource){
			//Now we have an URI for our Employee and we need to update the resource
			thisEmployee.uri = employeeResource.getURI();
			employeeResource.setRepresentation(thisEmployee, "application/json", function(){
				callback();
			});
		}
	});
}

Employee.prototype.update = function(callback){
	var employeeResource = new openapp.oo.Resource(this.uri);
	employeeResource.setRepresentation(this, "application/json", function(){
		callback();
	});
}

Employee.prototype.delete = function(callback){
	openapp.resource.del(this.uri, function(){
		callback();
	});
}

function deleteEmployee(employee, callback){
	openapp.resource.del(employee.uri, function(){
		callback();
	});
}

function createEmployeefromUri(uri, callback){
	var employeeResource = new openapp.oo.Resource(uri);

	employeeResource.getRepresentation("rdfjson", function(employeeObject){
		callback(employeeObject);
	});
}

function saveEmployee(employee, space, callback){
	//Check consistency
	if(!employee.hasOwnProperty("name"))
		throw("employee object has no name");
	if(!employee.hasOwnProperty("email"))
		throw("employee object has no email");
	if(!employee.hasOwnProperty("learningLevels"))
		throw("employee object has no learningLevels");
	employee.uri = "";	
	//Here we create the resource. The BCN gets stored in the space.
	space.create({
		relation: openapp.ns.role + "data",
		type: "my:ns:employee",
		representation: employee, //The representation refers to the object
		callback: function(employeeResource){
			//Now we have an URI for our BCN and we need to update the resource
			employee.uri = employeeResource.getURI();
			employeeResource.setRepresentation(employee, "application/json", function(){
				callback(employee);
			});
		}
	});
}

function updateEmployee(employee, callback){
	employeeResource = new openapp.oo.Resource(employee.uri);
	employeeResource.setRepresentation(employee, "application/json", function(){
		callback();
	});
}

function retrieveAllEmployees(space, callback){
	retrieveBoostResources("my:ns:employee", function(object){return new Employee(object)}, callback);
}

function ensureEmplyoeeBCNConsistency(employee, bcn){
	if(!employee.learningLevels.hasOwnProperty(bcn.uri)){
		employee.learningLevels[bcn.uri] = {};
		employee.learningLevels[bcn.uri].isRelevant = true;
	}
	if(!employee.learningLevels[bcn.uri].hasOwnProperty("isRelevant"))
		employee.learningLevels[bcn.uri].isRelevant = true;
	var learningLevel = employee.learningLevels[bcn.uri];
	for(var j = 0; j < bcn.learningIndicators.length; j++){
		var li = bcn.learningIndicators[j];
		if(!learningLevel.hasOwnProperty(li.id)){
			learningLevel[li.id] = {};
			learningLevel[li.id].start = 0;
			learningLevel[li.id].current = 0;
			learningLevel[li.id].end = llevel.length -1;
		}
	}
}
