$(function(){

var category = Tools.getParam('category');
var categoryId=Tools.getParam('categoryId');
var pageId = Tools.getParam('pageId');


if (!categoryId || !pageId ) {
	return;
}
// console.log('heht');




console.log(category);
console.log(categoryId);
console.log(pageId);

// 面包线的处理
console.log($('.mm_container .main .bread_line li:nth-of-type(3)').text(category));

$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getproductlist',
	data: {
		categoryid: categoryId,
		pageid: pageId
	},
	success: function(data){
		console.log(data);
		// 渲染页面的展示
		$('.mm_container > .main .detail_list ul').html(template('tpl', data));
		// 分页的数据处理
		$('.mm_page .mm_select_page select').html(template('tpl2', data));

		// 标题数据只要获取一次，放在首次页面渲染来获取
		
		// 遍历每一个li，获取当中的a标签，然后修改当中的href属性
		console.log($('.mm_container > .main .detail_list ul'));

		$('.mm_container > .main .detail_list ul a').each(function(i, e){
			var href=$(e).attr('href');
			// console.log(href);
			href += '&category='+category;
			href += '&categoryId='+categoryId;
			href += '&pageId='+pageId;
			$(e).attr('href', href);
			// 顺便把返回的url也传过去
			


		})
	}
})




function renderPage( categoryId, pageId){




	$.ajax({
		type: 'get',
		url: 'http://127.0.0.1:9090/api/getproductlist',
		data: {
			categoryid: categoryId,
			pageid: pageId
		},
		success: function(data){
			console.log(data);
			// 渲染页面的展示
			$('.mm_container > .main .detail_list ul').html(template('tpl', data));
			// 分页的数据处理
			// $('.mm_page .mm_select_page select').html(template('tpl2', data));
		}
	})

}


// 分页功能

// 上一页
$('.mm_page .last').on('click', function(){
	console.log('hehe');
	pageId --;

	if (pageId <= 0) {
		pageId ++;
		return ;
	}
	// 修改select最大值
	$('.mm_page .selectPage').val(pageId);
	renderPage(categoryId, pageId);

})

// 下一页
$('.mm_page .next').on('click', function(){
	console.log('gun');
	pageId ++;
	// 获取最大值
	var max=$('.mm_page .selectPage').children().eq(0).data('pagemax');
	
	// // console.log(max);
	if (pageId > max) {
		pageId --;
		return ;
	}
	// // 修改select最大值
	$('.mm_page .selectPage').val(pageId);
	renderPage(categoryId,pageId);

})

// select选项
$('.mm_page .selectPage').on('change', function(e){
	e.preventDefault();
	console.log('change');
	// 获取保存在option中的总数目
	// console.log($(this).children().eq(0).data('pagemax'));
	// 修改公共变量pageid
	pageId = $(this).val();
	console.log(pageId);

	renderPage(categoryId, pageId);


})

	
})