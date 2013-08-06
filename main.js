$(function(){
	// init model and set page actions
	var model = App.getModel();
	var initPage = function(){
		App.initPage($("#content"),function(){
			$("h1:eq(0)").text(model.get("title"));
		});
	};
	model.on("beforeSetPage",function(){ $("h1:eq(0)").text("loading..."); });
	model.on("setPage",initPage);

	// Set Form for editing Page contents
	var pageForm = $("#pageForm").modal({show:false});
	model.on("change",function(){
		pageForm.ldata(this.toJSON());
	});
	function saveForm(e){
		e.preventDefault();
		model.set( pageForm.ldata() )
			.save({},{
				success:function(){
					initPage();
					pageForm.modal("hide");
				}
			});
	};
	pageForm.on("click",".btn-save",saveForm);
	pageForm.on("submit","form",saveForm);
	$(document).on("click",".btn-edit-page",function(e){
		pageForm.modal("show");
	});
	// Init router
	App.router = new App.PageRouter();
	App.router.on("all",function(e,a,b){
		console.log(e,a,b);
	});
	var base = $("base").attr("href").replace(location.origin,"");
	Backbone.history.start({root:base,pushState: true});

});