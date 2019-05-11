<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/4/22
 * Time: 9:15
 */

//$userName = $_GET["name"];
//$userAge = $_GET["age"];
//
////echo "你好".$userName.",年龄".$userAge;
////json_encode：数组转json格式的字符串
////json_decode：json格式的字符串转数组
//echo json_encode(array(
//    "n"=>$userName,
//    "a"=>$userAge
//));


//1、连接数据库的服务器
//参数1：数据库所在服务器的域名，参数2：登录数据库的用户名，参数3：登录密码
$con = mysqli_connect("localhost:3306","root","") or die(mysqli_connect_error());

//2、选择要连接的数据库
$dataBase = mysqli_select_db($con,"travel") or die(mysqli_connect_error());

//3、设置编码格式
//mysqli_query:执行语句
mysqli_query($con,"set names utf8");

$type = $_GET["type"];

//4、编写SQL语句

    $sqlhot = "SELECT * FROM hottravel WHERE type = 1 AND open = 0";

    $sqlstar = "SELECT * FROM hottravel WHERE type = 2 AND open = 0";



//5、执行SQL语句,并接受结果
$result1 = mysqli_query($con,$sqlhot);
$result2 = mysqli_query($con,$sqlstar);

//6、把结果放进数组
//mysqli_fetch_assoc($result)从$result中取数据
$arr1 = array();
while($row = mysqli_fetch_assoc($result1)){
    array_push($arr1,$row);
}
$arr2 = array();
while($row = mysqli_fetch_assoc($result2)){
    array_push($arr2,$row);
}

//7、把从数据库中取到的数组返回给前端
echo json_encode(array(
    "status" => 0,
    "msg"=>"登陆成功",
    "isLogin" => true,
    "hotdata" => $arr1,
    "stardata" => $arr2
));
