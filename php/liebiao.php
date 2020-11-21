<?php
// 设置请求头
header('content-type:text/html;charset=utf-8');
// 链接数据库
$link=mysqli_connect('localhost','root','root','urse');
//设置编码
mysqli_set_charset($link,'utf8');
//执行SQL语句
$sql='select * from xiangmu where id!=0 ';
//执行SQL语句
$result=mysqli_query($link,$sql);
//创建存储数据的数组
$ar1=[];
//遍历结果集
while($row=mysqli_fetch_assoc($result)){
    //给数组添加元素
    array_push($ar1,$row);
}
//转换编码，并输出响应
echo json_encode($ar1);
?>