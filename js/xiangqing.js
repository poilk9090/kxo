//获取操作对象
window.onload=function(){
    var data
    var leftbox = document.querySelector('.mapbox') // 左边图片盒子
    var zhezhao = document.querySelector('.zhezao') //鼠标遮罩层
    var rightbox = document.querySelector('.rightgls') // 右边放大盒子
    var xuan = document.querySelector('.xuan') // 选择图片的盒子
    var imgs = xuan.querySelectorAll('img')  //xuan里面的所有图片
    // 给每个小盒子判定点击事件
    for(let i=0; i<imgs.length; i++){
        imgs[i].onmouseover=function(){
            //清除当前imgs标签的所有属性
            for(let j=0; j<imgs.length; j++){
                imgs[j].className=''
            }
            //给指定的图片添加class属性
            imgs[i].className='img1'
            //修改左右两边的大盒中的图片
            var img1 = leftbox.querySelector('img')
            var img2 = rightbox.querySelector('img')
            img1.setAttribute('src','../img/casio-'+(i+1)+'.png')
            img2.setAttribute('src','../img/casio-'+(i+1)+'.png')
            
        }
    }
    function show1(e){
        //鼠标相对于小盒子居中显示
        // var left1 = e.pageX-leftbox.offsetLeft-(zhezhao.offsetWidth/2)
        // var top1 = e.pageY-leftbox.offsetTop-(zhezhao.offsetHeight/2)
        // console.log(left1,top1)
        var left1=e.pageX-leftbox.offsetLeft-(zhezhao.offsetWidth/2)
        var top1=e.pageY-leftbox.offsetTop-(zhezhao.offsetHeight/2)

        //设置小盒子的移动范围
        var minX = minY=0
        var maxX = leftbox.offsetWidth-zhezhao.offsetWidth
        var maxY = leftbox.offsetHeight-zhezhao.offsetHeight

        //右边图片的移动距离
        var tmpX, tmpY
        //水平移动
        if(left1<minX){
            zhezhao.style.left=minX+'px'
            tmpX=minX
        }else if(left1>maxX){
            zhezhao.style.left=maxX+'px'
            tmpX=maxX
        }else{
            zhezhao.style.left=left1+'px'
            tmpX=left1
        }

        //垂直移动
        if(top1<minY){
            zhezhao.style.top=minY+'px'
            tmpY=minY
        }else if(top1>maxY){
            zhezhao.style.top=maxY+'px'
            tmpY=maxY
        }else{
            zhezhao.style.top=top1+'px'
            tmpY=top1
        }

        //获取右边图片
        var img = rightbox.querySelector('img')
        img.style.left=-2*tmpX+'px'
        img.style.top=-2*tmpY+'px'
    }

    //给left对象判定鼠标移入，移出，移动事件
    leftbox.onmouseover=function(e){
        var e = e || window.event
        zhezhao.style.display='block'
        rightbox.style.display='block'
        show1(e)
    }
    leftbox.onmousemove=function(e){
        var e = e || window.event
        show1(e)
    }
    leftbox.onmouseout=function(e){
        // var e = e || window.event
        zhezhao.style.display='none'
        rightbox.style.display='none'
    }


    // 收藏
    var xingbox = document.querySelector('.star')
    var xx1 = "★"
    var xx2 = "☆"
    var xing = xingbox.children[0].children[0].children[0]
    xing.onclick = function(){
        if(xing.innerHTML == '☆'){
            xing.innerHTML = xx1
            alert('收藏成功')
        }else{
            xing.innerHTML = xx2
            alert('已取消收藏')
        }
    }



}


// 获取操作对象

var div1 = document.querySelector('.glasscon')
//存放数据
var data
//获取地址栏的参数
var ids = location.search
//判断地址栏中是否有参数
if(ids){
    //获取id值  并截取 = 号 
    var mm = ids.split('=')[1]
    
    //使用ajax请求，并获取响应结果
    ajax({
        url:'../php/xiangqing.php',
        data:'id='+mm,
        success:function(dt1){
            //转换为json对象
            data=JSON.parse(dt1)
            //拼接详情页信息
            var str=
            `
                <div class="leftgls">
                    <div class="mapbox">
                        <img src="${data.img}" alt="">
                        <div class="zhezao"></div>
                    </div>
                    <div class="xuan">
                        <a href="javascript:;" class="a1"><</a>
                        <img src="${data.min_1}" alt="" class="img1">
                        <img src="${data.min_2}" alt="">
                        <img src="${data.min_3}" alt="">
                        <img src="${data.min_4}" alt="">
                        <img src="${data.min_5}" alt="">
                        <a href="javascript:;" class="a2">></a>
                    </div>
                </div>
                <div class="rightgls">
                    <img src="${data.img}" alt="">
                </div>

                <div class="righttext panel">
                    <div class="texttop">
                        <h3>卡西欧手表 G-SHOCK</h3>
                        <h4>${data.name}</h4>
                    </div>
                    <div class="price">
                        <h3>销售价： <span>￥${data.money}</span></h3>
                        <h3>购物积分 <i>${data.money}</i></h3>
                        <div class="star">
                            <ol>
                                <li><i>☆</i>收藏</li>
                            </ol>
                        </div>
                    </div>
                    <div class="amount">
                            <h3>数量</h3>
                            <div class="button1">
                                <span>-</span>
                                <input type="text" value="1" name="urse">
                                <span>+</span>
                            </div>
                    </div>
                    <div class="gouwuce">
                        <ul>
                            <li><a href="../html/denglu.html">立即购买</a></li>
                            <li><a href="../html/gouwuche.html">加入购物车</a></li>
                            <li>我要定制</li>
                        </ul>
                    </div>
                </div>
            
            `
            //把拼接好的数据添加到div对象中
            div1.innerHTML=str
        }
    })
}else{
        alert('未知商品，请从正规渠道进去')
        location.href='../../liebiaoye/html/liebiao.html'
}



// 给父节点绑定点击事件
div1.onclick=function(e){
    var e = e || window.event
    var target = e.target || e.srcElement
    //判断点击的对象是否为"加入购物车"
    if(target.innerHTML=='加入购物车'){
        //获取localstrong中的cartList2对象
        var cartList2 = localStorage.getItem('cartList2')
        //判断该减名是否存在
        if(cartList2){
            //转为josn对象
            var arr1 = JSON.parse(cartList2)
            var a = 0 //判断localstrong中是否有现在添加的商品
            //遍历arr1对象
            arr1.forEach(function(item){
                //判断该内容是否与添加的内容相同
                if(item.id==data.id){
                    //如果已存在。修改当前数组对象中的对应商品数量
                    item.good++
                    localStorage.setItem('cartList2',JSON.stringify(arr1))
                    a=1
                }
            })
            //判断a是否为1
            if(!a){
                //修改当前添加的商品数量
                data.good=1
                //把当前的商品追加到数组中
                arr1.push(data)
                localStorage.setItem('cartList2',JSON.stringify(arr1))
            }
        }else{
            data.good=1
            localStorage.setItem('cartList2',JSON.stringify([data]))
        }
    }
}