var mySwiper = new Swiper ('.swiper-container', {
	direction: 'horizontal',
	loop: true,
	autoplay:{
    	delay:3000,
    },
	 // 如果需要分页器
    pagination :{
	    el: '.swiper-pagination',
	    clickable :true,
	}
}) 

var seasonArr = [{
	name:"古镇",
    type : "古镇",
	img : "http://n3-q.mafengwo.net/s9/M00/01/7A/wKgBs1fH3N6AZNnsAADqLwFUFwk07.jpeg?imageMogr2%2Fthumbnail%2F%21476x440r%2Fgravity%2FCenter%2Fcrop%2F%21476x440%2Fquality%2F100"
},{
    name:"动物",
	type : "动物",
	img : "http://p3-q.mafengwo.net/s9/M00/FA/C2/wKgBs1fH1EKARTGwAACOupIlh0c59.jpeg?imageMogr2%2Fthumbnail%2F%21476x440r%2Fgravity%2FCenter%2Fcrop%2F%21476x440%2Fquality%2F100"
},{
    name:"购物",
    type : "购物",
    img : "http://b1-q.mafengwo.net/s7/M00/73/95/wKgB6lTfYZWAcmhQAAbZQZnW42s99.jpeg?imageMogr2%2Fthumbnail%2F%21476x440r%2Fgravity%2FCenter%2Fcrop%2F%21476x440%2Fquality%2F100"
},{
    name:"登山",
    type : "山",
    img : "http://n3-q.mafengwo.net/s9/M00/02/A0/wKgBs1fH3kCAEL12AAEYrn_QfMY23.jpeg?imageMogr2%2Fthumbnail%2F%21476x440r%2Fgravity%2FCenter%2Fcrop%2F%21476x440%2Fquality%2F100"
},{
    name:"潜水",
    type : "岛",
    img : 'http://p1-q.mafengwo.net/s9/M00/01/5F/wKgBs1fH3L2ANBH2AADa90QkaFM55.jpeg?imageMogr2%2Fthumbnail%2F%21476x440r%2Fgravity%2FCenter%2Fcrop%2F%21476x440%2Fquality%2F100'
},{
    name:"草原",
    type : "草原",
    img : "http://n1-q.mafengwo.net/s9/M00/4B/9A/wKgBs1fNSMGARhvcAADyerPosSs42.jpeg?imageMogr2%2Fthumbnail%2F%21476x440r%2Fgravity%2FCenter%2Fcrop%2F%21476x440%2Fquality%2F100"
},{
    name:"滑雪",
    type : "滑雪",
    img : "http://n2-q.mafengwo.net/s6/M00/1B/EE/wKgB4lKhRx-Ac201AAfqtbWx8l498.jpeg?imageMogr2%2Fthumbnail%2F%21476x440r%2Fgravity%2FCenter%2Fcrop%2F%21476x440%2Fquality%2F100"
},{
    name:"温泉",
    type : "温泉",
    img : "http://n1-q.mafengwo.net/s8/M00/46/A1/wKgBpVW_H6KACbwqAAmD6ee1Lac47.jpeg?imageMogr2%2Fthumbnail%2F%21476x440r%2Fgravity%2FCenter%2Fcrop%2F%21476x440%2Fquality%2F100"
},{
    name:"花",
    type : "赏花",
    img : "http://p3-q.mafengwo.net/s6/M00/A0/06/wKgB4lL4ltCARg1nABRvROvonPA79.jpeg?imageMogr2%2Fthumbnail%2F%21476x440r%2Fgravity%2FCenter%2Fcrop%2F%21476x440%2Fquality%2F100"
}]
create(seasonArr);
function create(arr){
	for(var i = 0; i < arr.length; i++){
		var newdiv = $("<a class='link'><div class='ct_photo'><div class='bg'><img src='' alt=''></div><div class='txt'><p></p><p></p></div></div></a>")
		newdiv.appendTo($("article .center"));
		$(".link").eq($(this).index()).attr("href","景点.html?keyWord="+arr[i].type+"&type=keyword");
		$(".bg img").eq($(this).index()).attr("src",arr[i].img);
		$(".ct_photo .txt p:nth-child(1)").eq($(this).index()).html(arr[i].name);
		// $(".ct_photo .txt p:last").html("88564人喜欢这里");
	}
}
var arr = ["杭州","成都","昆明","西安","青岛","张家界","周庄","普陀山","拉萨","香格里拉","腾冲","三亚","珠海","桂林","洛阳","凤凰","青海湖","神农架","厦门","北海"];
arr.forEach(function (item,index) {
    var newdiv = $("<div class='item'><a class='alink'><div></div><h4></h4></a></div>")
	if(index<10){
        newdiv.appendTo($(".city .pana:eq(0)"));
	}
	else {
        newdiv.appendTo($(".city .pana:eq(1)"));
	}
    $(".item a>div").eq($(this).index()).html(index+1);
    $(".item h4").eq($(this).index()).html(item);
    $(".item a").eq($(this).index()).attr("href","景点.html?keyWord="+encodeURI(item)+"&type=keyword");
})















