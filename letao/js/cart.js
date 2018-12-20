$(function(){
	// 产品购买量
	var num = JSON.parse(localStorage.getItem('proNum'));
	console.log(num)
	
	
	

	// 总价
	var sunPrice = 0;
	// 现价
	var nowPrice;
	
	$('#selector').on('click','.dadada',function(){
	 var ss =  $(this)[0].checked;
		


	// console.log(price)
	 if (ss){
	 	nowPrice = +this.getAttribute('data-price');
	 	
	 	// console.log(size)
	 	
	 	sunPrice+=nowPrice;
	 	
	 
	 	// console.log(sunPrice)
	 }else{
	 	nowPrice=+this.getAttribute('data-price');
	 	sunPrice-=nowPrice;
	 }
	 $('#sumPrice > span').text(sunPrice)
	 
		
	});


	$.ajax({
		url:' /cart/queryCart',
		type:'get',
		success:function(res){
			console.log(res)
			
			var html = template('cartTpl',{result:res})
			$('#selector').html(html)
			// console.log(html)
		}

	})

	//确认支付
	$('#payCart').on('tap',function(){
		if(sunPrice){
			mui.confirm('是否立即去支付？',function(message){
				if(message.index){
					mui.toast('正在提交....');
					setTimeout(function(){
						mui.toast('支付成功');
					},2000)
				}
			})
		}
	})

	//编辑按钮
	$('#selector').on('tap','.edit-cart',function(){
		var id = +this.getAttribute('data-id');
		console.log(id)
	 	var size = +this.getAttribute('data-size');
		console.log(size)
		$.ajax({
			url:'/cart/updateCart',
			type:'post',
			data:{
				id:id,
				size:size,
				num:num
			},
			success:function(res){
				if(res.success){
					
				}
			}
		})
	})



	$('#selector').on('tap','.del-cart',function(){
		var id = this.getAttribute('data-id');


		// console.log(id)
		mui.confirm('确认删除本款？',function(message){
			if(message.index){
				 $.ajax({
				 	url:'/cart/deleteCart',
				 	type:'get',
				 	data:{
				 		id:id
				 	},
				 	success:function(res){
				 		console.log(res)
				 		if(res.success){
				 			mui.toast('删除成功')
				 			setTimeout(function(){
				 				location.reload();
				 			},1000)
				 			
				 		}
		 	}
		 })

			}
		})
		
	})
	
})