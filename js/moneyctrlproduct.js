$(function(){



var id=Tools.getParam('id');
console.log(id);

$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getmoneyctrlproduct',
	data:{
		productid: id
	},
	success: function(data){
		console.log(data);
		// 折扣商品详情
		$('.main .mm_discount .discount_detail').html(template('tpl3', data));
		// 评论区内容
		$('.main .mm_comment').html(template('tpl', data));
		// 商品库存
		$('.main .mm_discount .center .content').html(template('tpl2', data));
	}
})





	
})