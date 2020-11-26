//获取操作对象
var div1 = document.querySelector('.gwcbox')
//获取登录的cookie账号
var name1 = getCookie('login')
//获取url当前地址
var href1 = location.href

var cartList2

showCart()
function showCart(){
    //获取localstrong中的cartList2对应的数据
    cartList2=localStorage.getItem('cartList2')
    
    //判断cookie是否存在
    // if(name1){
        //判断该内容是否存在
        if(cartList2){
            //将caetList2中的数据转为json对象
            cartList2=JSON.parse(cartList2)

            //判断全选框是否被选中
            var quan=cartList2.every(item=>{
                return item.is_select==1
            })

            //获取选中的商品数量与价格
            var tt=total1()

            //创建需要拼接的内容
            var str2 = 
            `
            <div class="gwccon">
                <div class="quanxuan">
                    <div class="quanxuanbox">
                        <div class="quan-1">
                            <input type="checkbox" name="quanxuan" ${quan==1?"checked":''}>
                            <span>全选</span>
                        </div>
                        <i>清空购物车</i>
                        <i>商品数量：<u>${tt[0]}</u></i>
                        <div class="totalprice">
                            <h3>订单金额总计：￥<span>${tt[1]}</span></h3>
                        </div>
                        <div class="account">
                            <div class="accon">
                                <button>结算</button>
                            </div>
                        </div>
                        
                    </div>
                    <div class="xiangxi">
                        <ol>
                            <li>全选</li>
                            <li>商品名称</li>
                            <li>单价(元)</li>
                            <li>数量</li>
                            <li>金额(元)</li>
                            <li>操作</li>
                        </ol>
                    </div>
                </div>
            `
            //遍历数组中所有对象
            cartList2.forEach(function(item){
                str2+=
                `
                    <div class="moon">
                        <div class="wpbox">
                            <div class="wp-1">
                                <ol>
                                    <li><input type="checkbox" data-id=${item.id} name="xuan" ${item.is_select==1?"checked":''}></li>
                                    <li><img src="${item.img}" alt="" width="66" height="66"></li>
                                </ol>
                            </div>
                            <div class="wp-2">
                                <ul>
                                    <li class="uls-1">
                                        ${item.name}
                                    </li>
                                    <li class="uls-2">￥<span>${item.money}</span></li>
                                    <li class="uls-3">
                                        <div class="text">
                                            <button type="button" data-id=${item.id}>-</button>
                                            <button type="text" name="urse" value="${item.money}">${item.number}</button>
                                            <button type="button" data-id=${item.id}>+</button>
                                        </div>
                                    </li>
                                    <li class="uls-4">￥<span>${item.money}</span></li>
                                    <li class="uls-5" data-id=${item.id}>删除</li>
                                </ul>
                            </div>
                        </div>.
                    </div>

                `
                //拼接显示内容
            

                //把拼接好的内容添加到div1中
                div1.innerHTML=str2
            })

        }else{
            //拼接显示内容
            var str1 = 
            `
            <div class="gwcbox">
                <div class="gwccon">
                    <div class="quanxuan">
                        <div class="quanxuanbox">
                            <div class="quan-1">
                                <input type="checkbox" name="quanxuan">
                                <span>全选</span>
                            </div>
                            <i>删除选中的商品</i>
                            
                        </div>
                        <div class="xiangxi">
                            <ol>
                                <li>全选</li>
                                <li>商品名称</li>
                                <li>单价(元)</li>
                                <li>数量</li>
                                <li>金额(元)</li>
                                <li>操作</li>
                            </ol>
                        </div>
                    </div>
                    
                    <div class="totalprice">
                        <h3>订单金额总计：￥<span></span></h3>
                    </div>
                    <div class="account">
                        <div class="accon">
                            <input type="submit" value="结算">
                        </div>
                    </div>
                </div>
            </div>

            `
            //把拼接好的内容追加到div中
            div1.innerHTML=str1

        }

    // }else{
        // alert('你还未登录账号，请重新登录')
        // //跳转到登录页面
        // location.href='../html/denglu.html?patUrl='+href1
    // }
}

//给父级对象绑定点击事件
window.onload = function(){
    var text = document.querySelector('.text')
    var textval = text.children[1]
    

    div1.onclick=function(e){
        var e = e || window.event
        var target=e.target || e.srcElement
        //加法
        if(target.innerHTML=='+'){
            
            //获取当亲对象中data-id
            var id1=target.getAttribute('data-id')
            var val=parseInt(target.previousElementSibling.value)
            console.log(val);
            
            //遍历数组
            cartList2.forEach(item=>{
                if(item.id==id1){
                    item.number=item.number-0+1
                }
            })
            localStorage.setItem('cartList2',JSON.stringify(cartList2))
            showCart()
        }
        //减法
        if(target.innerHTML=='-'){
            //获取当亲对象中data-id
            var id2=target.getAttribute('data-id')
            var val=parseInt(target.nextElementSibling.value)

            //遍历当前数组
            cartList2.forEach(item=>{
                if(item.id==id2 && val>1){
                    item.number=item.number-1
                    if(item.number <= 0){
                        item.number=0
                        alert("不能再减啦")
                    }
                }
            })
            localStorage.setItem('cartList2',JSON.stringify(cartList2))
            showCart()
        }

        //删除
        if(target.innerHTML=='删除'){
            //获取当前商品id
            var id3=target.getAttribute('data-id')
            //过滤
            cartList2=cartList2.filter(item=>{
                return item.id!=id3
            })
            localStorage.setItem('cartList2',JSON.stringify(cartList2))
            showCart()
        }
        //全选
        if(target.name=='quanxuan'){
            //遍历所有商品
            cartList2.forEach(item=>{
                //判断当前全选框是否被选中
                if(target.checked){
                    item.is_select=1
                }else{
                    item.is_select=0
                }
            })
            localStorage.setItem('cartList2',JSON.stringify(cartList2))
            showCart()
        }

        //选中框

        if(target.name=='xuan'){
            //获取当前商品的id
            var id4=target.getAttribute('data-id')
            //遍历数组
            cartList2.forEach(item=>{
                //判断是否为当前操作的商品
                if(item.id==id4){
                    item.is_select=item.is_select==1?0:1
                    //判断商品是否被选中
                    if(item.is_select==1){
                        item.is_select==0
                    }else{
                        item.is_select==1
                    }
                }
            })
            localStorage.setItem('cartList2',JSON.stringify(cartList2))
            showCart()
        }

        //总算
        if(target.innerHTML=='结算'){
            //获取需要支付的总金额
            var totalprice=total1()[1]
            //使用确认款，
            if(confirm("你将要吃土")){
                alert("你已支付："+totalprice)
                //删除已购买的商品
                cartList2=cartList2.filter(item=>{
                    return item.is_select!=1
                })
            }
            localStorage.setItem('cartList2',JSON.stringify(cartList2))
            showCart()
        }
        //判断是否为清空购物车按钮
        if(target.innerHTML=="清空购物车"){
            // localStorage.clear()
            localStorage.removeItem('cartList2')
            showCart()
        }
    }
}
//总计方法

function total1(){
    //商品数量
    var num=0
    //商品价格
    var numprice=0
    //遍历数组元素
    cartList2.forEach(item=>{
        //判断该商品是否被选中
        if(item.is_select==1){
            //累加被选中商品的数量
            num+=parseInt(item.number)
            //累加被选中所有商品的小计
            numprice+=parseInt(item.number)*parseFloat(item.money)
        }
    })
    return [num,numprice.toFixed(2)]
}