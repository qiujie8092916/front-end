title = ["X档案——我们一起翻山又越岭", "猫奴们的福利来了", "生活就像棉花糖，柔软又甜蜜", "约好了一起去那岛上拍照吧", "有一种美好叫早餐"]
subtitle = ["", "by 喵呜不停", "", "by BalalaPure", "by 料理兔Adia"]

$(function(){
	$(".category").hover(function(){
		$(this).parent(".nav").css("border", "1px solid rgb(225, 225, 225)")
		$(this).parent(".nav").css("border-bottom", 0)
	}, function(){
		$(this).parent(".nav").css("border", 0)
	})
	
	TabBanner()
	
	if($(window).width() <= 1262){
		loadMain(4)
	} else{
		loadMain(5)
	}
	$(window).resize(function(){
		if($(window).width() <= 1262){
			fall(4, 20, 20)
		} else{
			fall(5, 20, 20)
		}
	})
	
	showBacktoTop($(window), $("#fix-btn"))
})

//加载瀑布流
var loadMain = function(onelineSum){
	var ap_li = ""
	$.when(defer("data.json")).done(function(json_result){
		/*var json_result = eval('(' + data + ')')*/
		$.each(json_result, function(i, e){
			ap_li += '<li class="item inline" data-index="' + i + '">\
									<div class="crollbtn">\
										<button class="a"><i></i><em>收集 '+e.heat+'</em></button>\
										<button class="b"></button>\
										<button class="c"></button>\
									</div>\
									<a href class="lg-img">\
										<i class="img-header-style inline"></i>\
										<img src="imgs/main/' + i + '/p.jpeg" width="224" height="100%" />\
									</a>\
									<div class="item-content">\
										<p class="item-desc">' + (e.desc === undefined ? "" : e.desc) + '</p>\
										<div class="number inline">\
											<span class="h">' + (e.heat === undefined ? "" : e.heat) + '</span>\
											<span class="l">' + (e.like === undefined ? "" : e.like) + '</span>\
											<span class="m">' + (e.message === undefined ? "" : e.message) + '</span>'
			if(e.price !== undefined){
				ap_li += 			'<span class="p"><a href class="gea">￥' + e.price + '</a></span>' 
			}
			ap_li += 			'</div>\
										<div class="item-attr">\
											<a href><img src="imgs/main/'+i+'/u.jpeg" /></a>\
											<div class="attr inline">\
												<a class="gea" href>' + (e.user_name === undefined ? "" : e.user_name) + '</a>\
												<p>收集到<a class="gea collect" href>' + (e.album === undefined ? "" : e.album) + '</a></p>\
											</div>\
										</div>'
				
			if(e.message !== undefined){
				for(var j = 0; j < e.message; j++){
					ap_li +=	'<div class="item-attr">\
											<a href><img src="imgs/main/'+i+'/c_' + (j+1) + '.jpeg" /></a>\
											<div class="attr inline">\
												<a class="gea" href>' + e["comment_user_" + (j+1)] + '</a>\
												<p>' + e["comment_" + (j+1)] + '</p>\
											</div>\
										</div>'
				}
			}
			ap_li +=		'</div>\
								</li>'
		})
		$(".fall ul").append(ap_li)
		
		itemCrollBtn()
		
		if($(window).width() <= 1262){
			// 判断图片加载状况，加载完成后回调
			isImgLoad(function(){
				fall(onelineSum, 20, 20)
			});
		} else{
			// 判断图片加载状况，加载完成后回调
			isImgLoad(function(){
				fall(onelineSum, 20, 20)
			});
		}
	})
}


var t_img; // 定时器
var isLoad = true; // 控制变量
function isImgLoad(callback){	// 判断图片加载的函数
    // 注意我的图片都是lg-img下的img，因为我只需要处理$('.lg-img img')。其它图片可以不管。
    // 查找所有封面图，迭代处理
    $('.lg-img img').each(function(){
        // 找到为0就将isLoad设为false，并退出each
        if(this.height === 0){
            isLoad = false;
            return false;
        }
    });
    // 为true，没有发现为0的。加载完毕
    if(isLoad){
        clearTimeout(t_img); // 清除定时器
        // 回调函数
        callback();
    // 为false，因为找到了没有加载完成的图，将调用定时器递归
    }else{
        isLoad = true;
        t_img = setTimeout(function(){
            isImgLoad(callback); // 递归扫描
        },500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
    }
}


//瀑布流布局
var fall = function(onelineSum, marginRight, marginBottom){
	var totalNum = $(".fall ul li").length
	var offsetHeight = new Array()
	for(var i = 0; i < onelineSum; i++){
		offsetHeight[i] = 0
	}

	for(var j = 0; j < Math.ceil(totalNum / onelineSum); j++){	//row
		var offsetLeft = 0
		var height = new Array()
		for(var i = 0; i < onelineSum; i++){	//column
			var width = $("li[data-index=" + (onelineSum*j+i) + "]").width()
			height[i] = $("li[data-index=" + (onelineSum*j+i) + "]").height()
			
			$("li[data-index=" + (onelineSum*j+i) + "]").css("left", offsetLeft)
			$("li[data-index=" + (onelineSum*j+i) + "]").css("top", offsetHeight[i])
			
			offsetLeft += width + marginRight
			offsetHeight[i] += height[i] + marginBottom
		}
	}
	
	getUIHeight($('.fall ul')[0], $('.fall ul li'), onelineSum)
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
	btn.children(".back-top").on("click", function(){
		$("body").animate({scrollTop:0}, 250)
	})
}


//固定条目快捷收集键
var itemCrollBtn = function(){
	var $win = $(window)
	
	$(".fall").find("li.item").hover(function(){
		var crollbtn = $(this).children(".crollbtn")
		
		if($(this).offset().top - $(document).scrollTop() < 65){
			crollbtn.css("position", "fixed")
			crollbtn.css("left", $(this).offset().left)
			crollbtn.css("top", 65)
		} else{
			crollbtn.css("position", "absolute")
			crollbtn.css("left", 0)
			crollbtn.css("top", 0)
		}
		crollbtn.css("display", "inline-block")
		
	}, function(){
		var crollbtn = $(this).children(".crollbtn")
		crollbtn.css("display", "none")
	})
	
	$win.scroll(function(){
		$(".fall").find("li.item").each(function(){
			var crollbtn = $(this).children(".crollbtn")
			if($(this).offset().top - $(document).scrollTop() < 65){
				crollbtn.css("position", "fixed")
				crollbtn.css("left", $(this).offset().left)
				crollbtn.css("top", 65)
			} else{
				crollbtn.css("position", "absolute")
				crollbtn.css("left", 0)
				crollbtn.css("top", 0)
			}
		})
	})
}


var defer = function(url, data){
	var df = $.Deferred();
	$.ajax({
		type: "post",
 		url: url,
		data: data,
		success: function(data, textStatus){df.resolve(data);}
	});
	return df.promise();
}