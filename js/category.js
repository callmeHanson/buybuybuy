$(function(){

$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getcategorytitle',
	success: function(data){
		console.log(data);
		$('.mm_category .mm_first_title_list').html(template('tpl', data));
		$('.mm_category .mm_first_title_list > li').each(function(i,e){
		})
	}
})

//给每一个一级li注册点击事件
$('.mm_category .mm_first_title_list').on('click', 'li.first_li > a', function(){
	console.log('heh');
	// console.log($(this).parent().siblings().find('.conn'));
	$(this).parent().siblings().find('.conn').addClass('hide');
	$(this).next().toggleClass('hide');
	var titleid = $(this).data('titleid');
	$.ajax({
		type: 'get',
		url: 'http://127.0.0.1:9090/api/getcategory',
		data:{
			titleid: titleid
		},
		success: function(data){
			console.log(data);
			// 渲染二级菜单
			$('.mm_category .mm_first_title_list .mm_second_title_list').html(template('tpl2', data));
		}
	})


})


})