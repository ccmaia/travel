var thistype = 0;
var page = 1;
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

window.onload = function () {
    var address = decodeURI(location.href);
    var datas = address.split("?")[1]
    var searchMsg = datas.split("=")[1]
    console.log(searchMsg)
    var userMsg = sessionStorage.usermsg;
    var userId = JSON.parse(userMsg).userId;
    if(thistype == 0){
        search("searchPlace",userId,searchMsg)
    }else if(thistype == 1){

    }else if(thistype == 2){

    }
    $(".typeli li").click(function () {
        thistype = $(this).index()
        $(".typeli li").css({
            "color":"#666",
            "border-bottom": "none",
        });
        $(".typeli li").eq($(this).index()).css({
            "border-bottom": "3px solid #ff7000",
            "color": "#ff7000"
        });
        console.log(thistype)
        if(thistype == 0){
            search("searchPlace",userId,searchMsg)
        }else if(thistype == 1){
            create(searchMsg,page);
        }else if(thistype == 2){

            search("searchUse",userId,searchMsg)
        }
    })

    $(".div1 .personal").on("click",function () {
        if(sessionStorage.isLogin){
            location.href="personalpage.html"
        }else {
            location.href="注册.html";
        }
    })

}
//用户，游记
function search(type,userId,searchMsg) {
    $.ajax({
        type: "POST",
        url: "createTrip.php",
        data: {
            "type":type,
            "userId":userId,
            "searchMsg":searchMsg
        },
        dataType:"json",
        success:function (res) {
            $(".contentList").empty();
            $(".result").html('以下是为您找到的"'+searchMsg+'”相关结果'+res.data.length+'条');
            if(res.data.length>0){
                if(type == "searchPlace"){
                    let result = res.data;
                    result.forEach(function (item) {
                        var explain = item.time+"   " +item.day+"天 ";
                        // 地图.html?tripId='"+item.tripId+"'&userId='"+item.userId+"
                        var href = "地图.html?tripId="+item.tripId+"&userId="+item.userId;
                        var str = " <div class='ali'>\n" +
                            "                <a href='"+href+"'>\n" +
                            "                    <img class='liImg' src='"+item.bigImg+"'>\n" +
                            "                    <div class='title'>"+item.title+"</div>\n" +
                            "                    <div class='info'>\n" +
                            "                        <div class='info_left'>\n" +
                            "                            <p>"+explain+"</p>\n" +
                            "                            <p>"+item.address+"</p>\n" +
                            "                        </div>\n" +
                            "                        <img class=logo src='"+item.logo+"'>\n" +
                            "                    </div>\n" +
                            "                </a>\n" +
                            "            </div>";
                        $(".contentList")[0].innerHTML += str;
                    })
                }else if(type == "searchUse"){
                    let result = res.data;
                    console.log(result)
                    result.forEach(function (item) {
                        var str = "<div class='userli'>\n" +
                            "                <img class='userLogo' src='"+item.logo+"' >\n" +
                            "               <div class='msgbox'>"+
                            "                   <p class='name'>"+item.user+"</p>"+
                            "                   <p class='msg'>关注："+item.focus+"  粉丝："+item.fans+"</p>"+
                            "               </div>" +
                            "       </div>";
                        $(".contentList")[0].innerHTML += str;
                    })

                }
            }
        }
    })
}

function detail(the) {
    type = "detail";
    console.log(the.getAttribute("name"));
}

//景点
function create(keyword,page) {
    $.ajax({
        type: 'post',
        url: 'http://route.showapi.com/268-1',
        dataType: 'json',
        data: {
            "showapi_timestamp": '',
            "showapi_appid": '93862', //这里需要改成自己的appid
            "showapi_sign": 'eb2596e3517b466b838b45355b52efbf',  //这里需要改成自己的应用的密钥secret
            "keyword":keyword,
            "proId":'',
            "cityId":"",
            "areaId":"",
            "page":page

        },
        success: function(res) {
            if(res.showapi_res_code == 0){
                $(".contentList").empty();
                var contentlist = res.showapi_res_body.pagebean.contentlist
                console.log(contentlist)
                $(".result").html('以下是为您找到的"'+keyword+'”相关结果'+contentlist.length+'条');
                contentlist.forEach(function (item,index) {
                    if(item.picList.length>0){
                        var str = "<div class='list' onclick='detail(this)' name='"+item.name+"'><img class='photo' src='"+item.picList[0].picUrlSmall+"'>" +
                            " <div class='list_left'>" +
                            "<div class='title'>景点-"+item.name+"</div>" +
                            "<div class='description'><text>"+item.proName +"</text><text>开放时间: "+item.opentime +"</text><text></text>"+item.address+"</div>" +
                            "<div class='jianjie'>"+item.summary+"</div>"
                        "</div></div>"
                    }else {
                        var str = "<div class='list' onclick='detail(this)' name='\"+item.proName +item.name+\"'><img class='photo' src='http://n1-q.mafengwo.net/s8/M00/C3/2F/wKgBpVWCVsGALuHDAD6a6QDkLig904.png?imageMogr2%2Fthumbnail%2F%21180x180r%2Fgravity%2FCenter%2Fcrop%2F%21180x180%2Fquality%2F90' alt=''>" +
                            " <div class='list_left'>" +
                            "<div class='title'>景点-"+item.name+"</div>" +
                            "<div class='description'><text>"+item.proName+"</text><text>开放时间： "+item.opentime+"</text><text></text>"+item.address+"</div>" +
                            "<div class='jianjie'>"+item.summary+"</div>"
                        "</div></div>"
                    }

                    $(".contentList")[0].innerHTML += str;
                })
            }
        }
    });
}

