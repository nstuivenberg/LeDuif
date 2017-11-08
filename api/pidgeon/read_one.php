<?php
/**
 * Created by PhpStorm.
 * User: nstuivenberg
 * Date: 08/11/2017
 * Time: 15:41
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/pidgeon.php';

$database = new Database();
$db = $database->getConnection();

$pidgeon = new Pidgeon($db);

$pidgeon->id = isset($_GET['id']) ? $_GET['id'] : die();

$pidgeon->readOne();

$pidgeon_arr = array(
    "id" => $pidgeon->id,
    "nickname" => $pidgeon->nickname,
    "countryOfOrigin" => $pidgeon->countryOfOrigin,
    "birthyear" => $pidgeon->birthyear,
    "ringnumber" => $pidgeon->ringnumber,
    "sex" => $pidgeon->sex
);

//make it JSON
print_r(json_encode($pidgeon_arr));