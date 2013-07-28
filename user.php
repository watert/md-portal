<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>
		统一Portal | Markdown based editable Portal.
	</title>
	<script src="libs/jquery-1.7.1.min.js"></script>
	<script src="libs/underscore+backbone.js"></script>
	<!-- Bootstrap -->
	<link rel="stylesheet" href="libs/bootstrap2/css/bootstrap.min.css">
	<link rel="stylesheet" href="libs/bootstrap2/css/bootstrap-responsive.css">
	<script src="libs/bootstrap2/js/bootstrap.min.js"></script>
	<script src="libs/bootstrap.quickform.js"></script>
	<link rel="stylesheet/less" href="libs/bootstrap.mod.less">
	
	<script src="libs/jQuery.lightDataBind.js"></script>
	<script src="libs/marked.js"></script>

	<script src="classes.js"></script>
	<script>
		marked.setOptions({
			breaks:true,
			sanitize:false
		});
		$(function(){
			$("#content").load("layouts/portal.html",function(){
				App.init();
			});
		});
		App.init = (function(){
			var App = window.App;
			var model = App.getModel();
			Router = Backbone.Router.extend({
				routes:{
					"*page":"page"
				},
				page:function(name){
					if(!name)name=false;
					App.getModel().setPage(name);
					// console.log("page");
				}
			});
			App.router = new Router();
			var isNaved = Backbone.history.start({
				// pushState: true, 
				// root: "/page/"
			});
			if(!isNaved)App.router.navigate("root/",{trigger:true});
			$("[data-markdown]").each(function(){
				new App.MDSectionView({el:this,model:model});
			});
			// App.getModel().setPage();
			// model.fetch();
		});
	</script>
	<link rel="stylesheet/less" href="style.less">
	<script src="libs/less-1.2.2.min.js"></script>
</head>
<body>
	<div class="container">
		<h1 class="page-header"> MD-Portal </h1>
		<div id="content"></div>
	</div>

	<!--  Editor Form (Hidden) -->
	<div class="md-edit-form hide" data-backdrop="static" title="Edit Form">
		<form action="" class="form">
			<pre data-text="key"></pre>
			<label for="">Markdown</label>
			<textarea name="content" data-value="content" class="input-block-level" rows="5"></textarea>
		</form>
	</div>
</body>
</html>