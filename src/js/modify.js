
//下拉框出现和消失
$('.select_showbox').on('click',function(){
    $('.modify-save-prompt').css('display','none')
    $('.select_option').slideToggle();
});
//下拉框hover效果
$('.select_option li').hover(function(){
    $(this).addClass('hover')
},function(){
    $(this).removeClass('hover')
})
//下拉框选择后文本
$('.select_option li').on('click',function(){
    $('.select_showbox').text($(this).text())
    $('.select_option').slideToggle();
})

//基本资料修改保存按钮
$('#nickname').focus(function(){
    $('.modify-save-prompt').css('display','none')
})
$('#birdayDate').focus(function(){
    $('.modify-save-prompt').css('display','none')
})
$('.savebtn').on('click',function(){
    if($('#nickname').val()!=''&&$('#birdayDate').val()!=''){
        let sex=$('.select_showbox').text(),
            nickname=$('#nickname').val(),
            birthday=$('#birdayDate').val()
        $.ajax({
            type:'post',
            url:'/changeModify.do',
            data:{
                sex,
                nickname,
                birthday
            },
            success(data){
                if(data=='1'){
                    $('#modification').modal()
                    $('#modificationTitle').text('修改成功')
                }else{
                    $('#modification').modal()
                    $('#modificationTitle').text('修改失败')
                }
            }
        })
    }else{
        $('.modify-save-prompt').css('display','block')
    }
})
//密码修改相关
$('.modifyPassword').on('click',function(){
    $('#passwordModal').modal()
    $('#newPassword').val('')
    $('#confirmNewPassword').val('')
    $('#originalPassword').val('')
})
$('#passwordSave').on('click',function(){
    if($('#newPassword').val()!=''&&$('#confirmNewPassword').val()!=''&&$('#originalPassword').val()!=''){
        if($('#newPassword').val()==$('#confirmNewPassword').val()){
            if($('#newPassword').val()!=$('#originalPassword').val()){
                let newPassword = $('#newPassword').val()
                let originalPasswor = $('#originalPassword').val()
                $.ajax({
                    type:'post',
                    url:'modifyPassword.do',
                    data:{
                        newPassword,
                        originalPasswor
                    },
                    success(data){
                        if(data=='modifySuccessfully'){
                            $('#modification').modal()
                            $('#modificationTitle').text('修改成功，请点击任意键后重新登录')
                            $('#passwordClose').click()
                            clickAnyKey()
                        }else if(data=='passwordErr'){
                            $('#modification').modal()
                            $('#modificationTitle').text('修改失败,原密码输入有误')
                        }
                    }
                })
            }else{
                $('#passwordPrompt').css({'opacity':'1'}).text('新密码和原密码一致')
            }
        }else{
            $('#passwordPrompt').css({'opacity':'1'}).text('两次输入的密码不一致')
        }
    }else{
        $('#passwordPrompt').css({'opacity':'1'}).text('修改密码时，不能有空')
    }
})
$('.modifyPasswordInput').on('focus',function(){
    $('#passwordPrompt').css({'opacity':'0'}).text('')
})
//手机号修改相关
$('.modifyPhone').on('click',function(){
    $('#phoneModal').modal()
    $('#messageText').val('')
    $('.phoneVerificationContent').text('请获取验证码')
    $('#inputMessageText').val('')
})
$('.phoneVerificationContent').on('click',function(){
    let valid_rule =/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    if(valid_rule.test($('#messageText').val())){
        $('#phonePrompt').css({'opacity':'0'}).text('')
        if($('.phoneVerificationContent').text()=='请获取验证码'){
            let i = 60;
            $('.phoneVerificationContent').text(i)
            let timer = setInterval(function(){
                if(i<=0){
                    $('.phoneVerificationContent').text('请获取验证码')
                    clearInterval(timer);
                }else{
                    i--
                    $('.phoneVerificationContent').text(i);
                }
            },1000)
            let messagePhone= $('#messageText').val()
            $.ajax({
                type:'post',
                url:'/newPhoneSms.do',
                data:{messagePhone},
                success(data){
                    if(data=='1'){
                        $('.prompt').text('短信已发送')
                    }else if(data=='0'){
                        $('.prompt').text('短信发送失败')
                    }
                }
            })
        }
    }else{
        $('#phonePrompt').css({'opacity':'1'}).text('请输入正确的手机号')
    }
})
$('#newPhoneSave').on('click',function(){
    if($('#messageText').val()!=''&&$('#inputMessageText').val()!=''){
        let newPhone= $('#messageText').val()
        let newPhoneVerificationCode = $('#inputMessageText').val()
        $.ajax({
            type:'post',
            url:'/newPhoneVerificationCode.do',
            data:{
                newPhone,
                newPhoneVerificationCode
            },
            success(data){
                console.log(data)
                if(data=='1'){
                    $('#modification').modal()
                    $('#modificationTitle').text('修改成功，请点击任意键后重新登录')
                    $('#newPhoneClose').click()
                    clickAnyKey()
                }else if(data=="0"){
                    $('#phonePrompt').css({'opacity':'1'}).text('验证码输入有误，请重新输入')
                }
            }
        })
    }else{
        $('#phonePrompt').css({'opacity':'1'}).text('手机号修改，不能有空')
    }
})

$('.phoneVerificationInput').on('focus',function(){
    $('#phonePrompt').css({'opacity':'0'}).text('')
})
$('.getVerificationInput').on('focus',function(){
    $('#phonePrompt').css({'opacity':'0'}).text('')
})
//点击任意键后返回首页
function clickAnyKey(){
    let i = 0;
    document.onmousedown=function(event){ 
        i++;
        if(i>=1){
            window.location.href='cancellation';
        }
    };
    let j = 0;
    document.onkeydown=function(event){ 
        j++;
        if(j>=1){
            window.location.href='cancellation';
        }
    };
}