var mySwiper = new Swiper ('.swiper-container',{
	//方向
    direction: 'horizontal',
    //环路
    loop: "true",
    autoplay:{
    	delay:2000,
    },
    autoHeight:'auto',
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
})
$(".swiper-slide .img1").each(function(){
	$(this).css({
		"margin-top":-$(this)[0].offsetHeight/2,
		"margin-left":-$(this)[0].offsetWidth/2
	})
})
$(".swiper-slide .bz").each(function(){
	$(this).css({
		"margin-top":-$(this)[0].offsetHeight/2,
		"margin-left":-$(this)[0].offsetWidth/2
	})
})
$(".swiper-button-next").css("display","none");
$(".swiper-button-prev").css("display","none");
$(".swiper-container").on("mouseover",function(){
	$(".swiper-button-next").css("display","block");
	$(".swiper-button-prev").css("display","block");
})
$(".swiper-container").on("mouseout",function(){
	$(".swiper-button-next").css("display","none");
	$(".swiper-button-prev").css("display","none");
})
$('.swiper-slide').mouseenter(function () {
   mySwiper.autoplay.stop();
})
$('.swiper-slide').mouseleave(function () {
   mySwiper.autoplay.start();
})
var myNav = document.querySelector("nav");
var myUls = document.querySelector("section .ul1");
var myUls2 = document.querySelector("section .ul2");
window.onscroll = function(){
	var h = window.pageYOffset || document.documentElement.scrollTop ||
				document.body.scrollTop;
	if(h!=0){
		myNav.style.backgroundColor = "rgb(78,190,203,.8)";
	}
	else{
		myNav.style.backgroundColor = "rgb(0,0,0,0)";
	}
}

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



//产生热门游记模块
function createLi(bgi,txt,src,p1,p2,tripId,userId){
	var newLi = document.createElement("li");
	var newa1 = document.createElement("a");
	newa1.href = "地图.html?tripId="+tripId+"&userId="+userId;
	newa1.style.backgroundImage = "url("+bgi+")";
	var newa2 = document.createElement("a");
	newa2.innerHTML = txt;
	var newDiv = document.createElement("div");
	var newA3 = document.createElement("a");
	newA3.setAttribute("class","user");
	var newImg = document.createElement("img");
	newImg.src = src;
	var newP1 = document.createElement("p");
	newP1.innerHTML = p1;
	var newP2 = document.createElement("p");
	newP2.innerHTML = p2;
	newDiv.setAttribute("class","info");
	newLi.appendChild(newa1);
	newLi.appendChild(newa2);
	newLi.appendChild(newDiv);
	newDiv.appendChild(newA3);
	newA3.appendChild(newImg);
	newDiv.appendChild(newP1);
	newDiv.appendChild(newP2);
	myUls.appendChild(newLi);
}

//目的地
function createLi2(bgi,txt,id,place){
	var newLi = document.createElement("li");
	var newa1 = document.createElement("a");
	newa1.href = "景点.html?cityId="+id+"&type=id"+"&place="+encodeURI(place);
	var newP = document.createElement("p");
	newP.innerHTML = txt;
	newa1.style.backgroundImage = "url(img/"+bgi+".jpg)";
	newLi.appendChild(newa1);
	newLi.appendChild(newP);
	myUls2.appendChild(newLi);
}
var cityArr = [{
	"name":"北京",
	"id":3,
},{
    "name":"广东",
    "id":6,
},{
    "name":"浙江",
    "id":31,
},{
    "name":"西藏",
    "id":28,
},{
    "name":"香港",
    "id":33,
},{
    "name":"上海",
    "id":25,
},{
    "name":"云南",
    "id":30,
},{
    "name":"海南",
    "id":9,
},]
for(var i = 0; i < 8; i++){
	createLi2(i,cityArr[i].name,cityArr[i].id,cityArr[i].name);
}

//存ul的高度
var arrHeight = [];
//铺第一层
window.onload = function(){
    createAll();
    $(".div1 .personal").on("click",function () {
        if(sessionStorage.isLogin){
            location.href="personalpage.html"
        }else {
            location.href="注册.html";
        }
    })
    $.ajax({
        type: "GET",
        url:"mbtravel.php",
        data:{
            type:'hot',
            name: "chen",
            age:"20"
        },
        dataType:"json",
        success:function (res) {
            if(res.status == 0){
                console.log(res.hotdata)
                let resdata = res.hotdata
                resdata.forEach(function (item) {
                    var explain = item.time+"   " +item.day+"天 "
                    createLi(item.bigImg,item.title,item.logo,explain,item.address,item.tripId,item.userId)
                })

            }
        }
    })
    $("article .art_btn")[0].onclick = function(){
        createAll();
    }
}



//达人瀑布流
function createDaRen(asrc,ttxt,src,P1txt,P2txt,tripId,userId){
	//top
	var newTop = document.createElement("div");
	newTop.className = "art_top";
	var newT_a = document.createElement("a");
	var newT_aImg = document.createElement("img");
	newT_aImg.src = asrc;
	var newT_div = document.createElement("div");
	newT_div.innerHTML = ttxt;
	newT_div.className = "artt_div";
	newT_a.appendChild(newT_aImg);
	newTop.appendChild(newT_a);
	newTop.appendChild(newT_div);
	//center
	var newA = document.createElement("a");
    newA.href = "地图.html?tripId="+tripId+"&userId="+userId;
	newA.className = "art_center";
	var newImg = document.createElement("img");
	newImg.src = src;
	newA.appendChild(newImg);
	//bottom
	var newBottom = document.createElement("div");
	newBottom.className = "art_bottom";
	var newBtP1 = document.createElement("p");
    newBtP1.className = "address"
	var newBtP2 = document.createElement("p");
	newBtP1.innerHTML = P1txt;	
	newBtP2.innerHTML = P2txt;
	newBottom.appendChild(newBtP1);
	newBottom.appendChild(newBtP2);
	//li
	var newLi = document.createElement("li");
	newLi.className = "newli";
	newLi.appendChild(newTop);
	newLi.appendChild(newA);
	newLi.appendChild(newBottom);
	return newLi;	
}
var daRenUls = document.querySelectorAll("article .art_div ul");
//var lis = document.querySelectorAll(".art_div>ul .newli");
//console.log(lis);




function createAll(){
	$.ajax({
		type:"GET",
		url:"mbtravel.php",
		data:{
			type:"star"
		},
		dataType:"json",
		success:function (resdata) {
			console.log(resdata.stardata);
			var res = resdata.stardata
			//铺第一层
			for(var i = 0; i < daRenUls.length; i++){
				var theLi = createDaRen(res[i].logo,res[i].userName,res[i].bigImg,res[i].title,res[i].address,res[i].tripId,res[i].userId);
				daRenUls[i].appendChild(theLi);
				arrHeight[i] = $(daRenUls[i]).innerHeight();
			}
            //剩下的行数
            for(var j = daRenUls.length; j < res.length; j++){
                var index = getMinHeight(arrHeight);
                var theLi = createDaRen(res[j].logo,res[j].userName,res[j].bigImg,res[j].title,res[j].address,res[j].tripId,res[j].userId);
                daRenUls[index].appendChild(theLi);
                arrHeight[index] = daRenUls[index].offsetHeight;
            }
		}
	})

}


function getMinHeight(arr){
	var min = arr[0];
	var minIndex = 0;
	for(var i = 0; i < arr.length; i++){
		if(min > arr[i]){
			min = arr[i];
			minIndex = i;
		}
	}
	//console.log(minIndex);
	return minIndex;
}





















