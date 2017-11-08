<?php
/**
 * Created by PhpStorm.
 * User: nstuivenberg
 * Date: 08/11/2017
 * Time: 13:22
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';

// instantiate product object
include_once '../objects/pidgeon.php';

$database = new Database();
$db = $database->getConnection();

$pidgeon = new Pidgeon($db);

$data = json_decode(file_get_contents("php://input"));

$pidgeon->nickname = $data->nickname;
$pidgeon->countryOfOrigin = $data->countryOfOrigin;
$pidgeon->birthyear = $data->birthyear;
$pidgeon->ringnumber = $data->ringnumber;
$pidgeon->sex = $data->sex;

if($pidgeon->create()) {
    echo '{';
        echo '"message": "Pidgeon was created"';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to create pidgeon."';
    echo '}';
}
