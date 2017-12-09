$(function(){

// 设置一个全局变量来设置ul的宽度
var ulW = 0;
var ulX = 0;

var ulXRight = 0;

$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
	success: function(data){
		console.log(data);

		// 白菜价数据标题都显示
		$('.mm_main .bcj_title ul').html(template('tpl', data));

		// 在li都渲染完成之后，通过累加来计算ul的宽度
		var length = $('.mm_main .bcj_title > ul > li').length;
		$('.mm_main .bcj_title > ul > li').each(function(i,e){
			// console.log($(e).innerWidth());

			// console.log(length);

			ulW += $(e).innerWidth();


		})
		// console.log(ulW);
		// 动态设置ul的宽度
		$('.mm_main .bcj_title > ul').css('width', ulW);

		// 给第一个li添加红色的样式
		$('.mm_main .bcj_title ul li').each(function(i,e){
			if (i == 0) {
				$(e).addClass('now');
			}
		})
		$.ajax({
			type: 'get',
			url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
			data: {
				titleid: 0
			},
			success:function(data) {
				console.log(data);
				
				$('.mm_main .bcj_list ul').html(template('tpl2', data));
				// 关于每一个商品详情li中超链接的text清除问题
				$('.mm_main .bcj_list ul li > a').text('').attr('target', '');
			}
		})
	}
})

// 给标题遍历追加点击事件
$('.mm_main .bcj_title ul').on('click', 'li', function(e) {
	console.log('hehe');

	// 关于变红样式
	$(this).addClass('now').siblings().removeClass('now');
	var titleid = $(this).data('titleid');

	// 初始化ulX为0，重新计算
	ulX = 0;
	// 在li都渲染完成之后，通过累加来计算ul的宽度
	$('.mm_main .bcj_title > ul > li').each(function(i,e){
		// console.log($(e).innerWidth());
		if (i<titleid) {
			ulX += $(e).innerWidth();
		}
		
	})
	console.log('ul原来位置在'+ulX);


	// li移动至最左端
	$('.mm_main .bcj_title ul').css({
		'transform': 'translateX(' + (-ulX) + 'px)'
	})
	$.ajax({
		type: 'get',
		url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
		data: {
			titleid: titleid
		},
		success:function(data) {
			console.log(data);

			$('.mm_main .bcj_list ul').html(template('tpl2', data));
			// 关于每一个商品详情li中超链接的text清除问题
			$('.mm_main .bcj_list ul li > a').text('').attr('target', '');
		}
	})
})

// ul的触摸滑动事件
var startX = 0;
var tempX = 0;
document.addEventListener('touchstart', function(e){
	console.log('heh1');
	startX = e.changedTouches[0].clientX;
})
document.addEventListener('touchmove', function(e){
	console.log('heh2');

	// 将动画效果取消
	$('.mm_main .bcj_title ul').css('transition', 'all .3s');
	var endX = e.changedTouches[0].clientX;
	var distanceX = endX - startX;

	console.log('手指移动了'+distanceX);
	tempX = -ulX+distanceX;
	console.log('ul当前位置在'+tempX);

	// 设置ul滑动俩边的极限
	if (tempX > 0) {
		tempX = 0;
	}
	var windowW = $(window).width();
	if (tempX < (-(ulW-windowW))) {
		console.log('到有头啦');
		console.log(ulW);
		tempX = -ulXRight;
	}
	// ul的动态滑动
	$('.mm_main .bcj_title ul').css({
	'transform': 'translateX(' + tempX + 'px)'
	})

})
document.addEventListener('touchend', function(e){
	console.log('heh3');
	ulX = -tempX;
})









})