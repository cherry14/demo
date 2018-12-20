$(function(){
	$('#searchBtn').on('click',function(){
		// 点击获取，判断是否有关键字，没有的话就阻止跳转，有关键字跳转到‘搜索结果’页面
		var keyword  = $(this).siblings('input').val();
		if(keyword){
			keyArr.push(keyword);
			localStorage.setItem('keyArr',JSON.stringify(keyArr));

			location.href = "search-result.html?keword=" + keyword;
			// $('#keyword').val('');
			$(this).siblings('input').val('');
		}else {
			alert('请输入您想搜索的商品')
		}

		// 实现搜索历史
		

	})


	var keyArr = [];
	if(localStorage.getItem('keyArr')){
		
		keyArr = JSON.parse(localStorage.getItem('keyArr'));

		var html=template('search-first',{result:keyArr});
		$('#historySearch').html(html);
		
	}
	// 清空数据
	$('#clearHistory').on('click',function(){
		$('#historySearch').html("");
		localStorage.removeItem('keyArr');
		keyArr=[];
	})


	
})