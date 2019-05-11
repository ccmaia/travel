	$(".mb").css({
		width:$(window).width(),
		height:$(window).height(),
		backgroundcolor:"rgba(0,0,0,0.7)",
		position:"absolute",
		top:"0",
		left:"0",
		display:"none"
	})
	
	$("#show_login").css("display","none");
	$(".div2").click(function(){
			$("#show_login").show();
			$(".mb").css("display","block");
	});
	$(".close-login").click(function(){
		$("#show_login").hide();
		$(".mb").css("display","none");
	})
	$(".mb").click(function(){
		$("#show_login").hide();
		$(".mb").css("display","none");
	})
	$(".denglu").css("cursor","pointer");
    $(".h_register").hide();
    $(".loginbtn").hide();
	$(".h_login").click(function () {
        $(".h_login").hide();
        $(".loginbtn").show();
        $(".h_register").show();
        $(".registerbtn").hide();
        $(".emaildiv").hide()
    })
	$(".h_register").click(function () {
        $(".h_login").show();
        $(".loginbtn").hide();
        $(".h_register").hide();
        $(".registerbtn").show();
        $(".emaildiv").show()
    })
	//登录
	$('.loginbtn').click(function () {
		var email = $('.emial').val()
		var username = $('.username').val()
        var userpass = $('.userpass').val()
		if(trim(username)==null || trim(username)==""){
			alert("请输入用户名");
            $('.username').focus();
			return false;
		}
        if(trim(userpass)==null || trim(userpass)==""){
            alert("请输入密码");
            $('.userpass').focus();
            return false;
        }
        $.ajax({
			type:"POST",
            url:"usertable.php",
			data:{
                type:"login",
                user:username,
				pass:userpass
			},
            dataType: "json",
			success:function (res) {
				console.log(res)
				if(res.status == 1){
                    sessionStorage["usermsg"] = JSON.stringify({
                        "user":res.data.user,
						"userId":res.data.id
                    });
                    sessionStorage["isLogin"]=1
                    location.href="personalpage.html"
				}else {
					alert("请重新输入")
                    $('.username').focus()
				}
            }
		})
    })
	//注册
	$(".registerbtn").click(function () {
        var email = $('.emial').val()
        var username = $('.username').val()
        var userpass = $('.userpass').val()
        if(trim(email)==null || trim(email)==""){
        	alert("请输入email");
            $('.emial').focus();
        	return false;
        }else{
            var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        	if(!pattern.test(email)){
                alert("请输入正确email");
                $('.emial').focus();
                return false;
        	}
        }
        if(trim(username)==null || trim(username)==""){
            alert("请输入用户名");
            $('.username').focus();
            return false;
        }
        if(trim(userpass)==null || trim(userpass)==""){
            alert("请输入密码");
            $('.userpass').focus();
            return false;
        }
        $.ajax({
            type:"POST",
            url:"usertable.php",
            data:{
                type:"register",
				email:email,
                user:username,
                pass:userpass
            },
            dataType: "json",
            success:function (res) {
                console.log(res)
                if(res.status == 1){
                    $(".h_login").hide();
                    $(".loginbtn").show();
                    $(".h_register").show();
                    $(".registerbtn").hide();
                    $(".emaildiv").hide()
                }else {
                    alert("注册失败")
                    $('.emial').focus()
                }
            }
        })
    })
    function trim(str){ //删除左右两端的空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

//验证码
function rand(){
	return Math.floor(Math.random()*9);	
}
$(".yzm").on("click",function(){
	$(this).attr("src","image/y"+rand()+".jpg");
})

