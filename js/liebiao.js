// 轮播图 js

var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    effect : 'fade', //轮播效果
    autoplay:true,
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  })     
  // 左边 导航栏

  //获取操作对象
  var left = document.querySelector('.navleft>img')
  var logotop = document.querySelector('.logo')

  var str //设置滚动距离
  //window 绑定滚动条事件
  window.onscroll=function(){
    str=document.documentElement.scrollTop
    
    if(str>610){
      left.style='position:fixed; top:0; left:40px; z-index:1;display: block;'
      logotop.style='display:flex; top:0;  z-index:5;'

    }else{
      left.style='position:static; left:40px; botton:600px'

    }
  }





show1()
  // 获取数据库中的数据，并渲染在页面中
function show1(){
  //创建lid对象
    var $li=$('<li></li>')
    //使用ajax来获取数据
    $.ajax({
      url:'../php/liebiao.php',
      success:function(dt){
        //把json字符串转为json对象
        dt=JSON.parse(dt)
        //给第一个ol对象添加内容
        for(var i=0; i<8; i++){
          var $li=$(`
          <li>
              <img src="${dt[i].img}>
              <p>${dt[i].name}</p>
              <div class="manner">￥<span>${dt[i].money}</span>立即购买</div>
          </li>`)
          $('#list-one').append($li)
        }
       
        //配置分页信息
          var obj={
            pagenum:1,
            pagesize:8,
            totalsize:dt.length,
            totalppage:Math.ceil(dt.length/8)
          }
          
          //获取需要分页的对象
          var pagination=document.querySelector('.pagination')
          new Pagination(pagination,{
              pageInfo:obj,
              textInfo:{
                first:'首页',
                prev:'上一页',
                next:'下一页',
                last:'尾页'
              },change1(n){
                
                //截取数组中某段数据
                var arr = dt.slice((n-1)*obj.pagesize,n*obj.pagesize)
                
                //创建拼接内容的字符串
                var str=''
                //遍历截取的数据
                arr.forEach(function(item){
                  
                  str+=
                  `
                    <li>
                        <img src="${item.img}" alt="">
                        <p>${item.name}</p>
                        <a href="../html/xiangqingye.html?id=${item.id}"><div class="manner">￥<span>${item.money}</span>立即购买</div></a>
                    </li>
                  `
                })
                //获取商品父节点的对象
                document.querySelector('.list-one').innerHTML=str
              }
          })
      }
    })
    

}