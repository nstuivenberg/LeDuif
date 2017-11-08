<?php
/**
 * Created by PhpStorm.
 * User: nstuivenberg
 * Date: 01/11/2017
 * Time: 16:07
 */


// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/pidgeon.php';

$database = new Database();
$dbConnection = $database->getConnection();

$pidgeon = new Pidgeon($dbConnection);

//query products
$stmt = $pidgeon->read();
$num = $stmt->rowCount();

//check if more than one record found
if($num>0) {
    $products_arr = array();
    $products_arr["pidgeons"] = array();

    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        // https://stackoverflow.com/questions/37469048/build-json-object-using-database-relations-foreign-key-php

        $pidgeon_dbItem = array(
            "id" => $id,
            "nickname" => $nickname
        );
        array_push($products_arr["pidgeons"], $pidgeon_dbItem);
    }
    echo json_encode($products_arr);

} else {
    echo json_encode(
        array("message" => "No products found.")
    );
}
