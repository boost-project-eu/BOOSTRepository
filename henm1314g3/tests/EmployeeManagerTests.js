var testEmployee;
module("EmployeeManager Tests", {
	setup: function(){
		testEmployee = {};
		testEmployee.name = "TestEmployee";
		testEmployee.email = "mail@example.com";
		testEmployee.learningLevels = {};
	}
});

test("saveEmployeeConsistencyNoName", function(){
	expect(1);
	delete testEmployee.name;
	throws(function(){ saveEmployee(testEmployee, space, null)}, /name/, "employee needs a name");
});

test("saveEmployeeConsistencyNoEmail", function(){
	expect(1);
	delete testEmployee.email;
	throws(function(){ saveEmployee(testEmployee, space, null)}, /email/, "employee needs a name");
});

test("saveEmployeeConsistencyNoLearningLevels", function(){
	expect(1);
	delete testEmployee.learningLevels;
	throws(function(){ saveEmployee(testEmployee, space, null)}, /learningLevels/, "employee needs learningLevels");
});