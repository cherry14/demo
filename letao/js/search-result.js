	// 获取关键字，调取接口，将搜索结果展示在页面中
	
	var keyword = getPramesByURL(location.href,'keyword');
	//设置当前页为第一页
	var page = 1;
	var html= "";

	// 价格排序  默认1为升序
	var price = 1;

	// 销量排序
	var numSort =1;

	// 确定this指向
	var This = null;


$(function(){
	// 滚动插件
	mui.init({
  		pullRefresh : {
    	container:refreshContainer,//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    	up : {
      	height:50,//可选.默认50.触发上拉加载拖动距离
      	auto:true,//可选,默认false.自动上拉加载一次
     	contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
      	contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
      	callback :getData//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；

				}
			}
	})	

	// 移动端轻击事件
	$('#priceSort').on('tap',function(){
		
		price = price==1?2:1;
		if(price==1){
			$('#priceSort').find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
		}else {
			$('#priceSort').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
		}

		var page = 1;
		var html= "";
		mui('#refreshContainer').pullRefresh().refresh(true);
		getData();
	})	
  
});



function getData(){
	if(!This){
		This = this;
	}
	
		// 实现分页布局
		$.ajax({
			url:'/product/queryProduct',
			type:'get',
			data:{
				page:page++,
				pageSize:3,
				proName:keyword,
				price:price

			},
			success:function(res){
				console.log(res)
				if(res.data.length>0){
					html += template('search-second',res);
					$('.sprot-list').html(html)
					This.endPullupToRefresh(false);

				}else {
					This.endPullupToRefresh(true);

				}
				
				

			}
		})
	    }
 

	


