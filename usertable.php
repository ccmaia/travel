<?php
/**
 * Created by PhpStorm.
 * User: ganggang
 * Date: 2018/9/25
 * Time: 21:08
 */

require "connectMysql.php";
$con = connectDB("localhost","root","","travel");

$how = $_POST["type"];


if($how == "login"){
    $user = $_POST["user"];
    $pass = $_POST["pass"];
    //\"转义
    $sql = "SELECT * FROM usertable WHERE user = \"".$user."\" AND pass = \"".$pass."\"";
    $res = sel($con,$sql);
    if($res){
        echo json_encode(array(
            "status" => 1,
            "msg"=>"登陆成功",
            "isLogin" => true,
            "data" => $res[0]
        ));
    }else{
        echo json_encode(array(
            "status" => 0,
            "msg"=>"登陆失败",
            "isLogin" => false,
            "data" => ""
        ));
    }
}else if($how == "register"){
    $user = $_POST["user"];
    $pass = $_POST["pass"];
    $email = $_POST["email"];
    $logo = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2923813511,4227634187&fm=27&gp=0.jpg";
    $sql = "INSERT INTO usertable (id,user,pass,email,logo,focus,fans) VALUES (\"\",\"".$user."\",\"".$pass."\",\"".$email."\",\"".$logo."\",0,0)";
    $res = cha($con,$sql);
    if($res){
        echo json_encode(array(
            "status" => 1,
            "msg"=>"注册成功"
        ));
    }else{
        echo json_encode(array(
            "status" => 0,
            "msg"=>"注册失败",
            "data"=>array(
                "user" => $user,
                "pass"=>$pass,
                "sql"=>$sql
            )
        ));
    }
}else if($how == "fasong"){
    $commentuserId = $_POST["commentuserId"];
    $tripId = $_POST["tripId"];
    $tripUserId = $_POST["userId"];
    $content = $_POST["content"];
    date_default_timezone_set('prc');
    $time = date("Y-m-d H:i:s");
    $selusermsg = "SELECT logo,user FROM usertable where id = {$commentuserId}";
    $commentUsermsg = sel($con,$selusermsg);
    $commentUserLogo = $commentUsermsg[0]["logo"];
    $commentUserName = $commentUsermsg[0]["user"];
    $sql = "INSERT INTO commentTable (commentId,tripUserId,tripId,commentUserId,content,time,commentUserLogo,commentUserName) VALUES (\"\",\"".$tripUserId."\",\"".$tripId."\",\"".$commentuserId."\",\"".$content."\",\"".$time."\",\"".$commentUserLogo."\",\"".$commentUserName."\")";
    $res = cha($con,$sql);

    $comment = "select * from commentTable where tripUserId = {$tripUserId} AND tripId = {$tripId}";
    $comentData = sel($con,$comment);

    if($res){
        echo json_encode(array(
            "status" => 1,
            "msg"=>"发送成功",
            "commentList" => $comentData
        ));
    }else{
        echo json_encode(array(
            "status" => 0,
        ));
    }

}else if($how == "mypage"){

    $userId = $_POST["userId"];
    $sql = "SELECT * FROM hottravel where userId = {$userId}";
    $res = sel($con,$sql);
    $wantplace = "SELECT * FROM wantgoplace WHERE userId = \"".$userId."\"";
    $wantdata = sel($con,$wantplace);
    $userdata = $sql = "SELECT * FROM usertable where id = {$userId}";
    $userMsg = sel($con,$userdata);
    if($res||$wantdata||$userMsg){
        echo json_encode(array(
            "status" => 1,
            "travelList" => $res,
            "placeList" => $wantdata,
            "userMsg" => $userMsg[0]
        ));
    }else{
        echo json_encode(array(
            "status" => 0
        ));
    }
}else if($how == "reviseLogo"){
    $base64Str = $_POST["fileContent"];
    $fileName = $_POST["fileLastName"];
    $userId = $_POST["userId"];
    $fileStr = base64_decode($base64Str);
    $loadImg = file_put_contents("reviseLogo/".time().".".$fileName,$fileStr);
    if($loadImg){
        $logo = "reviseLogo/".time().".".$fileName;
        $sql = "UPDATE usertable SET logo = \"$logo\" WHERE id = \"$userId\"";
        $res = cha($con,$sql);
        if($res){
            echo json_encode(array(
                "status"=>1,
                "msg"=>"修改成功",
                "data"=>array(
                    "logo"=>$logo
                )
            ));
        }else{
            echo json_encode(array(
                "status" => 0,
                "msg" => "上传失败",
            ));
        }
    }
}else if($how == "create"){
    $base64Str = $_POST["fileContent"];
    $fileName = $_POST["fileLastName"];
    $fileStr = base64_decode($base64Str);
    $loadImg = file_put_contents("reviseLogo/".time().".".$fileName,$fileStr);
    $logo = "reviseLogo/".time().".".$fileName;
    if($loadImg){
        echo json_encode(array(
            "status"=>1,
            "msg"=>"上传成功",
            "data"=>array(
                "logo"=>$logo
            )
        ));
    }
}
