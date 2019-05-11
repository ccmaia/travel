var navFiexd = document.querySelector(".trip_nav_fiexd");
var choose = document.querySelector(".choose");
var sill = document.querySelectorAll(".day .sill li");
var chooseLi = document.querySelectorAll(".day .choose li");
var divs = document.querySelectorAll(".d_left>div");
$(".div1 .personal").on("click",function () {
    if(sessionStorage.isLogin){
        location.href="personalpage.html"
    }else {
        location.href="注册.html";
    }
})
window.onload = function () {
	var nowUser = JSON.parse(sessionStorage.usermsg).userId
	var address = location.href
	console.log(address.split("?")[1])
	var datas = address.split("?")[1]
	var data = datas.split("&")
	var tripId = data[0].split("=")[1]
    var userId = data[1].split("=")[1]
	$.ajax({
		type:'POST',
		url:"detailtrip.php",
		data:{
            userId:userId,
            tripId:tripId
		},
        dataType:"json",
		success:function (res) {
			console.log(res)
			if(res.status==1){
				$(".like").html(res.basemsg[0].like)
				$(".travelname").html(res.basemsg[0].title)
				$(".time").html(res.dataList[0].time)
				var travelDay = res.dataList.length;
				$(".allday").html(travelDay+"天")
				res.dataList.forEach(function (item, index) {
					var theday = index+1
					var day = document.createElement("div");
					day.className = "days"
					$(".d_left").append(day)
					var str = "<p><span class=\"sun\"></span><span>"+item.time+"</span><span>第"+theday+"天</span></p>\n" +
                        "\t\t\t\t\t\t<img src='"+item.img+"' alt=\"\" /><p class=\"text\" style=\"background: white\">"+item.text+"</p>"
					day.innerHTML += str;
                })

				if(res.commentList.length>0){
					res.commentList.forEach(function (item) {
						var list = document.createElement("div");
						list.className = "commentli";
                        $(".commentlist").append(list);
                        var strLi = "<img class=\"com_logo\" src='"+item.commentUserLogo+"' />" +
                            "<div class=\"com_right\">" +
                            "<div class=\"com_name_content\">" +
                            "<span class=\"com_name\">"+item.commentUserName+":  </span>" +
                            "<span class=\"com_content\">"+item.content+"</span>" +
                            "</div>" +
                            "<div class=\"com_time\">"+item.time+"</div>" +
                            "</div>"
						list.innerHTML += strLi;
                    })
				}
			}
        }
	})
	$(".fasong").click(function () {
        if(sessionStorage.isLogin){
            var content = $(".textcomment").val()
			if(content!=""&&typeof content!="undefined"){
                $.ajax({
                    type: "POST",
                    url: "usertable.php",
                    data: {
                        type:"fasong",
                        tripId:tripId,
                        userId:userId,
                        content:content,
                        commentuserId:JSON.parse(sessionStorage.usermsg).userId
                    },
                    dataType: "json",
                    success:function (res) {
                        console.log(res)
                        $(".commentlist").empty()
						$(".textcomment").val(" ")
                        res.commentList.forEach(function (item) {
                            var list = document.createElement("div");
                            list.className = "commentli";
                            $(".commentlist").append(list);
                            var strLi = "<img class=\"com_logo\" src='"+item.commentUserLogo+"' />" +
                                "<div class=\"com_right\">" +
                                "<div class=\"com_name_content\">" +
                                "<span class=\"com_name\">"+item.commentUserName+":  </span>" +
                                "<span class=\"com_content\">"+item.content+"</span>" +
                                "</div>" +
                                "<div class=\"com_time\">"+item.time+"</div>" +
                                "</div>"
                            list.innerHTML += strLi;
                        })
                    }
                })
			}

        }else {
            location.href="注册.html";
        }

    })
	console.log(nowUser,userId)
	if(nowUser != userId){
        $(".addnotes").hide()
	}else {
        $(".addnotes").show()
	}


    $(".addnotes").click(function () {
        if(sessionStorage.isLogin){
            location.href="addTripMsg.html?addType=note&tripId="+tripId;
        }else {
            location.href="注册.html";
        }
    })
	$(".jiannotes").click(function () {
        $.ajax({
            type:"POST",
            url: "createTrip.php",
            data: {
                "type":"reduce",
                "tripId":tripId,
                "userId":userId
            },
            dataType:"json",
            success:function (res) {
                console.log(res)
                if(res.status == 1){
					history.back();
                }
            }
        })
    })
}



//蓝色滑块
for(var i = 0; i < sill.length; i++){
	sill[i].style.top = i*sill[0].offsetHeight+i*10+30+"px";
}
//滑动显示
window.onscroll = function(){
	for(var i = 0 ; i < chooseLi.length; i++){	
		//自定义属性，保存下标
		chooseLi[i].index = i;
		chooseLi[i].onclick = function(){	
			sill[0].style.top = this.index*(sill[0].offsetHeight+10)+80+"px";
			if(this.index == 0){
				document.documentElement.scrollTop = 400;
			}else{
				document.documentElement.scrollTop = divs[this.index].offsetHeight*this.index;
			}
			console.log(this.index);
		}
	}
	// if(document.documentElement.scrollTop>300){
	// 	navFiexd.style.display = "block";
	// 	choose.style.position = "fixed";
	// 	choose.style.top = 50+"px";
	// 	for(var i = 0; i < sill.length; i++){
	// 		sill[i].style.position = "fixed";
	// 		sill[i].style.top = i*sill[0].offsetHeight+i*10+80+"px";
	// 		sill[i].style.left = 260+"px";
	// 	}
	// }
	// else{
	// 	navFiexd.style.display = "none";
	// 	choose.style.position = "absolute";
	// 	choose.style.top = 0;
	// 	for(var i = 0; i < sill.length; i++){
	// 		sill[i].style.position = "absolute";
	// 		sill[i].style.top = i*sill[0].offsetHeight+i*10+30+"px";
	// 		sill[i].style.left = 50+"px";
	// 	}
	// }
}

