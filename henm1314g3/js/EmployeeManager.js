// descriptions of learning levels used for tooltips.
	llevel = [];
	llevel[0] = 0;
	llevel[1] = 1;
	llevel[2] = 2;
	llevel[3] = 3;
	llevel[4] = 4;
	llevel[5] = 5;

Employee.prototype = new BoostObject({});

Employee.prototype.getTypeName = function(){
	return "employee";
}

function Employee(object){
	BoostObject.call(this, object);

	if(object && object.hasOwnProperty("name"))
		this.name = object.name;
	else
		this.name = "";

	if(object && object.hasOwnProperty("email"))
		this.email = object.email;
	else
		this.email = "";

	if(object && object.hasOwnProperty("learningLevels"))
		this.learningLevels = object.learningLevels;
	else
		this.learningLevels = {};

	if(object && object.hasOwnProperty("userUri"))
		this.userUri = object.userUri;
	else
		this.userUri = "";
}

Employee.prototype.clone = function(){
	var clone = JSON.parse(JSON.stringify(this));
	return new Employee(clone);
}

function createEmployeefromUri(uri, callback){
	var employeeResource = new openapp.oo.Resource(uri);

	employeeResource.getRepresentation("rdfjson", function(employeeObject){
		callback(employeeObject);
	});
}

function createEmployeeFromUser(user, bcns, callback){
	employee = new Employee({
		name : user.name,
		email : user.email,
		userUri : user.uri
	});

	ensureEmplyoeeBCNConsistency(employee, bcns, []);

	employee.create(function(){
		callback(employee)
	});
}

function retrieveAllEmployees(space, callback){
	retrieveBoostResources("my:ns:employee", function(object){return new Employee(object)}, callback);
}

function ensureEmplyoeeBCNConsistency(employee, bcnsToUpdate, bcnsToRemove){
	//Add learning levels for new/updated BCNs
	var d = new Date();
	for(var i = 0; i < bcnsToUpdate.length; i++){
		var bcn = bcnsToUpdate[i];

		if(!employee.learningLevels.hasOwnProperty(bcn.uri)){
			employee.learningLevels[bcn.uri] = {};
			employee.learningLevels[bcn.uri].isRelevant = false;
			employee.learningLevels[bcn.uri].startDate = moment().format("MM/DD/YYYY");
			employee.learningLevels[bcn.uri].endDate = moment().format("MM/DD/YYYY");
		}
		if(!employee.learningLevels[bcn.uri].hasOwnProperty("isRelevant"))
			employee.learningLevels[bcn.uri].isRelevant = false;
		if(!employee.learningLevels[bcn.uri].hasOwnProperty("startDate"))
			employee.learningLevels[bcn.uri].startDate = moment().format("MM/DD/YYYY");
		if(!employee.learningLevels[bcn.uri].hasOwnProperty("endDate"))
			employee.learningLevels[bcn.uri].endDate = moment().format("MM/DD/YYYY");
		var learningLevel = employee.learningLevels[bcn.uri];
		for(var j = 0; j < bcn.learningIndicators.length; j++){
			var li = bcn.learningIndicators[j];
			if(!learningLevel.hasOwnProperty(li.id)){
				learningLevel[li.id] = {};
				learningLevel[li.id].start = 0;
				learningLevel[li.id].current = 0;
				learningLevel[li.id].end = llevel.length -1
				learningLevel[li.id].isRelevant = false;
				learningLevel[li.id].startDate = moment().format("MM/DD/YYYY");
				learningLevel[li.id].endDate = moment().format("MM/DD/YYYY");

			}
			else{ //Quick fix to update old employee data. To be removed later on
				if(!learningLevel[li.id].hasOwnProperty("isRelevant"))
					learningLevel[li.id].isRelevant = false;
			}
		}
	}

	//Remove bcns
	for(var i = 0; i < bcnsToRemove.length; i++){
		var bcn = bcnsToRemove[i];
		if(employee.learningLevels.hasOwnProperty(bcn.uri))
			delete employee.learningLevels[bcn.uri];
	}
}

function filterEmployeesBasedOnAccessRights(employees, accessRights){
	var filteredEmployeeList = [];
	for(var i = 0; i < employees.length; i++){
		var employee = employees[i];
		access = accessRights.getUserAccessRights(employee.userUri)

		//in new logik, we do not need it
		// if(access.isEmployee)
		filteredEmployeeList.push(employee);
	}
	return filteredEmployeeList;
}

function compareUserEmployees(employees, users){
	var userUris = [];
	var newEmployees = [];
	_.each(users, function(user){
		_.each(employees, function(employee){
			if (user.uri == employee.userUri){
				if (!_.contains(userUris, user.uri))
				{	
					newEmployees.push(employee);
					userUris.push(user.uri);
				};
			}
		});
	});
	return newEmployees;
}





