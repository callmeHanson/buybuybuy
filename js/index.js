$(function(){

// 顶部6宫格的数据渲染
$.ajax({
	type:'get',
	url: 'http://127.0.0.1:9090/api/getindexmenu',
	success: function(data) {
		console.log(data);
		var html = template('tpl', data);
		$('.mm_eight_icons ul').html(template('tpl', data));

		// 给第三排设置默认收缩的状态
		$('.mm_eight_icons ul li').each(function(i, e){
				if ($(e).data('indexmenuid') > 7) {
					$(e).addClass('hide');
				}

		})
		// 给更多 按钮注册点击事件
		$('.mm_eight_icons ul li:nth-of-type(8)').off().on('click',function(){
			$('.mm_eight_icons ul li').each(function(i, e){
				if ($(e).data('indexmenuid') > 7) {
					$(e).toggleClass('hide');
				}

			})
		})
	}
})

// 主体商品列表的渲染
$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getmoneyctrl',
	success: function(data){
		console.log(data);
		$('.mm_recommend_b ul').html(template('tpl2',data));
	}
})












})