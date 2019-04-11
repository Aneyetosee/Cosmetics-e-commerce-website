var shipId
$('.commentsOnTheGoods').on('click',function(){
    $('#messageBoard').modal()
    $('#massageContent').val('')
    shipId = $(this).data('index')
})

$('#sendMassage').on('click',function(){
    let massageContent = $('#massageContent').val()
    if(massageContent!=''){
        $.ajax({
            type:'post',
            url:'/massageContent.do',
            data:{shipId,massageContent},
            success(data){
                if(data=='1'){
                    $('.massagePromptContent').text('发送成功')
                    $('#massagePrompt').modal()
                    $('#closeMo').click()
                }else if(data=='0'){
                    $('.massagePromptContent').text('发送失败，请稍后再试')
                    $('#massagePrompt').modal()
                }
            }
        })
    }
})

$('#searchOrderBtn').on('click',function(){
    let searchOrderContent = $('#searchOrder').val()
        $.ajax({
            type:'post',
            url:'/searchOrder.do',
            data:{searchOrderContent},
            success(data){
                if(data=='0'){
                    $('table tbody').html(`
                        <tr>
                            <td><p>查询不到您的商品订单，请从新查询</p></td>
                        </tr>
                    `)
                }else{
                    let orderData = data.arr
                    let reNumArr = data.reNumArr
                    pageRendering(orderData[0],reNumArr)
                }
            }
        })
})

function pageRendering(arr,reNumArr){
    $('table tbody').html('')
    arr.forEach((item,index) => {
        $('table tbody').append(`
            <tr>
                <td class="shipContent">
                    <img src="/images/${arr[index].d_smallSrc}" alt="pic">
                    ${arr[index].d_chinese}
                </td>
                <td>${arr[index].d_price}元</td>
                <td>${arr[index].order_class_num}</td>
                <td class="comments"></td>
            </tr>
        `)
        if(arr[index].ord_ord_id){
            $('table tbody tr .shipContent').eq(index).before(`
                <td class="orderNumber" rowspan="${reNumArr[index]}">${arr[index].ord_ord_id}</td>
            `)
        }
        if(arr[index].ord_ord_id){
            $('table tbody tr .comments').eq(index).before(`
                <td rowspan="${reNumArr[index]}">${arr[index].o_money}元</td>
                <td rowspan="${reNumArr[index]}" class="roderStatus"></td>
            `)
            if(arr[index].order_status==10){
                $('table tbody tr .roderStatus').eq(index).append(`
                    <div class="unpaid">待支付</div>
                    <div class="orderDetails" data-order='${arr[index].ord_ord_id}'>详情</div>
                    <div class="clearRoder" data-order='${arr[index].ord_ord_id}' data-sure="false">取消订单</div>
                `)
            }else if(arr[index].order_status==20){
                $('table tbody tr .roderStatus').eq(index).append(`
                    <div class="toPaid">待发货</div>
                    <div class="orderDetails" data-order='${arr[index].ord_ord_id}'>详情</div>
                `)
            }else if(arr[index].order_status==30){
                $('table tbody tr .roderStatus').eq(index).append(`
                    <div class="sendGoods">已发货</div>
                    <div class="orderDetails" data-order='${arr[index].ord_ord_id}'>详情</div>
                    <div class="makeSure" data-sure="false">确认收货</div>
                `)
            }else if(arr[index].order_status==40){
                $('table tbody tr .roderStatus').eq(index).append(`
                    <div class="sendGoodsed">交易成功</div>
                    <div class="orderDetails" data-order='${arr[index].ord_ord_id}'>详情</div>
                `)
            }else if(arr[index].order_status==50){
                $('table tbody tr .roderStatus').eq(index).append(`
                    <div class="received">交易失败</div>
                    <div class="orderDetails" data-order='${arr[index].ord_ord_id}'>详情</div>
                `)
            }
        }
        if(arr[index].order_status==40){
            $('.orderNumber').append(`
                <div class="commentsOnTheGoods" data-index="${arr[index].ord_o_id}">评论商品</div>
            `)
            
        }
    });
}

//点击确认收货按钮
var orderNum;
$('.orderTableContent').on('click','.makeSure',function(){
    $('#markSurePrompt').modal()
    orderNum = $(this).prev().data('order')
    $(this).attr('data-sure','true')
    console.log(orderNum)
})
$('#suerSave').on('click',function(){
    console.log(orderNum)
    $.ajax({
        type:'post',
        url:'/makeSure.do',
        data:{orderNum},
        success(data){
            if(data=='1'){
                $('.massagePromptContent').text('修改成功')
                $('#massagePrompt').modal()
                $('#quitSure').click()
                $('.makeSure[data-sure="true"]').prev().prev().addClass('sendGoodsed').removeClass('.sendGoods').text('交易成功')
                $('.makeSure[data-sure="true"]').remove()
            }else if(data=='0'){
                $('.massagePromptContent').text('修改失败，请稍后再试')
                $('#massagePrompt').modal()
                $('#quitSure').click()
            }
        }
    })
})
//点击详情
$('.orderTableContent').on('click','.orderDetails',function(){
    orderNum = $(this).data('order')
    $('#orderNum').text('')
    $('#orderPeople').text('')
    $('#orderArdess').text('')
    $('#orderPhone').text('')
    $('#orderCourier').text('') 
    $('#orderMoney').text('')
    $('.shipOrderContent').text('')
    console.log(orderNum)
    $.ajax({
        type:'post',
        url:'details.do',
        data:{orderNum},
        success(data){
            console.log(data)
            $('#orderNum').text(data[0].ord_ord_id)
            if(data[0].o_user){
                $('#orderPeople').text(data[0].o_user)
            }
            if(data[0].o_province||data[0].o_city||data[0].o_area||data[0].o_address){
                $('#orderArdess').text(`${data[0].o_province}${data[0].o_city}${data[0].o_area}${data[0].o_address}`)
            }
            if(data[0].o_phone){
               $('#orderPhone').text(data[0].o_phone) 
            }
            if(data[0].shipping_comp_name){
                $('#orderCourier').text(data[0].shipping_comp_name)
            }
            $('#orderMoney').text(data[0].o_money+'元')
            for(let i=0;i<data.length;i++){
                $('.shipOrderContent').append(`
                    <div class="shipDetailedC fl">
                        <span class="orderAbout">${data[i].d_chinese}:</span>
                        <img src="/images/${data[i].d_smallSrc}" alt="pic" class="orderPic">
                    </div>
                `)
            }
            
            $('#detailsContent').modal()
        }
    })
})
//取消未支付订单
$('.orderTableContent').on('click','.clearRoder',function(){
    orderNum = $(this).data('order')
    $('#clearPrompt').modal()
    $(this).attr('data-sure','true')
})
$('#clearSave').on('click',function(){
    $.ajax({
        type:'post',
        url:'clearOrder.do',
        data:{orderNum},
        success(data){
            if(data=='1'){
                $('.massagePromptContent').text('取消成功')
                $('#massagePrompt').modal()
                $('.clearRoder[data-sure="true"]').prev().prev().addClass('received').removeClass('unpaid').text('交易失败')
                $('.clearRoder[data-sure="true"]').remove()
                $('#quitClear').click()
            }else if(data=="0"){
                $('.massagePromptContent').text('取消失败，请稍后再试')
                $('#massagePrompt').modal()
                $('#quitClear').click()
            }
        }
    })
})