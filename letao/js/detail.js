$(function(){
	//剩余库存
	var invNum = null;

	var size = null;

	var productId = 0;

	var id  = getPramesByURL(location.href,'id') || 1;
	// console.log(id)
	if(!id){
		return;
	}
	$.ajax({
		url:'/product/queryProductDetail',
		type:'get',
		data:{
			id:id
		},
		success:function(res){
			console.log(res)

			invNum = res.num;

			productId = res.id

			var html = template('productTpl',res);
			// console.log(html)
			$('#product-box').html(html)

			//轮播图插件能整场使用
			var gallery = mui('.mui-slider');
			gallery.slider();
		}
	})

	// 数量加减按钮事件
	var ipt = $('#inp');
	var inventory = $('#inventory');
	
		
	var num = 1;
	$('.num').on('tap','#reduce',function(){

		num  = ipt.val();
		num--;	
		if(num<0){
			return;
		}
		ipt.val(num);
			
		// input里面的值
		invNum++;
		inventory.text(invNum);
	})
	$('.num').on('tap','#increase',function(){
		// alert(2)
		inventory.text(invNum)

		num  = ipt.val();

		

		if(invNum<=0){
			return;
		}
		
		
		invNum--;
		
		num++;
		
		ipt.val(num);
	})

	console.log(num)

	// 尺码选择事件
	$('#product-box').on('tap','.size span',function(){
		$(this).addClass('active').siblings().removeClass('active');
		size = $(this).html();
	})


	//加入购物车
	$('.add-btn').on('tap',function(){

			if(!size){
				mui.toast('请选择尺码')
				return;
			}

			$.ajax({
				url:'/cart/AddCart',
				type:'post',
				data:{
					size:size,
					productId:productId,
					num:invNum
				},
				success:function(res){
					if(res.success){
						mui.confirm('加入购物车成功，是否去购物车查看？',function(message){
							if(message.index == 1){
								location.href =  'cart.html'
							}
						})
					}
				}
			})

			localStorage.setItem('proNum',JSON.stringify(num));
	})

	
})