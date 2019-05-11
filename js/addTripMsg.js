window.onload = function () {
    var address = location.href
    var datas = address.split("?")[1]
    var data = datas.split("&")
    var type = data[0].split("=")[1];
    console.log(type)
    var userId = JSON.parse(sessionStorage.usermsg).userId
    if(type == "travel"){
        $(".travel").show()
        $(".notes").hide()
    }else  if(type == "note"){
        var tripId = data[1].split("=")[1];
        console.log(tripId)
        $(".travel").hide()
        $(".notes").show()
    }
    var titleImg = ""
    //上传封面
    $(".traveladd").change(function (e) {
        var myInput = document.querySelector(".addImg");
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
                    "type":'create',
                    fileContent: e.target.result.split(",")[1],
                    fileLastName:fileLastName[fileLastName.length-1]
                },
                success:function (res) {
                    console.log(res)
                    if(res.status == 1){
                        var url = res["data"]["logo"];
                        titleImg = url;
                        $(".titleImg").attr("src",url);
                        $(".addimg ").hide();
                        $(".tripImg ").css("background-color","white");
                    }
                }
            })
        }
    })
    //创建游记
    $(".createbtn").click(function () {
        var title = $(".title").val();
        var content = $(".content").val();
        var options=$("#privacy option:selected");
        var open = options.val()
        if(title==""||typeof title == "undefined"){
            alert("请填写标题")
            return
        }
        if(content==""||typeof content == "undefined"){
            alert("请添加游记描述")
            return
        }
        if(titleImg == ""){
            alert("请上传游记封面")
            return
        }
        $.ajax({
            type:"POST",
            url: "createTrip.php",
            data: {
                "type":type,
                "title":title,
                "address":content,
                "open":open,
                "userId":userId,
                "titleImg":titleImg
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
//
    $(".noteadd").change(function (e) {
        var myInput = document.querySelector(".noteadd");
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
                    "type":'create',
                    fileContent: e.target.result.split(",")[1],
                    fileLastName:fileLastName[fileLastName.length-1]
                },
                success:function (res) {
                    console.log(res)
                    if(res.status == 1){
                        var url = res["data"]["logo"];
                        var str = "<div class='imgLi'>\n" +
                            "          <img class='noteImg' src='"+url+"'>\n" +
                            "          <textarea class='noteText' type='text' style='resize:none' placeholder='快添加描述吧~'></textarea>\n" +
                            "          <img class='del' onclick='del(this)' src='image/del.png' />"+
                            "      </div>";
                        $(".imgBox")[0].innerHTML += str;
                    }
                }
            })
        }
    })
    var noteList = [];
    $(".createNote").click(function () {
        // if(noteList.length>0){
            $(".imgLi").each(function () {
                var img = $(".noteImg").eq($(this).index()).attr("src");
                var text = $(".noteText").eq($(this).index()).val();
                // noteList.push({
                //     "img":img,
                //     "text":text
                // })
                var i = $(this).index()+1
                var n = $(".imgLi").length
                console.log(i,n)
                $.ajax({
                    type:"POST",
                    url: "createTrip.php",
                    data: {
                        "type":type,
                        "tripId":tripId,
                        "img":img,
                        "text":text,
                        "userId":userId
                    },
                    dataType:"json",
                    success:function (res) {
                        console.log(res)
                        if(res.status == 1){
                            if(i == n){
                                history.back();
                            }
                        }
                    }
                })
            })



        // }else {
        //     alert("请添加旅游日记")
        // }
        // console.log(noteList)
    })
}
function onclick(the){
    console.log(1)
    var index = $(the).index();
    noteList.forEach(function (item, idx) {
        if(index = idx){
            noteList.splice(idx,1);
        }
    })
}

$(".back").click(function () {
    history.back();
})
