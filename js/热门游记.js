window.onload = function(){
    var tabIndex = 0
    var tonum = 5
    var bnum = 0
    var stonum = 5
    var sbnum = 0
    $(".div1 .personal").on("click",function () {
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

    //点击达人和热门变换
    $(".icon").eq(0).show();
    console.log(document.querySelectorAll(".icon"))
    $(".hot span").eq(0).css("color","#000");
    $(".hot span").eq(1).css("color","#B0B0B0");
    $(".center").eq(1).css("display","none");
    $(".hot").on("click",function(){
        $(".icon").hide();
        $(".hot span").css("color","#B0B0B0");
        $(".hot span").eq($(this).index()).css("color","#000");
        $(".icon").eq($(this).index()).show();
        //点那个让对应的显示出来
        $(".center").css("display","none");
        $(".center").eq($(this).index()).css("display","block");

        tabIndex = $(this).index()
		if(tabIndex == 1){
			$(".moreBtn").hide()
		}else {
            $(".moreBtn").show()
		}
        console.log(tabIndex)
        $(".ct_daren").empty();
        //创建达人
        createHot(stonum,sbnum,"star")
    })
//鼠标移入显示阴影
    $(".content_f").on("mouseover",function(){
        $(this).css("box-shadow"," 0px 0px 20px 1px #bbb")
        console.log(1);
    })
    $(".content_f").on("mouseout",function(){
        $(this).css("box-shadow","none")
    })
    $(".center_2").on("mouseover",function(){
        $(this).css("box-shadow"," 0px 0px 20px 1px #bbb")
        //console.log(1);
    })
    $(".center_2").on("mouseout",function(){
        $(this).css("box-shadow","none")
    })


    //返回顶部按钮显示隐藏
    $(".fhByn").css({
        position: "fiexd",
        display:"none"
    })
    $(document).on("scroll",function(){
        if($(document).height()-$(document).scrollTop()-400 > $("footer").height()){
            if($(document).scrollTop() > 30){
                $(".fhByn").css("display","block");
            }else{
                $(".fhByn").css("display","none");
            }
        }
    })
    //点击返回顶部
    $(".fhByn").on("click",function(){
        $("html").animate({
            scrollTop:0
        },500)
    })
    function create(){
        var newDiv = $("<div class='content_f'><div class='cf_top'><a class='link'><img /></a></div><div class='cf_bottom'><div class='b_left'><p class='bp1'></p><p class='bp2'></p></div><div class='b_right'></div></div></div>");
        return newDiv
    }
    //创建热门
    createHot(0,0,"hot")


    function add(data){
        $(".center:first").append(create());
        $(".cf_top img").eq($(this).index()).attr("src",data.bigImg);
        $(".cf_bottom .b_left .bp1").eq($(this).index()).html(data.title);
        $(".cf_bottom .b_left .bp2").eq($(this).index()).html(data.time);
        $(".link").eq($(this).index()).attr("href","地图.html?tripId="+data.tripId+"&userId="+data.userId);
    }
    // $(".moreBtn").on("click",function(){
    //     tonum += 5
    //     bnum = tonum-6
    //     console.log(tonum,bnum)
    //     createHot(tonum,bnum,"hot")
    // });


//创建达人对应的瀑布流
    function createDaren(data){
        var newLi = $("<li class='center_2'>" +
            "<div class='ct_head'><div><div class='ct_h_left'>" +data.user_name+
            "</div><p class='ct_dec'>在"+data.trip_name+"途中添加了照片</p></div><div class='ct_h_right'>"+data.time +
            "</div></div><div class='ct_body'><div class='photo'>" +
            "<img src='"+data.big_img+"'/></div><p class='ct_b_txt'>" +data.description+
            "</p></div><div class='ct_info'><div><span class='like'>" +
            "</span><span></span></div><div><span class='message'>" +
            "</span><span></span></div></div><div class='ct_more'>" +
            "</div></li>");
        $(".ct_daren").append(newLi);

    }


    $(".ct_daren").css("opacity","1");
//个数
    var liCount = 20;
    var liWidth = 318;
	//存数组高度
    var saveHeight = [];

	//摆放位置
    function setWall(){
        var lis = document.querySelectorAll(".center_2");
        if(lis.length>4){
            for(var i = 0; i < 3; i++){
                //存每一列高度
                //存每列的高度
                saveHeight[i] = lis[i].offsetHeight;
                //设置第一排的left,top
                lis[i].style.top = "0px";
                lis[i].style.left = i*liWidth+"px";
            }
            for(var i = 3; i < lis.length; i++){
                var minIndex = getMinIndex(saveHeight)[0];
                //摆
                //left = 最小列下标*每列宽度
                lis[i].style.left = minIndex*liWidth+"px";
                //top = 最小列高度加margin值
                lis[i].style.top = saveHeight[minIndex]+20+"px";
                //摆完把flower显示
                $(".ct_daren").css("opacity","1");
                //更新数组最小高度为加上li后的高度
                saveHeight[minIndex] = saveHeight[minIndex] + 20+ lis[i].offsetHeight;
                //设置flower的宽度
                $(".center2 ul")[[0]].style.height = getMinIndex(saveHeight)[1] +"px";
            }
        }

    }

    //下拉滑动到底部，重新加载
    window.onscroll = function(){
        //判断到达底部
        var sh = window.pageYOffset||document.documentElement.scrollTop;
        //获取整个页面高度
        var dh = document.documentElement.scrollHeight;
        //获取页面可见高度
        var kj = document.documentElement.clientHeight;
        // console.log(tabIndex)
        if(sh+kj > dh-160){

            if(tabIndex == 1){
                console.log(tabIndex)
                stonum+=5;
                sbnum = stonum-6;
                createHot(stonum,sbnum,"star")
                console.log('-----------------')
            }
        }
    }
    function createHot(num,num1,type) {
        $.ajax({
            type:"POST",
            url:"hottravel.php",
            data:{
                "type":type,
                "tonum":num,
                "beginnum":num1
            },
            dataType: "json",
            success:function (res){
                console.log(res.List)
                if(res.List.length>0){
                    res.List.forEach(function (item) {
                        if(type == "hot"){
                            add(item)
                        }else {
                            createDaren(item)
                            setWall()
                        }
                    })
                }
            }
        })
    }



//找最小下标
    function getMinIndex(arr){
        //定义最小值
        var min = arr[0];
        var max = arr[0];
        //最小值下标
        var minIndex= 0;
        //遍历
        for(var i = 0; i < arr.length;i++){
            //判断最小值
            if(min > arr[i]){
                min = arr[i];
                //保存最小值下标
                minIndex = i;
            }
            //获取最大值
            if(max < arr[i]){
                max = arr[i];
            }
        }
        return [minIndex,max];
    }
}























































