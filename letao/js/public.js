// 实现a链接跳转
$(function(){

	// 恢复A元素的跳转
	$('body').on('tap', 'a', function(){
		mui.openWindow({
			url: $(this).attr('href')
		});
	});

});

//获取地址栏中的参数
function getPramesByURL(url,name){
		var prames = url.substr(url.indexOf('?')+1);
		var prame = prames.split('=');

		return prame[1];
}

