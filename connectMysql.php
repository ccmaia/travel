<?php
/**
 * Created by PhpStorm.
 * User: ganggang
 * Date: 2018/9/25
 * Time: 21:14
 */

function connectDB($ip,$user,$pass,$db){
    $con = mysqli_connect($ip,$user,$pass) or die(mysqli_connect_error());
    mysqli_select_db($con,$db);
    mysqli_query($con,"set names utf8");

    return $con;
}

function sel($con,$sql){
    $result = mysqli_query($con,$sql);
    $arr = array();
    while($row = mysqli_fetch_assoc($result)){
        array_push($arr,$row);
    }
    return $arr;
}
function cha($con,$sql){
    mysqli_query($con,$sql);

    if (mysqli_affected_rows($con) > 0){ // 数据表数据受影响的行数
        return true; // 执行成功
    } else {
        return false;
    }
}