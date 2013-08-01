<?php
require_once("../classes/UserCenterClient.php");
$ucc = new UserCenterClient("http://www.waterwu.me:3003");

$admin_user = "watert";
function getUser(){
	$user = $ucc->getUser();
	return $user;
}
function login($callback=false){
	$ucc->login($callback);
}
function isEditable(){
	global $admin_user;
	$user = getUser();
	if($user==$admin_user)return true;
}
