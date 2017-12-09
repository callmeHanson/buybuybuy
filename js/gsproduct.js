$(function(){

// 获取天猫超市的商品列表
$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getgsshop',
	success: function(data) {
		console.log(data);
		$('.mm_coupon .mm_tianmao > ul').html(template('tpl', data));
		// 给第一个li加选中的类
		$('.mm_coupon .mm_tianmao > ul li:first-child').addClass('on');
	}
})
// 获取华南的地区列表
$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getgsshoparea',
	success: function(data) {
		console.log(data);
		$('.mm_coupon .mm_huanan > ul').html(template('tpl2', data));
		// 给第一个li加选中的类
		$('.mm_coupon .mm_huanan > ul li:first-child').addClass('on');
	}
})



var shopid = 0;
var areaid = 0;
// 页面首次渲染获取商品列表
render();

function render(shopid, areaid){

var paramsObj = {

};
paramsObj['shopid'] = shopid || 0;
paramsObj['areaid'] = areaid || 0;

$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getgsproduct',
	data: paramsObj,
	success: function(data) {
		console.log(data);
		$('.mm_coupon .mm_main > ul').html(template('tpl3', data));
	}
})


}


// 给每一个纵向div注册点击事件
// 完成打钩事件
$('.mm_coupon .mm_tianmao ul').on('click', 'li', function(){
	console.log('天猫');
	$(this).addClass('on').siblings().removeClass('on');
	// 修改button的文本内容
	var info = $(this).children('a').text();

	$(this).parent().prev().find('span:first-child').text(info);
	// 拿到点击的shopid
	shopid = $(this).children('a').data('shopid');
	console.log(shopid);

	// 重新渲染
	render(shopid, areaid);
})

$('.mm_coupon .mm_huanan ul').on('click', 'li', function(){
	console.log('华南');
	$(this).addClass('on').siblings().removeClass('on');
	// 修改button的文本内容
	var info = $(this).children('a').text();

	$(this).parent().prev().find('span:first-child').text(info);

	areaid = $(this).children('a').data('areaid');

	// 重新渲染
	render(shopid, areaid);
})

$('.mm_coupon .mm_all ul').on('click', 'li', function(){
	console.log('全部');
	$(this).addClass('on').siblings().removeClass('on');
	// 修改button的文本内容
	var info = $(this).children('a').text();

	$(this).parent().prev().find('span:first-child').text(info);
})









})