<?php
/**
 * Created by PhpStorm.
 * User: Nick Stuivenberg
 * Date: 8-11-2017
 * Time: 20:19
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// include database and object file
include_once '../config/database.php';
include_once '../objects/pidgeon.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$pidgeon = new Pidgeon($db);

// get product id
$data = json_decode(file_get_contents("php://input"));

// set product id to be deleted
$pidgeon->id = $data->id;

// delete the product
if($pidgeon->delete()){
    echo '{';
    echo '"message": "Pidgeon was killed."';
    echo '}';
}

// if unable to delete the product
else{
    echo '{';
        echo '"message": "Unable to delete object. Cannot kill the Pidgeon. Theyre taking over the world."';
    echo '}';
}