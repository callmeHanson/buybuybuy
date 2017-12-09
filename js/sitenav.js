$(function() {


$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getsitenav',
	success: function(data){
		console.log(data);
		$('.mm_coupon .mm_main ul').html(template('tpl', data));
	}


})


	
})