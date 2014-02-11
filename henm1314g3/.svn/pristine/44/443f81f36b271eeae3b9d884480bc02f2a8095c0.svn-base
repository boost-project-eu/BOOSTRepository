var testBCN;
module("BCNManager Tests", {
	setup: function(){
		testBCN = {};
		testBCN.name = "TestBcnName";
		testBCN.description = "TestBcnDescription";
		testBCN.learningIndicators = [];
		var li = {};
		li.id = 0;
		li.name = "TestLi";
		testBCN.learningIndicators.push(li);
	}
});

test("saveBCNConsistencyNoName", function(){
	expect(1);
	delete testBCN.name;
	throws(function(){ saveBCN(testBCN, space, null)}, /name/, "bcn needs a name");
});

test("saveBCNConsistencyNoDescription", function(){
	expect(1);
	delete testBCN.description;
	throws(function(){ saveBCN(testBCN, space, null)}, /description/, "bcn needs a description'");
});

test("saveBCNConsistencyNolearningIndicators", function(){
	expect(1);
	delete testBCN.learningIndicators;
	throws(function(){ saveBCN(testBCN, space, null)}, /learningIndicators/, "bcn needs a learningIndicators property");
});

test("saveBCNConsistencyLearningIndicatorsNoArray", function(){
	expect(1);
	testBCN.learningIndicators = {};
	throws(function(){ saveBCN(testBCN, space, null)}, "bcn.learningIndicators needs to be an array");
});

test("saveBCNConsistencyNoLearningIndicatorsDefined", function(){
	expect(1);
	testBCN.learningIndicators = [];
	throws(function(){ saveBCN(testBCN, space, null)}, "at least one LI needs to be defined");
});