<?php
require_once("../classes/file_rest.php");
class MyRouter extends FRestRouter 
{
	public function __construct($base){
		parent::__construct($base);
		//Login Actions Here
	}
	public function isEditable(){
		$editable = parent::isEditable();
		// Editing Authentification
		return $editable;
	}
}

$router = new MyRouter("./json/");
$router->start();
