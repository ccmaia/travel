window.onload=function () {
    var userMsg = sessionStorage.usermsg
    console.log(JSON.parse(userMsg).userId )
    $.ajax({
        type:"POST",
        url:"usertable.php",
        data:{
            type:"mypage",
            userId:JSON.parse(userMsg).userId
        },
        dataType: "json",
        success:function (res) {
            console.log(res)
            if(res.status==1){
                $(".top_logo").attr("src",res.userMsg.logo)
                $(".username").html(res.userMsg.user)
                $(".focus").html("关注 "+res.userMsg.focus)
                $(".fans").html("粉丝 "+res.userMsg.fans)
                $(".trips").html("游记 "+res.travelList.length)
                $(".wish-to-go").html("想去 "+res.placeList.length)
                $(".liked").html("喜欢 "+0)
                if(res.travelList.length>0){
                    res.travelList.forEach(function (item) {
                        var content = document.createElement("div");
                        content.className = "travelcontent";
                        $(".travels").prepend(content);

                        var str = "<a href='地图.html?tripId="+item.tripId+"&userId="+item.userId+"'><img class='top_pot' src='"+item.bigImg
                            +"'></img></a><div class='bot_msg'><div class='m_left'><div>"+item.title
                            +"</div><div>"+item.time
                            +"</div></div><div class='m_right'><img src='image/like.png' /><text>"+item.like
                            +"</text></div></div>"
                        content.innerHTML += str
                    })
                }
                if(res.placeList.length>0){
                    res.placeList.forEach(function (item) {
                        var content = document.createElement("div");
                        content.className = "placecontent";
                        $(".places").prepend(content);

                        var str = "<img class='top_pot' src='"+item.imgList
                            +"'></img><div class='placename'>"+item.placeName+"</div>"
                        content.innerHTML += str
                    })
                }
            }
        }
    })
}

$(".reviseLogo").change(function (e) {
    var myInput = document.querySelector(".reviseLogo");
    var fileObj = myInput.files[0];
    var fileLastName = fileObj.name.split(".");
    // console.log(fileObj)
    var reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = function (e) {
        $.ajax({
            type:"POST",
            url:"usertable.php",
            dataType:"json",
            data:{
                "type":'reviseLogo',
                fileContent: e.target.result.split(",")[1],
                fileLastName:fileLastName[fileLastName.length-1],
                userId:JSON.parse(sessionStorage.usermsg).userId
            },
            success:function (res) {
                console.log(res)
                if(res.status == 1){
                    var url = res["data"]["logo"];
                    $(".top_logo").attr("src",url);
                }
            }
        })
    }
})

$(".addtravel").click(function () {
    location.href = "addTripMsg.html?addtype=travel"
})
$(".addnotes").click(function () {
    location.href = "addTripMsg.html?addType=note"
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