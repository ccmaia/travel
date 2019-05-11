<?php
/**
 * Created by PhpStorm.
 * User: ganggang
 * Date: 2018/9/25
 * Time: 21:08
 */

require "connectMysql.php";
$con = connectDB("localhost","root","","travel");
$type = $_POST["type"];
$tonum = $_POST["tonum"];
$beginnum = $_POST["beginnum"];
if($type=="hot"){
    //$sql = "SELECT * FROM hottravel LIMIT 0,5";
    $sql = "select * from hottravel order by time desc";
    $res = sel($con,$sql);
    if($res){
        echo json_encode(array(
            "status" => 1,
            "List" => $res,
        ));
    }else{
        echo json_encode(array(
            "status" => 0,
            "List" => []
        ));
    }
}else if ($type=="star"){
    $sql = "select * from startravel LIMIT {$beginnum},{$tonum}";
    $res = sel($con,$sql);

    if($res){
        echo json_encode(array(
            "status" => 1,
            "List" => $res,
        ));
    }else{
        echo json_encode(array(
            "status" => 0,
            "List" => []
        ));
    }
}

