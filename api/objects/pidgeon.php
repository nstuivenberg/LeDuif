<?php
/**
 * Created by PhpStorm.
 * User: nstuivenberg
 * Date: 01/11/2017
 * Time: 16:03
 */

class Pidgeon
{
    private $conn;
    private $table_name = "pidgeon";

    //Object properties
    public $id;
    public $nickname;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read() {
        $query = "SELECT
                p.id, p.nickname
            FROM
                " . $this->table_name . " p";


        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function create() {
        $query = "INSERT INTO " . $this->table_name . " SET nickname=:nickname";

        $stmt = $this->conn->prepare($query);

        //sanitize
        $this->nickname=htmlspecialchars(strip_tags($this->nickname));

        //bind
        $stmt->bindParam(":nickname", $this->nickname);

        if($stmt->execute()) {
            return true;
        } else {
            return false;
        }

    }

    //Does NOT check if exists, will give ID number via get and a null then
    function readOne() {
        $query = "SELECT p.id, p.nickname FROM "
        .$this->table_name. " p WHERE p.id = ? LIMIT 0,1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->nickname = $row['nickname'];

    }

    // Currently updates by sending an object with ID to the server.
    function update(){

        // update query
        $query = "UPDATE " . $this->table_name . " SET nickname = :nickname 
        WHERE id = :id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->nickname=htmlspecialchars(strip_tags($this->nickname));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':nickname', $this->nickname);
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if($stmt->execute()){
            return true;
        } else {
            return false;
        }
    }

    // Sends json-object with ID to the specified url and deletes the pidgeon.
    // Will give success message even when there's no ID to delete.
    function delete() {
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind id of record to delete
        $stmt->bindParam(1, $this->id);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;
    }
}