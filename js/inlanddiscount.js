$(function(){


$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getinlanddiscount',
	success:function (data){
		console.log(data);
		$('.mm_coupon .mm_main ul').html(template('tpl', data));
		$('.img_wrap img').each(function(i,e){
			// console.log($(e).attr('src'));
			// 获取图片路径，存放到插件的指定属性：data-original
			var src=$(e).attr('src');
			$(this).attr('data-original', src);
			// 图片到第5张之后，再使用懒加载
			if (i>5) {
				$(e).lazyload({
					effect:'slideDown',//slideDown, show, fadeIn
				});
			}
		})

	}




})







	
})