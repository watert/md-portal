<?php
$config = array(
	"admin"=>"admin"
	);

require_once("../classes/file_rest.php");
if($_SERVER["REQUEST_METHOD"]!="GET" ){
	require_once("../classes/user.php");
	if( !isEditable() )exit("Auth failed for editing."); 
}
else if(isset($_GET["login"])&&isset($_GET["callback"])){
	require_once("../classes/user.php");
	login($_GET["callback"]);
}
else if(isset($_GET["get_user"])){
	require_once("../classes/user.php");
	echo json_encode(getUser());
}else {

	$frh = new FRestHTTP("./json/");
	$frh->set_request();	
}