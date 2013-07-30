<?php
$config = array(
	"admin"=>"admin"
	);

require_once("../classes/file_rest.php");
if(isset($_GET["login"])&&isset($_GET["callback"])){
	require_once("../classes/user.php");
	login($_GET["callback"]);
}
else if(isset($_GET["get_user"])){
	require_once("../classes/user.php");
	$user = $ucc->loginedUser();
	$user["editable"] = isEditable();
	echo json_encode($user);
}else {

	if($_SERVER["REQUEST_METHOD"]!="GET" ){
		require_once("../classes/user.php");
		if( !isEditable() )exit("Auth failed for editing."); 
	}
	$frh = new FRestHTTP("./json/");
	$frh->set_request();	
}