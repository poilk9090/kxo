//获取操作对象
var div1 = document.querySelector('.gouwuce')
//获取登录的cookie账号
var name1 = getCookie('login')
//获取url当前地址
var href1 = location.href
//判断cookie是否存在
if(name1){

}else{
    alert('你还未登录账号，请重新登录')
    //跳转到登录页面
    location.href='../../gouwuche/html/gouwuche.html?patUrl='+href1
}