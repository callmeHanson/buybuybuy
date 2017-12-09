$(function(){



function render(){

	$.ajax({
		type: 'get',
		url: 'http://127.0.0.1:9090/api/getmoneyctrl',

		success: function(data){
			console.log(data);
			$('.main ul').html(template('tpl', data));
			$('.mm_page .selectPage').html(template('tpl2', data));
		}
	})

}
function renderPage(pageid){

	$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getmoneyctrl',
	data: {
		pageid: pageid
	},
	success: function(data){
		console.log(data);
		$('.main ul').html(template('tpl', data));
		$('.mm_page selectPage').html(template('tpl2', data));
	}
})

}
render();


// 分页功能

var pageid = 1;
// 上一页
$('.mm_page .last').on('click', function(){
	console.log('hehe');
	pageid --;

	if (pageid <= 0) {
		pageid ++;
		return ;
	}
	// 修改select最大值
	$('.mm_page .selectPage').val(pageid);
	renderPage(pageid);

})

// 下一页
$('.mm_page .next').on('click', function(){
	console.log('gun');
	pageid ++;
	// 获取最大值
	var max=$('.mm_page .selectPage').children().eq(0).data('pagemax');
	console.log(max);
	
	// console.log(max);
	if (pageid > max) {
		pageid --;
		return ;
	}
	// 修改select最大值
	$('.mm_page .selectPage').val(pageid);
	renderPage(pageid);

})

// select选项
$('.mm_page .selectPage').on('change', function(e){
	e.preventDefault();
	console.log('change');
	// 获取保存在option中的总数目
	console.log($(this).children().eq(0).data('pagemax'));
	// 修改公共变量pageid
	pageid = $(this).val();
	console.log(pageid);

	renderPage(pageid);


})

})