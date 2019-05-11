var type = "list";
var placeImg = '';
var placeName = '';
var key = '';
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
window.onload = function () {
    var address = decodeURI(location.href);
    console.log(address.split("?")[1])
    var datas = address.split("?")[1]
    var data = datas.split("&")
    var type = data[1].split("=")[1]
    console.log(type)
    if(type == "keyword"){
        var keyword = data[0].split("=")[1];
        create(keyword,'',1,"list")
        key = keyword
    }else {
        var proId = data[0].split("=")[1];
        create("",proId,1,"list");
        key = data[2].split("=")[1];
    }


    var page = 1
    $(".top .lis").click(function () {
        $(".top li").css({
            "color":"#666",
            "border-bottom": "none",
        });
        $(".top li").eq($(this).index()).css({
            "border-bottom": "3px solid #ff7000",
            "color": "#ff7000"
        });
        if($(this).index() == 0){
            $(".content").empty();
            create("",proId,1,"list")
        }else if($(this).index() == 1){
            type = "travel";
            if(sessionStorage.isLogin){
                var userId = JSON.parse(sessionStorage.usermsg).userId
                search(userId,key)
            }else {
                location.href="注册.html";
            }
        }
    })
    window.onscroll = function(){
        if(type == "list"){
            //判断到达底部
            var sh = window.pageYOffset||document.documentElement.scrollTop;
            //获取整个页面高度
            var dh = document.documentElement.scrollHeight;
            //获取页面可见高度
            var kj = document.documentElement.clientHeight;
            if(sh+kj >= dh){
                page++;
                if(type == "keyword"){
                    setTimeout(create(keyword,"",page,"list"),5000)
                }else {
                    setTimeout(create("",proId,page,"list"),5000)
                }

            }
        }

    }
}

//点击加入我喜欢
var islike = 0;
function addLike() {
    if(sessionStorage.isLogin){
        if(islike == 0){
            $(".m_t_left img").attr("src","image/like.png")
            var userMsg = sessionStorage.usermsg;
            var userId = JSON.parse(userMsg).userId;
            $.ajax({
                type: "POST",
                url: "createTrip.php",
                data: {
                    "type":"addLike",
                    "userId":userId,
                    "img":placeImg,
                    "placeName":placeName
                },
                dataType:"json",
                success:function (res) {
                    console.log(res)
                    if(res.status == 1){
                        islike = 1;
                    }
                }
            })
        }
    }else {
        location.href="注册.html";
    }
}


function detail(the) {
    type = "detail";
    console.log(the.getAttribute("name"));
    var keyword = the.getAttribute("name");
    $(".top li").css({
        "color":"#666",
        "border-bottom": "none",
    });
    $(".top li").eq(2).css({
        "border-bottom": "3px solid #ff7000",
        "color": "#ff7000"
    });
    create(keyword,"",1,"detail")
}

function create(keyword,proId,page,type) {
    $.ajax({
        type: 'post',
        url: 'http://route.showapi.com/268-1',
        dataType: 'json',
        data: {
            "showapi_timestamp": '',
            "showapi_appid": '93862', //这里需要改成自己的appid
            "showapi_sign": 'eb2596e3517b466b838b45355b52efbf',  //这里需要改成自己的应用的密钥secret
            "keyword":keyword,
            "proId":proId,
            "cityId":"",
            "areaId":"",
            "page":page

        },
        success: function(res) {
            if(res.showapi_res_code == 0){
                console.log(res);
               if(type == 'list'){
                   var contentlist = res.showapi_res_body.pagebean.contentlist
                   console.log(contentlist)
                   contentlist.forEach(function (item,index) {
                           // var list = document.createElement("div");
                           // list.className = "list";
                           // $(".content").append(list)
                           if(item.picList.length>0){
                               var str = "<div class='list' onclick='detail(this)' name='"+item.proName +item.name+"'><img class='photo' src='"+item.picList[0].picUrlSmall+"'>" +
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

                           $(".content")[0].innerHTML += str;
                   })
               }else if(type == "detail"){
                   $(".content").empty();
                   var contentMsg = res.showapi_res_body.pagebean.contentlist[0];
                   console.log(contentMsg.picList);
                   placeName = contentMsg.name;
                   if(contentMsg.picList){
                       if(contentMsg.picList.length>3){
                           placeImg = contentMsg.picList[0].picUrl;
                           var img1 = contentMsg.picList[0].picUrl;
                           var img2 = contentMsg.picList[1].picUrl;
                           var img3 = contentMsg.picList[2].picUrl;
                       }if(contentMsg.picList.length==2){
                           placeImg = contentMsg.picList[0].picUrl;
                           var img1 = contentMsg.picList[0].picUrl;
                           var img2 = contentMsg.picList[1].picUrl;
                           var img3 = '';
                       }if(contentMsg.picList.length==1){
                           placeImg = contentMsg.picList[0].picUrl;
                           var img1 = contentMsg.picList[0].picUrl;
                           var img2 = '';
                           var img3 = '';
                       }if(contentMsg.picList.length==0){
                           placeImg = contentMsg.picList[0].picUrl;
                           var img1 = '';
                           var img2 = '';
                           var img3 = '';
                       }
                   }else {
                       var img1 = '';
                       var img2 = '';
                       var img3 = '';
                   }


                   console.log(contentMsg);
                   var str = " <div class='msgInfo'>\n" +
                       "                <div class='msg_top'>\n" +
                       "                    <div class='title'>"+contentMsg.name+"</div>\n" +
                       "                    <div class='m_t_left' onclick='addLike()'><img src='image/islike.png' alt=''><tex>想去</tex></div>\n" +
                       "                </div>\n" +
                       "                <div class='imgBox'>\n" +
                       "                    <img class='img1' src='"+img1+"' alt=''>\n" +
                       "                    <div class='img_left'>" +
                           "                    <img class='img2' src='"+img2+"' alt=''>\n" +
                           "                    <img class='img3' src='"+img3+"' alt=''>\n" +
                       "                </div>"+
                       "                </div>\n" +
                       "                <div class='info_detail'>"+contentMsg.summary+"</div>\n" +
                       "                <div class='attention'><div>注意：</div>"+contentMsg.attention+"</div>\n" +
                       "                <div class='address'>地址："+contentMsg.address+"</div>"+
                       "                <div class='coupon'><div>优惠：</div>"+contentMsg.coupon+"</div>\n" +
                       "</div>";
                   $(".content")[0].innerHTML += str;
               }
            }
        }
    });
}

function search(userId,searchMsg) {
    $.ajax({
        type: "POST",
        url: "createTrip.php",
        data: {
            "type":"searchPlace",
            "userId":userId,
            "searchMsg":searchMsg
        },
        dataType:"json",
        success:function (res) {
            $(".content").empty();
            if(res.data.length>0){
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
                    $(".content")[0].innerHTML += str;
                })

            }
        }
    })
}