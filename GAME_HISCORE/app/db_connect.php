<?php
//Establish connection: host, user, password, database
$dbi = mysqli_connect("localhost","###","###","###");
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
?>