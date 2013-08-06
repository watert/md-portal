<?php require_once("classes/html_helpers.php"); ?>
<!doctype html>
<html lang="en"> 
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0">
	<base href="<?=baseurl();?>">
	<title>
		统一Portal | Markdown based editable Portal.
	</title>
	<script src="libs/jquery-1.7.1.min.js"></script>
	<script src="libs/underscore+backbone.js"></script>
	<!-- Bootstrap -->
	<link rel="stylesheet" href="libs/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="libs/bootstrap/css/bootstrap-responsive.css">
	<link rel="stylesheet" href="libs/bootstrap/css/font-awesome.css">
	<script src="libs/bootstrap/js/bootstrap.min.js"></script>
	<script src="libs/bootstrap.quickform.js"></script>
	<link rel="stylesheet" href="libs/bootstrap.mod.css">
	
	<script src="libs/jQuery.lightDataBind.js"></script>
	<script src="libs/marked.js"></script>

	<script src="classes.js"></script>
	<script src="main.js"></script>
	<script>
		$(function(){
			$("body").addClass("page-editable");
		});
	</script>
	
	<link rel="stylesheet" href="style.css">
	<!-- <link rel="stylesheet/less" href="style.less">
	<script src="libs/less-1.4.2.min.js"></script>  -->
</head>
<body>
	<div id="header">
		<div class="container">
			<h1 class="page-header"> </h1>
		</div>
	</div>
	<div class="container">
		<!-- <a class="pull-right linkLogin" href="data/?login&callback=">Login</a> -->
		<div id="content"></div>
		<div id="footer">
			<hr>
			Made by @waterwu. 
			<span class="page-actions">
				<a href="javascript:void(0)" class="btn-edit-page">Edit Page</a>
			</span>
		</div>
	</div>

	<!--  Editor Form (Hidden) -->
	<div class="md-edit-form hide" data-backdrop="static" title="Edit Form">
		<form action="" class="form">
			<pre data-text="key"></pre>
			<label for="">Markdown</label>
			<textarea name="content" data-value="content" class="input-block-level" rows="5"></textarea>
		</form>
	</div>
	<!--  Page Edit Form (Hidden) -->
	<div id="pageForm" class="modal hide fade">
	    <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h3>Edit Page</h3>
	    </div>
	    <div class="modal-body">
			<form class="form-horizontal">
			    <fieldset>
			    	<div class="control-group">
			    		<label for="" class="control-label">Page Title</label>
			    		<div class="controls"><input type="text" data-value="title"></div>
			    	</div>
			    	<div class="control-group">
			    		<label for="" class="control-label">Layout</label>
			    		<div class="controls">
			    			<select name="layout" data-value="layout" id="">
			    				<option value="portal">Portal</option>
			    				<option value="article">Article</option>
			    			</select>
			    		</div>
			    	</div>		    
			    </fieldset>
			</form>
	    </div>
	    <div class="modal-footer">
	        <a href="javascript:void(0)" class="btn">Close</a>
	        <a href="javascript:void(0)" class="btn-save btn btn-primary">Save changes</a>
	    </div>
	</div>

</body>
</html>