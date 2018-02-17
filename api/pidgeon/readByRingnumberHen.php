<?php
/**
 * Created by PhpStorm.
 * User: Nick Stuivenberg
 * Date: 17-2-2018
 * Time: 18:15
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



$pidgeon->ringnumber = isset($_GET['ringnumber']) ? $_GET['ringnumber'] : die();

$pidgeon->readRingnumberHen();

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