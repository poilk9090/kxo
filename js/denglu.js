//获取操作对象
var min = document.querySelectorAll('.minbox>a')

var fn1 = document.querySelectorAll('.box1>form')

for(let i=0; i<min.length; i++){
    //给对象绑定点击事件
    min[i].onclick=function(){
        //清空当前标签的class属性
        for(var j=0; j<min.length; j++){
            min[j].className=''
            fn1[j].className=''
            
        }
        //设置当前对象的class的属性值
        this.className='a1'
        fn1[i].className='f1'
    }
}

//表单插件
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

$('#fn2').validate({
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


// 获取form表单对象
var frm = document.querySelector('form')
frm.onsubmit=function(){
    //获取表单输入框的内容
    var user=document.querySelector("[name='user']").value
    var pass=document.querySelector("[name='pass']").value
    // 设置保存时间差
    var d = new Date()
    //调用ajax对象
    ajax({
        url:'../php/denglu.php',
        type:'POST',
        data:`name=${user}&pass=${pass}`,
        success:function(dt1){
            
            //判断登录是否成功
            if(dt1===1){
                //保存登录账号
                
                setCookie('login',user,1800)
                
                //获取地址栏中的参数
                var search1=location.search
                console.log(search1);
                //判断该参数是否存在
                if(search1){
                    
                    //获取参数值
                    var path1=search1.split('=')[1]
                    //直接将获取的参数值作为跳转地址
                    location.href=path1
                }else{
                    location.href='../html/liebiao.html'
                }
            }else{
                alert('账号或密码有误，请重新登录')
            }
            
        }
    })
    return false
}