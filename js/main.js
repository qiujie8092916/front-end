var title = ["X档案——我们一起翻山又越岭", "猫奴们的福利来了", "生活就像棉花糖，柔软又甜蜜", "约好了一起去那岛上拍照吧", "有一种美好叫早餐"]

var subtitle = ["", "by 喵呜不停", "", "by BalalaPure", "by 料理兔Adia"]

$(function(){
	$(".category").hover(function(){
		$(this).parent(".nav").css("border", "1px solid rgb(225, 225, 225)")
		$(this).parent(".nav").css("border-bottom", 0)
	}, function(){
		$(this).parent(".nav").css("border", 0)
	})
	
	TabBanner()
	
	loadMain(5, 20, 20)
	
	showBacktoTop($(window), $("#fix-btn"))
})

//加载瀑布流
var loadMain = function(onelineSum){
	var ap_li = ""
	
	ajax("data.json", function(data){
		var json_result = JSON.parse(data)
		$.each(json_result, function(i, e){
			ap_li += '<li class="item inline" data-index="' + i + '">\
									<a href>\
										<i class="img-header-style inline"></i>\
										<img src="imgs/main/' + i + '/p.jpeg" />\
									</a>\
									<div class="item-content">\
										<p class="item-desc">' + (e.desc === undefined ? "" : e.desc) + '</p>\
										<div class="number inline">\
											<span class="h">' + (e.heat === undefined ? "" : e.heat) + '</span>\
											<span class="l">' + (e.like === undefined ? "" : e.like) + '</span>\
											<span class="m">' + (e.message === undefined ? "" : e.message) + '</span>'
			if(e.price !== undefined){
				ap_li += '<span class="p"><a href class="gea">￥' + e.price + '</a></span>' 
			}
			ap_li += '</div>\
									<div class="item-attr">\
										<a href><img src="imgs/main/'+i+'/u.jpeg" /></a>\
										<div class="attr inline">\
											<a class="gea" href>' + (e.user_name === undefined ? "" : e.user_name) + '</a>\
											<p>收集到<a class="gea collect" href>' + (e.album === undefined ? "" : e.album) + '</a></p>\
										</div>\
									</div>\
								</div>\
							</li>' 
		})
		$(".fall ul").append(ap_li)
		
		fall(5, 20, 20)
		getUIHeight($('.fall ul')[0], $('.fall ul li'), onelineSum)
	})
}


//瀑布流布局
var fall = function(onelineSum, marginRight, marginBottom){	
	var totalNum = $(".fall ul li").length
	var width = 0
	var height = new Array()
	var offsetLeft = 0
	var offsetHeight = new Array()
	for(var i = 0; i < onelineSum; i++){
		offsetHeight[i] = 0
	}

	for(var j = 0; j < Math.ceil(totalNum / onelineSum); j++){	//column
		for(var i = 0; i < onelineSum; i++){	//row
			width = $("li[data-index=" + (onelineSum*j+i) + "]").width()
			height[i] = $("li[data-index=" + (onelineSum*j+i) + "]").height()
			
			$("li[data-index=" + (onelineSum*j+i) + "]").css("left", offsetLeft)
			$("li[data-index=" + (onelineSum*j+i) + "]").css("top", offsetHeight[i])
			
			offsetLeft += width + marginRight
			offsetHeight[i] += height[i] + marginBottom
		}
		offsetLeft = 0
	}
}


//获取瀑布流高度
var getUIHeight = function(outerObj, obj, onelineSum){
	var heiher = 0
	
	for(var i = 0; i < obj.length; i++){	//obj.length - onelineSum
		heiher = (obj[i].offsetTop + obj[i].offsetHeight) > heiher ? (obj[i].offsetTop + obj[i].offsetHeight) : heiher
	}
	outerObj.style.height = heiher + 'px'
}


//banner切换动画
var TabBanner = function(){
	var main_img = $("#main-img")
	var main_nav = $("#main-img-nav")
	var ul = main_img.children("ul")[0]
	var uli = $(ul).children("li")
	var ol = $(main_nav).children("ol")
	var oli = $(ol).children("li")
	var btnPrev = main_img.children("#a-btnl")
	var btnNext = main_img.children("#a-btnr")
	var duration = 400
	var interval = 5000
	var now = 0
	
	$(main_nav).children("#nav-span1").text(title[now])
	$(main_nav).children("#nav-span2").text(subtitle[now])
	
	$.each(oli, function(i, e){
		oli[i].index = i
		$(oli[i]).on("click", function(){
			now = this.index
			tab()
		})
	})
	
	$(btnPrev).on("click", function(){
		now --
		if(now === -1){
			now = oli.length-1
		}
		tab()
	})
	
	$(btnNext).on("click", function(){
		now ++
		if(now === oli.length){
			now = 0
		}
		tab()
	})

	var timer = setInterval(function(){
		$(btnNext).trigger("click")
	}, interval)
	
	var tab = function(){
		$(oli[now]).removeClass("active").siblings().removeClass("active")
		$(oli[now]).addClass("active")
		$(main_nav).children("#nav-span1").text(title[now])
		$(main_nav).children("#nav-span2").text(subtitle[now])
		$(ul).animate({left: -now * $(uli)[0].offsetWidth}, duration)
	}
}


//显示回到顶部
var showBacktoTop = function(win, btn){
	$win = win
	$win.scroll(function(){
		var height = $win.height()
		var scroll = $win.scrollTop()
		
		if(Math.floor(scroll / height * 4) > 1){
			btn.css("display", "inline-block")
		} else{
			btn.css("display", "none")
		}
	})
}