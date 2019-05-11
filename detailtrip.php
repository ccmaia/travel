<?php
/**
 * Created by PhpStorm.
 * User: ganggang
 * Date: 2018/9/25
 * Time: 21:08
 */

require "connectMysql.php";
$con = connectDB("localhost","root","","travel");
$userId = $_POST["userId"];
$tripId = $_POST["tripId"];
//$sql = "SELECT * FROM hottravel LIMIT 0,5";
$sql = "select * from detailtravellist where userId = {$userId} AND tripId = {$tripId}";
$basemsg = "SELECT * FROM hottravel where tripId = {$tripId}";
$res = sel($con,$sql);
$baseres = sel($con,$basemsg);
$days = count($res);
$comment = "select * from commentTable where tripUserId = {$userId} AND tripId = {$tripId}";
$comentData = sel($con,$comment);
$updata = "UPDATE hottravel SET day = {$days} WHERE tripId = {$tripId} ";
$dayres = cha($con,$updata);

if($res){
    echo json_encode(array(
        "status" => 1,
        "dataList" => $res,
        "basemsg" => $baseres,
        "updata" => $dayres,
        "commentList" => $comentData
    ));
}else{
    echo json_encode(array(
        "status" => 0,
        "dataList" => [],
        "basemsg" => []
    ));
}


