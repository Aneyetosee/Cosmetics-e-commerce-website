$('.questionTitle').on('click',function(){
    if(!$(this).hasClass('on')){
        $('.evernQuestionContentTitle').slideUp()
        $('.questionTitle').removeClass('on')
        $('.evernQuestionContent').slideUp()
        $('.evernQuestionContentTitle').removeClass('on')
        $(this).addClass('on').next().children('.evernQuestionContentTitle').slideDown('normal','linear')
    }else{
        $('.evernQuestionContentTitle').slideUp()
        $('.evernQuestionContent').slideUp()
        $('.evernQuestionContentTitle').removeClass('on')
        $(this).removeClass('on')
    }
    
})
$('.evernQuestionContentTitle').on('click',function(){
    if(!$(this).hasClass('on')){
        $('.evernQuestionContent').slideUp()
        $('.evernQuestionContentTitle').removeClass('on')
        $(this).addClass('on').children('.evernQuestionContent').slideDown('normal','linear')
    }else{
        $('.evernQuestionContent').slideUp()
        $(this).removeClass('on')
    }
})