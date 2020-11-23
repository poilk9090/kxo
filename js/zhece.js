//给当前form表单添加表单事件
$('form').validate({
    rules:{
        urse:{
            required:true,
            minlength:5,
            maxlength:8
        },
        pass:{
            required:true,
            minlength:5,
            maxlength:8
        },
    },
    messages: {
        urse: {
            required: "不能为空账号",
            minlength: "账号必需由两个字符组成",
            
            maxlength: "账号最长位数为8位数"        },
        pass: {
            required: "密码不能为空",
            minlength: "密码长度不能小于 5 个字符",
            maxlength: "密码最长位数为8位数"
        }
    }
    
})



var minbtn = document.querySelector('.min-1 button')
var user = document.querySelector('.user')
var pass = document.querySelector('.pass')
var href1 = location.href
// 点击事件
minbtn.onclick = function(){
    // 获取value值
    var us = user.value
    var ps = pass.value

    //提交数据
    ajax({
        url:'../php/denglu.php',
        type:'POST',
        data:{
            user:us,
            pass:ps,
            type:'add',
        },
        dataType:'json',
        success: function(json){
            alert(json.msg)
        },
        error:function (code){
            alert(code) 
        }
    })
    alert('注册成功，正在跳转登录页')

    location.href='../html/denglu.html?patUrl='+href1


}