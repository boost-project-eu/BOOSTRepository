$.prototype.tree = function(){
	var tree = $(this);
	tree.find('li:has(ul)').addClass('parent_li').find(' > span p:first-child').append("<span class='glyphicon glyphicon-collapse-down pull-right'></span>")
	tree.find('li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
	tree.find('li.parent_li > ul > li').hide();
	tree.find('li.parent_li > span').on('click', function (e) {
	    var children = $(this).parent('li.parent_li').find(' > ul > li');
	    if (children.is(":visible")) {
	        children.hide('fast');
	        $(this).find("p:first-child .glyphicon-collapse-up").removeClass("glyphicon-collapse-up").addClass("glyphicon-collapse-down");
	    } else {
	        children.show('fast');
	        $(this).find("p:first-child .glyphicon-collapse-down").removeClass("glyphicon-collapse-down").addClass("glyphicon-collapse-up");
	    }
	    e.stopPropagation();
	    });
}