/** Example:
<script src="bootstrap.quickform.js"></script>
<form id="test" class="form hide">
	<legend>Hello</legend>
	<label for="">Something</label><input type="text" value="hello">
</form>
<script>
	var dom = $("#test");
	var config = {
		title:"Hello World",
		actions:{
			Save:function(){
				console.log("save");
			},
			Cancel:function(){
				dom.quickmodal("hide");
			}
		}
	};
	dom.quickmodal(config);
</script>
*/
(function($,undefined){
	$.fn.quickmodal = function(config){
		var that = this,
			$el = $(this);
		if(typeof(config)=="string"){ //config is an action
			var domModal = $(that).data("quickmodal");
			if(!domModal)return false;
			switch(config){
				case "data":
					var data = domModal.data("data");
					break;
				default:
					domModal.modal(config);				
			}
			return domModal;
		}

		config = $.extend({
			title:"Title",
			actions:{
				Cancel:function(){
					domModal.modal("hide");
				}
			}
		},config);
		var domdata = {};
		var keys = "data-backdrop,data-keyboard,data-show,data-remove".split(",");
		$.each(keys,function(i,key){
			console.log(key,$el);
			var val = $el.attr(key);
			if(val)domdata[key]=val;
		});
		var domModal = $("<div>",$.extend({"class":"modal hide"},domdata));

		domModal.data("data",config);
		var html = '<div class="modal-header">'
				+'<button type="button" class="close" data-dismiss="modal" '
					+'aria-hidden="true">&times;</button>'
				+'<h3>'+config.title+'</h3></div>'
			+'<div class="modal-body"></div>'
			+'<div class="modal-footer"></div>';
		domModal.html(html);
		domModal.find(".modal-body").append(that);

		//append Actions
		var footer = domModal.find(".modal-footer");
		$.each(config.actions,function(key,value){
			$("<button>",{type:"button",class:"btn","data-action":key,text:key}).click(value).appendTo(footer);
		});
		domModal.modal("show");

		$el.data("quickmodal",domModal).show();
		if(config.callback)config.callback(domModal);
		return domModal;
	};
})(jQuery);