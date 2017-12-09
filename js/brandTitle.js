$(function() {

$.ajax({
	type: 'get',
	url: 'http://127.0.0.1:9090/api/getbrandtitle',
	success: function(data) {
		console.log(data);
		$('.mm_brand_wrap .brand_ul ul').html(template('tpl', data));
	}
})

	
})