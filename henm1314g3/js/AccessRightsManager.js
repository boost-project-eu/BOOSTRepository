AccessRights.prototype = new BoostObject({});

AccessRights.prototype.getTypeName = function(){
	return "accessRights";
}

function AccessRights(object){
	BoostObject.call(this, object);

	if(object.hasOwnProperty("userRights"))
		this.userRights = object.userRights;
	else
		this.userRights = {};
}

AccessRights.prototype.getUserAccessRights = function(userUri){
	//If no user uri is defined we just use the current user
	if(userUri === undefined)
		var userUri = openapp.param.user();

	if(this.userRights.hasOwnProperty(userUri))
		return this.userRights[userUri];
	else{
		var newRights = {};
		newRights.isManager = false;
		newRights.isEmployee = true;
		newRights.hasAgreedToLicense = false;
		this.userRights[userUri] = newRights;
		return newRights;
	}
}

function retrieveAccessRights(callback){
	retrieveBoostResources("my:ns:accessRights", function(object){return new AccessRights(object)}, function(accessRights){
		if(accessRights.length == 0)
			callback(new AccessRights({}));
		else{
			if(accessRights.length > 1){
				console.log("Warning: More than one boost access rights resource is stored in the space. This leads to unwanted behaviour.");
			}
			callback(accessRights[0]);
		}
	});
}

function showModalAcceptTermsOfUse(){
	bootbox.dialog({
			title : "Sorry, the license for BOOST was not accepted",
			message : "Before proceeding you must first launch BOOST Welcome Widget and accept the End User License Agreement",
			closeButton : false
			});
	return;
}

function showModalContactManager(){
	bootbox.dialog({
			title : "Sorry, you do not have rights to access this widget",
			message : "Before proceeding please contact your manager or administrator",
			closeButton : false
			});
	return;
}

