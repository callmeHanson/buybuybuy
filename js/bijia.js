$(function(){


var obj=Tools.getParamsObj();
console.log(obj);

// 通过url传参
var brandName = obj.brandName,
		productId = obj.productId,
		category = obj.category;
		categoryId = obj.categoryId,
		pageId = obj.pageId;
if(!productId){
	return;
}
// 修改面包线的标题
$('.mm_container > .main .bread_line ol li:nth-of-type(2) a').text(category);
// 修改面保线的href
var retUrl = 'productlist.html?categoryId='+categoryId+'&category='+category+'&pageId='+pageId;

$('.mm_container > .main .bread_line ol li:nth-of-type(2) a').attr('href', retUrl);
$('.mm_container > .main .bread_line ol li:last-child a').text(brandName);

// 渲染单个媒体对象模块
$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getproduct',
	data: {
		productid: productId
	},
	success: function(data) {
		console.log(data);
		// 渲染标题
		$('.product_bijia .product_media > h3').text(data.result[0].productName);
		// 渲染图片
		$('.product_bijia .product_media > .img_wrapper').html(data.result[0].productImg);
		// 渲染表格数据
		$('.main .product_bijia .plist').html(data.result[0].bjShop);
	}
})

// 渲染评论模块
$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getproductcom',
	data: {
		productid: productId
	},
	success: function(data) {
		console.log(data);
		$('.product_bijia .comm ul').html(template('tpl', data));
	}
})


})