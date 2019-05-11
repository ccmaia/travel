window.onload = function(){
	$("nav a").on("click",function(){
		$("nav a").css("color","#fff");
		$("nav  a").eq($(this).index()).css("color","#168391");
		console.log(1)
	})
    $("nav ul li").on("click",function(){
        $("nav ul li").css("color","#fff");
        $("nav ul li").eq($(this).index()).css("color","#168391");
        console.log(1)
    })

	$(".div1 .personal").click(function () {
		console.log(11)
		console.log(sessionStorage.isLogin)
		if(sessionStorage.isLogin){
            location.href="personalpage.html"
		}else {
            location.href="注册.html";
		}
    })

	$(".sousuo").blur(function () {
        if(sessionStorage.isLogin){
            var keyWord = $(this).val();
            if(keyWord!=""){
                location.href = "searchPage.html?searchMsg="+encodeURI(keyWord);
            }
            console.log($(this).val())
        }else {
            location.href="注册.html";
        }
    })
}