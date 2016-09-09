$(function(){
	$(".category").hover(function(){
		$(this).parent(".nav").css("border", "1px solid rgb(225, 225, 225)")
		$(this).parent(".nav").css("border-bottom", 0)
	}, function(){
		$(this).parent(".nav").css("border", 0)
	})
})