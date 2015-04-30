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
	var newRights = {};
	if(userUri === undefined)
		var userUri = openapp.param.user();
	
	_.each(this.userRights, function(n, key){
		if(decodeURIComponent(key) == decodeURIComponent(userUri))
		{	
			newRights = n;
		}
	});

	if(_.isEmpty(newRights)){
		newRights.isManager = false;
		newRights.isEmployee = true;
		newRights.hasAgreedToLicense = false;
		this.userRights[userUri] = newRights;
		return newRights;
	}
	else {
		return newRights;
	}
}

AccessRights.prototype.updateonly = function(callback){
	//If resource was not created, create it instead
	var boostResource = new openapp.oo.Resource(this.uri);
	boostResource.setRepresentation(this, "application/json", function(){
		callback();
	});
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
			title : translations.STR_SORRY_THE_LICENSE_FOR_BOOST_WAS,
			message : translations.STR_BEFORE_PROCEEDING_YOU_MUST_FIRST,
			closeButton : false
			});
	return;
}

function showModalContactManager(){
	bootbox.dialog({
			title : translations.STR_SORRY_YOU_DO_NOT_HAVE_RIGHTS,
			message : translations.STR_BEFORE_PROCEEDING_PLEASE_CONTACT,
			closeButton : false
			});
	return;
}

