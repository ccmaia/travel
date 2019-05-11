<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/1
 * Time: 17:31
 */
require "connectMysql.php";
$con = connectDB("localhost","root","","travel");
$createType = $_POST["type"];
$userId = $_POST["userId"];

if($createType == "travel"){
    $title = $_POST["title"];
    $address = $_POST["address"];
    $open = $_POST["open"];
    $titleImg = $_POST["titleImg"];
    date_default_timezone_set('prc');
    $time = date("Y.m.d");
    $selUser = "SELECT logo,user FROM usertable where id = {$userId}";
    $usermsg = sel($con,$selUser);
    $userLogo = $usermsg[0]["logo"];
    $userName = $usermsg[0]["user"];
    $sql = "INSERT INTO hottravel VALUES ('','{$title}','{$time}',1,'{$address}','{$titleImg}','{$userLogo}',0,{$open},{$userId},'{$userName}',0)";
    $res = cha($con,$sql);
//  获取插入的数据的id
   $tripId = mysqli_insert_id($con);
    if($res){
        $detailsql = "INSERT INTO detailtravellist VALUES ('',{$tripId},{$userId},'{$time}','{$titleImg}','{$address}')";
        $detailres = cha($con,$detailsql);
        if($detailres){
            echo json_encode(array(
                "status" => 1,
                "msg"=>"发送成功",
            ));
        }
    }
}elseif ($createType == "note"){
    $tripId = $_POST["tripId"];
    $img = $_POST["img"];
    $text = $_POST["text"];
    date_default_timezone_set('prc');
    $time = date("Y.m.d");
    $sql = "INSERT INTO detailtravellist VALUES ('',{$tripId},{$userId},'{$time}','{$img}','{$text}')";
    $res = cha($con,$sql);
    if($res){
        echo json_encode(array(
            "status" => 1,
            "msg"=>"发送成功",
        ));
    }

}elseif ($createType == "addLike"){
    $imgList = $_POST["img"];
    if(strlen($imgList) == 0){
        $imgList = "http://b4-q.mafengwo.net/s11/M00/CC/E8/wKgBEFtHMyyAbBV_AAd7XUc1uo8866.png?imageMogr2%2Fthumbnail%2F%21300x180r%2Fgravity%2FCenter%2Fcrop%2F%21300x180%2Fquality%2F90";
    }
    $placeName = $_POST["placeName"];
    $sql = "INSERT INTO wantgoplace VALUES ('',{$userId},'{$imgList}','{$placeName}')";
    $res = cha($con,$sql);
    if($res){
        echo json_encode(array(
            "status" => 1,
            "msg"=>"添加成功",
        ));
    }
}elseif ($createType == "searchPlace"){
    $searchMsg = $_POST["searchMsg"];
    $sql = "SELECT * FROM hottravel WHERE address LIKE \"%$searchMsg%\" order by time desc";
    $res = sel($con,$sql);
    echo json_encode(array(
        "status" => 1,
        "msg"=>"查询成功",
        "data" => $res
    ));
}elseif ($createType == "searchUse"){
    $searchMsg = $_POST["searchMsg"];
    $sql = "SELECT * FROM usertable WHERE user LIKE '{$searchMsg}'";
    $res = sel($con,$sql);

    echo json_encode(array(
        "status" => 1,
        "msg"=>"查询成功",
        "data" => $res
    ));
}elseif ($createType == "reduce"){
    $tripId = $_POST["tripId"];
    $sql = "DELETE FROM hottravel WHERE tripId = {$tripId}";
    $res = mysqli_query($con,$sql);
    echo json_encode(array(
        "status" => 1,
        "msg"=>"删除成功"
    ));


}