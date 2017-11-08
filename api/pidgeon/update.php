<?php
/**
 * Created by PhpStorm.
 * User: Nick Stuivenberg
 * Date: 8-11-2017
 * Time: 19:42
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/pidgeon.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

$pidgeon = new Pidgeon($db);

$data = json_decode(file_get_contents("php://input"));

$pidgeon->id = $data->id;

$pidgeon->nickname = $data->nickname;



if($pidgeon->update()){
    echo '{';
        echo '"message": "Pidgeon was updated."';
    echo '}';
}

// if unable to update the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to update pidgeon. Poor thing!"';
    echo '}';
}