$(function(){
	$(".category").hover(function(){
		$(this).parent(".nav").css("border", "1px solid rgb(225, 225, 225)")
		$(this).parent(".nav").css("border-bottom", 0)
	}, function(){
		$(this).parent(".nav").css("border", 0)
	})
	
	TabBanner() //banner切换动画
})

//banner切换动画
var TabBanner = function(){
	var main_img = $("#main-img")
	var main_nav = $("#main-img-nav")
	var oul = main_img.children("ul")[0]
	var li = $(oul).children("li")	//array
	var tab = function(){
		oul.style.left -= $(li[0]).width() + "px"
	}
	
	setInterval(function(){
		tab()
	}, 2000)
}

//变速完美运动框架
function startMoveChange(obj, json, fnEnd){
}

