<?php
require_once("../classes/UserCenterClient.php");
class MyUCC extends UserCenterClient {
	function getUser(){
		return parent::getUser(); //includes SESSION & SSO
	}
}
$ucc = new MyUCC("http://www.waterwu.me:3003");

$admin_user = "watert";
function getUser(){
	global $ucc;
	$user = $ucc->getUser();
	return $user;
}
function login($callback=false){
	global $ucc;
	// print_r($callback);exit();
	$ucc->login($callback);
}
function isEditable(){
	$user = getUser();
	if($user==$admin_user)return true;
}
