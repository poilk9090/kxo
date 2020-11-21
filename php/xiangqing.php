<?php
//设置请求头
header('content-type:text/html:charset=utf-8');
//获取传递的参数
$id=$_GET['id'];
//连接数据库
$link=mysqli_connect('localhost','root','','bba');
//设置编码
mysqli_set_charset($link,'utf8');
//执行sql语句
$sql="select * from bb where id=$id";
//执行sql
$result=mysqli_query($link,$sql);
//获取结果集中的数据
$row=mysqli_fetch_assoc($result);
//给前端返回响应结果集
echo json_encode($row);
//关闭数据库连接
mysqli_close($link);
?>