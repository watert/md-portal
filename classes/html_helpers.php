<?php
// echo dirname(__FILE__)."<br>".($_SERVER['DOCUMENT_ROOT']);
// echo "<br>".substr(dirname(__FILE__),strlen($_SERVER['DOCUMENT_ROOT']));
// echo "<br>".dirname($_SERVER['SCRIPT_NAME']);
// echo "<pre>";print_r($_SERVER);exit();

function baseurl(){
	// $approot = substr(dirname(__FILE__),strlen($_SERVER['DOCUMENT_ROOT']));
	$approot = dirname($_SERVER["SCRIPT_NAME"]);
	return sprintf(
	    "%s://%s%s/",
	    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
	    $_SERVER['HTTP_HOST'],
	    $approot
	);
}