//省市地区选择
var province=$("#province"),city=$("#city"),town=$("#town");
for(var i=0;i<provinceList.length;i++){
    addEle(province,provinceList[i].name);
}
function addEle(ele,value){
    var optionStr="";
    optionStr="<option value="+value+">"+value+"</option>";
    ele.append(optionStr);
}
function removeEle(ele){
    ele.find("option").remove();
    var optionStar="<option value="+"请选择"+">"+"请选择"+"</option>";
    ele.append(optionStar);
}
var provinceText,cityText,cityItem;
province.on("change",function(){
    provinceText=$(this).val();
    $.each(provinceList,function(i,item){
        if(provinceText == item.name){
            cityItem=i;
            return cityItem
        }
    });
    removeEle(city);
    removeEle(town);
    $.each(provinceList[cityItem].cityList,function(i,item){
        addEle(city,item.name)
    })
});
city.on("change",function(){
    cityText=$(this).val();
    removeEle(town);
    $.each(provinceList,function(i,item){
        if(provinceText == item.name){
            cityItem=i;
            return cityItem
        }
    });
    $.each(provinceList[cityItem].cityList,function(i,item){
        if(cityText == item.name){
            for(var n=0;n<item.areaList.length;n++){
                addEle(town,item.areaList[n])
            }
        }
    });
});

//添加地址
var whichBtn;
$('.addAddress').on('click',function(){
    console.log($('.serialNumber').last().text())
    if($('.serialNumber').last().text()>=10){
        $('#modificationTitle').text('超出地址编辑上限，请删除一个地址后再操作')
        $('#modification').modal()
    }else if($('.serialNumber').last().text()!=10){
        $('#addressModal').modal()
        province.val('请选择')
        city.val('请选择')
        town.val('请选择')
        $('.particularAddress').val('')
        $('.addressee').val('')
        $('.addresseePhone').val('')
        $('.fixedTelephone').val('')
        $('.setDefault').removeProp('checked','checked')
        whichBtn = 'add';
    }
})
//点击保存
$('#saveAddressBtn').on('click',function(){
    if(whichBtn == 'add'){
        if(province.val()!='请选择'&&city.val()!='请选择'&&town.val()!='请选择'&&$('.particularAddress').val()!=''&&$('.addressee').val()!=''&&$('.addresseePhone').val()!=''){
            $('.chooseAddressPrompt').css('opacity','0')
            let phone = /^1(3|4|5|7|8)\d{9}$/
            let fixedPhone = /0\d{2,3}-\d{7,8}/
            if(phone.test($('.addresseePhone').val())){
                $('.chooseAddressPrompt').css('opacity','0')
                let addUserAddress = [];
                addUserAddress.push(province.val())
                addUserAddress.push(city.val())
                addUserAddress.push(town.val())
                addUserAddress.push($('.particularAddress').val())
                addUserAddress.push($('.addressee').val())
                addUserAddress.push($('.addresseePhone').val())
                if(fixedPhone.test($('.fixedTelephone').val())&&$('.fixedTelephone').val()!=''&&$('.fixedTelephone').val()!='NULL'){
                    addUserAddress.push($('.fixedTelephone').val())
                }else if($('.fixedTelephone').val()!=''&&$('.fixedTelephone').val()!='NULL'){
                    $('.chooseAddressPrompt').css('opacity','1').text('固定号码输入有误') 
                    addUserAddress.push('NULL')
                }else{
                    addUserAddress.push('NULL')
                }
                if($('.setDefault').is(':checked')){
                    addUserAddress.push('1')
                }else{
                    addUserAddress.push('0')
                }
                addUserAddress.push($('.zipCode').val())
                addUserAddress.push($('.serialNumber').last().text())
                console.log(addUserAddress)
                $.ajax({
                    type:'post',
                    url:'/shippingAddress.do',
                    data:{
                        'addUserAddress':JSON.stringify(addUserAddress)
                    },
                    success(data){
                        if(data=='0'){
                            $('#modificationTitle').text('添加失败，请稍后再试')
                            $('#modification').modal()
                        }else{
                            $('#modificationTitle').text('添加成功')
                            $('#modification').modal()
                            $('#closeAddressBtn').click()
                            console.log(data)
                            tablePage(data)
                            $('.addressAllNum').text($('.serialNumber').last().text())
                        }
                    }
                })
            }else{
                $('.chooseAddressPrompt').css('opacity','1').text('手机号码输入有误，请重新输入') 
            }
        }else{
            $('.chooseAddressPrompt').css('opacity','1').text('资料未填完整，请填写完整')
        }
    }else if(whichBtn == 'mod'){
        if(province.val()!='请选择'&&city.val()!='请选择'&&town.val()!='请选择'&&$('.particularAddress').val()!=''&&$('.addressee').val()!=''&&$('.addresseePhone').val()!=''){
            $('.chooseAddressPrompt').css('opacity','0')
            let phone = /^1(3|4|5|7|8)\d{9}$/
            let fixedPhone = /0\d{2,3}-\d{7,8}/
            if(phone.test($('.addresseePhone').val())){
                $('.chooseAddressPrompt').css('opacity','0')
                let chooseUserAddress = [];
                chooseUserAddress.push($('.serialNumber').data('serial'))
                chooseUserAddress.push(province.val())
                chooseUserAddress.push(city.val())
                chooseUserAddress.push(town.val())
                chooseUserAddress.push($('.particularAddress').val())
                chooseUserAddress.push($('.addressee').val())
                chooseUserAddress.push($('.addresseePhone').val())
                if($('.fixedTelephone').val()!='NULL'&&fixedPhone.test($('.fixedTelephone').val())&&$('.fixedTelephone').val()!=''){
                    chooseUserAddress.push($('.fixedTelephone').val())
                }else if($('.fixedTelephone').val()!=''&&$('.fixedTelephone').val()!='NULL'){
                    $('.chooseAddressPrompt').css('opacity','1').text('固定号码输入有误，请重新输入') 
                    chooseUserAddress.push('NULL')
                }else{
                    chooseUserAddress.push('NULL')
                }
                if($('.setDefault').is(':checked')){
                    chooseUserAddress.push('1')
                }else{
                    chooseUserAddress.push('0')
                }
                chooseUserAddress.push($('.zipCode').val())
                chooseUserAddress.push($('.serialNumber').last().text())
                console.log(chooseUserAddress)
                $.ajax({
                    type:'post',
                    url:'/chooseAddress.do',
                    data:{
                        'chooseUserAddress':JSON.stringify(chooseUserAddress)
                    },
                    success(data){
                        if(data=='0'){
                            $('#modificationTitle').text('添加失败，请稍后再试')
                            $('#modification').modal()
                        }else{
                            $('#modificationTitle').text('添加成功')
                            $('#modification').modal()
                            $('#closeAddressBtn').click()
                            console.log(data)
                            tablePage(data)
                            $('.addressAllNum').text($('.serialNumber').last().text())
                        }
                    }
                })
            }else{
                $('.chooseAddressPrompt').css('opacity','1').text('手机号码输入有误，请重新输入') 
            }
        }else{
            $('.chooseAddressPrompt').css('opacity','1').text('资料未填完整，请填写完整')
        }
    }
})
//修改地址
$('.addressTable').on('click','.modAddress',function(){
    $('#addressModal').modal()
    $('.particularAddress').val($(this).parent().parent().children().eq(1).children().eq(3).text())
    $('.addressee').val($(this).parent().parent().children().eq(2).text())
    $('.zipCode').val($(this).parent().parent().children().eq(4).text())
    $('.addresseePhone').val($(this).parent().parent().children().eq(3).text())
    $('.fixedTelephone').val($(this).parent().parent().children().eq(5).text())
    
    if($(this).next().next().text()=='默认地址'){
        $('.setDefault').prop('checked','checked')
    }else if($(this).next().next().text()=='设为默认'){
        $('.setDefault').removeProp('checked','checked')
    }
    whichBtn = 'mod';
})
//删除地址
var delObj
$('.addressTable').on('click','.delAddress',function(){
    delObj = $(this).parent().parent().children().eq(0).data('serial')
    $('#delPrompt').modal()
})
$('#saveDel').on('click',function(){
    console.log(delObj)
    $.ajax({
        type:'post',
        url:'/delAddress.do',
        data:{delObj},
        success(data){
            if(data=='0'){
                $('#modificationTitle').text('删除失败，请稍后再试')
                $('#modification').modal()
            }else{
                $('#modificationTitle').text('删除成功')
                $('#modification').modal()
                $('#closeSmallModal').click()
                console.log(data)
                tablePage(data)
                $('.addressAllNum').text($('.serialNumber').last().text())
            }
        }
    })
})
//设为默认地址
$('.addressTable').on('click','.setDefAddress',function(){
    $('.defAddress').removeClass('defAddress').addClass('setDefAddress').text('设为默认')
    $(this).removeClass('setDefAddress').addClass('defAddress').text('默认地址')
    let selectDef = $(this).parent().parent().children().eq(0).data('serial')
    $.ajax({
        type:'post',
        url:'/selectTheDefault.do',
        data:{selectDef},
        success(data){
            if(data=='1'){
                $('#modificationTitle').text('设置成功')
                $('#modification').modal()
            }else if(data=='0'){
                $('#modificationTitle').text('设置失败，请稍后再试')
                $('#modification').modal()
            }
        }
    })
})
//地址增加后出现的函数
function tablePage(arr){
    //清空表身
    $('.addressTableContent table tbody tr').remove()
    for(let i=0;i<arr.length;i++){
        $('.addressTableContent table tbody').append(`
        <tr>
            <td class="serialNumber" data-serial="${arr[i].a_id}">${i+1}</td>
            <td>
                <span>${arr[i].a_province}</span>
                <span>${arr[i].a_area}</span>
                <span>${arr[i].a_city}</span>
                <span>${arr[i].a_address}</span>
            </td>
            <td>${arr[i].a_people}</td>
            <td>${arr[i].a_phone}</td>
            <td>${arr[i].zipCode}</td>
            <td>${arr[i].a_phone2}</td>
            <td>
                <div class="modAddress">修改</div>
                <div class="delAddress">删除</div>
            </td>
        </tr>
        `)
        if(arr[i].setDefault==1){
            $('.delAddress').eq(i).after(`<div class="defAddress">默认地址</div>`)
        }else{
            $('.delAddress').eq(i).after(`<div class="setDefAddress">设为默认</div>`)
        }
    }
}