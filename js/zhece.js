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
            required: "请输入账号",
            minlength: "账号必需由两个字符组成",
            
            maxlength: "账号最长位数为8位数"        },
        pass: {
            required: "请输入密码",
            minlength: "密码长度不能小于 5 个字符",
            maxlength: "密码最长位数为8位数"
        }
    }
    
    
})