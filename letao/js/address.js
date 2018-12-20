$(function(){


	//添加收获地址
	$('#add').on('tap',function(){
	
		location.href = "addressMessage.html?isedit=0"
	})


	//申明一个全局变量存储收获地址
	var address = null;

	$.ajax({
		url:'/address/queryAddress',
		type:'get',
		success:function(res){
			address = res;
		var html = template('addTpl',{result:res})
		$('#addressList').html(html)
		}
		

	})


	$('#addressList').on('tap','.del-btn',function(){
		var id = this.getAttribute('data-id');
	var li = this.parentNode.parentNode;
		mui.confirm('确认要删除？',function(message){
			if(message.index == 1){
				$.ajax({
					url:'/address/deleteAddress',
					type:'post',
					data:{
						id :id
					},
					success:function(res){
						if(res.success){
							location.reload();
						}
					}	
				})
			
			}else {
				mui.swipeoutClose(li);
			
			}

		})

		
	})



	//编辑按钮点击事件
	$('#addressList').on('tap','.edit-btn',function(){
		var id = this.getAttribute('data-id');

		for(var i = 0 ;i<address.length;i++){
			if(address[i].id == id){
				
				localStorage.setItem('edit-address',JSON.stringify(address[i]))
				break;
			}
		}

		location.href = "addressMessage.html?isedit=1";



	})
})