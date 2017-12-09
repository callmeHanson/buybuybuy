$(function(){

// 获取couponid
var couponid = Tools.getParam('couponid');
// 如果没有获取到id，不发送渲染页面请求
if (!couponid) {
	return;
}
$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getcouponproduct',
	data: {
		couponid: couponid
	},
	success: function(data){
		console.log(data);
		$('.mm_coupon .list ul').html(template('tpl', data));
	}


})


	
})