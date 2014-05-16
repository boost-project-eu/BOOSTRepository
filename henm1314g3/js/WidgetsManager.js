function Widget(object){
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
	
	if(object.hasOwnProperty("url"))
		this.url = object.url;
	else
		this.url = "";

}

Widget.prototype.create = function(callback){
	var space = new openapp.oo.Resource(openapp.param.space());
	var thisWidget = this;
	space.create({
		relation: openapp.ns.role + "data",
		type: "my:ns:Widget",
		representation: this, //The representation refers to the object
		callback: function(WidgetResource){
			//Now we have an URI for our Widget and we need to update the resource
			thisWidget.uri = WidgetResource.getURI();
			WidgetResource.setRepresentation(thisWidget, "application/json", function(){
				callback();
			});
		}
	});
}

Widget.prototype.update = function(callback){
	var WidgetResource = new openapp.oo.Resource(this.uri);
	WidgetResource.setRepresentation(this, "application/json", function(){
		callback();
	});
}

Widget.prototype.delete = function(callback){
	openapp.resource.del(this.uri, function(){
		callback();
	});
}

function retrieveAllWidgets(callback){
	retrieveBoostResources("my:ns:Widget", function(object){return new Widget(object)}, callback);
}
