
window.onload = function(){
    // 获取对象的子节点
    var amount = document.querySelector('.amount .button1')
    // 减按钮
    var subtract = amount.children[0]
    // 加按钮
    var plus = amount.children[2]
    // 获取inp的val值
    var inp = amount.children[1].value
    var num 
    //  给按钮添加点击事件
    subtract.onclick = function(e){
        // 兼容 
        var e = e  ||  window.Event
        // 判断条件
        inp++
    }
}

