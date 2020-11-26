<?php
// 允许任何来源
header("Access-Control-Allow-Origin:*"); 
// 设置请求头
header('content-type:text/html;charset=utf-8');
//获取传入的值
$u=$_POST['user'];
$p=$_POST['pass'];
$type=$_POST['type'];
//链接数据库
$link=mysqli_connect('localhost','root','root','urse');
if(!$link){
    die('{"err":-1,"msg":"链接失败"}');
}
// 控制链接
if(!$u || !$p || !$type){
    die('{"err":-2,"msg":"参数错误"}');
}else{
    // 登录
    if($type === 'login'){
        //设置编码
        mysqli_set_charset($link,'utf8');
        // 查询语句
        $login_sql="select * from urse where name='$u' and pass='$p'";
        // 执行语句
        $login_res = mysqli_query($link,$login_sql);
        $login_arr = mysqli_fetch_row($login_res,1);
        if(count($login_arr) > 0){
            echo '{"err":0,"msg":"登录成功"}';
        }else{
            echo '{"err":-3,"msg":"账号或密码有误"}';
        }
    }
}
//  注册
if($type === 'add'){
    // 先查询注册账号是否存在
    $query_sql = "select * form urse where name='$u'";
    $query_res = mysqli_query($link,$query_sql);
    $query_arr = mysqli_fetch_all($query_res,1);
    if(count($query_arr) > 0){
        echo '{"err":-4,"msg":"账号已被占用"}';
    }else{
        // 新创建的账号，添加数据
        $insert_sql ="insert into urse(name,pass) values('$u','$p')";
        mysqli_query($link,$insert_sql);
        // 放回受影响的条数
        $num = mysqli_affected_rows($link);
        // 判断
        if($num > 0){
            echo '{"err":1,"msg":"注册成功"}';
        }else{
            echo '{"err":-5,"msg":"注册失败"}';
        }
    }
}
// 关闭数据库连接
mysqli_close($link);


?>