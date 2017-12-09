// 将方法们封装成一个工具类的对象
var Tools = {
	getParamsObj: function () {
		// 获取地址栏，并对参数进行解码
		var url = location.search;
		url = decodeURI(url);
		// 裁切掉？字符
		var params = url.slice(1);
		// 如何截取掉最后一个
		// url.slice(0, -1);
		// console.log(params);
		var arr = params.split('&');
		var obj = {};
		arr.forEach(function (item, index){
			var key = item.split('=')[0];
			var value = item.split('=')[1];
			obj[key] = value;
		})

		return obj;
	},
	getParam: function (key) {
		return this.getParamsObj()[key];
	}
}