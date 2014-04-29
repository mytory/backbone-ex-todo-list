<?php
/**
 * User: mytory
 * Date: 4/29/14
 * Time: 4:05 PM
 */

try{
    $db = new PDO("mysql:dbname=todo;host=127.0.0.1", "todo", "todotodo");
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

