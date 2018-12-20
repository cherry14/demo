
$(function(){
	mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	// 一级分类获取
	$.ajax({
		url:'/category/queryTopCategory',
		type:'get',
		success:function(response){
			var html = template('category-first',{result:response.rows})
			// console.log(html)
			$('#links').html(html);
			if(response.rows.length) {
				$('#links').find('li').eq(0).addClass('active').siblings().removeClass('active');
				var id = response.rows[0].id;
				second(id);
			}
		}

	});

	

	// 获取二级分类
	$('#links').on('click','a',function(){
		var id = $(this).attr('data-id');
		$(this).parent('li').addClass('active').siblings().removeClass('active')
		second(id);
		
		
	})
	function second(id){
		$.ajax({
			url:'/category/querySecondCategory',
			type:'get',
			data:{
				id:id
			},
			success:function(response){
				var html = template('category-second',response)
				$('#cate-rightul').html(html);
				
			}
		})
	}
});