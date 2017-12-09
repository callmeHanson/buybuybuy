$(function(){

// 从url中获取的brandTitleId
var brandTitleId=Tools.getParam('brandTitleId');
console.log(brandTitleId);

if (!brandTitleId) {
	return;

}

// pagesize
var pagesize = 4;

// productid
var productid = 0;


// 关于手机品牌的数据
$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getbrand',
	data: {
		brandtitleid: brandTitleId
	},
	success: function(data){
		console.log(data);
		// 平板电视哪个牌子好
		$('.mm_brand_wrap .brand_list ul').html(template('tpl', data));
		// 设置前三手机的颜色
		$('.mm_brand_wrap .brand_list ul > li').each(function(i,e){
			if (i === 0) {
				$(this).find('em').css('background-color','red');
			}
			if (i === 1) {
				$(this).find('em').css('background-color','#FF9315');
			}
			if (i === 2) {
				$(this).find('em').css('background-color','#8ADF5B');
			}

		})


	}
})

// 关于手机销量的数据
$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getbrandproductlist',
	data: {
		brandtitleid: brandTitleId,
		pagesize: pagesize
	},
	success: function(data){
		console.log(data);
		// 平板电视哪个牌子好
		$('.mm_sell_wrap .sell_list ul').html(template('tpl2', data));
		// 获取商品列表第一商品的productid
		productid=$('.mm_sell_wrap .sell_list > ul > li:first-child').find('a').data('productid');
		console.log('产品id是：'+productid);
		// 在获取到销量排行数据之后，将后续需要的数据保存到内存中，以备后续的ajax传参
		var productImg = $('.mm_sell_wrap .sell_list > ul > li:first-child').find('a').data('productimg');
		var productName= $('.mm_sell_wrap .sell_list > ul > li:first-child').find('a').data('productname');
		// console.log(productImg);
		// console.log(productName);
		// 关于评论列表
		$.ajax({
			type: 'get',
			url: 'http://127.0.0.1:9090/api/getproductcom',
			data: {
				productid: productid,
			},
			success: function(data) {
				console.log(data);
				$('.mm_comment_wrap .comment_list > ul').html(template('tpl3', data));

				// 修改模板中写死了的评论头
				$('.mm_comment_wrap .comment_list > ul > li').each(function(i,e){
					$(e).find('.comment_tit .img_wrap').html(productImg);
					$(this).find('.comment_tit .inf .tit').text(productName);
				})
			}
		})


	}
})








	
})