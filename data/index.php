<?php

require_once("../classes/user.php");
require_once("../classes/file_rest.php");
/* Custom Routers */
if(isset($_GET["login"])&&isset($_GET["callback"])){
	login($_GET["callback"]);
	exit();
}
if(isset($_GET["get_user"])){
	$user = $ucc->loginedUser();
	if($user)$user["editable"] = isEditable();
	echo json_encode($user);
	exit();
}

$config = array(
	"admin"=>"admin"
);
class MyRouter extends FRestRouter 
{
	public function __construct($base){
		parent::__construct($base);
		//Login Actions Here
	}
	public function isEditable(){
		return parent::isEditable() && isEditable();
	}
}

$router = new MyRouter("./json/");
$router->start();
