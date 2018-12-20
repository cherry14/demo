$(function(){

	var isEdit =  Number(getPramesByURL(location.href,'isedit'));

	if (isEdit){
		// 说明是编辑页面
		if(localStorage.getItem('edit-address')){
			var address = JSON.parse(localStorage.getItem('edit-address'));
			var html = template('editTpl',address);
			console.log(html)
			$('#edit-box').html(html);
		}
	}else {
		//为0则是添加页面
		var html = template('editTpl',{});
			
			$('#edit-box').html(html);

	}
	//三级联动选择器
		var picker = new mui.PopPicker({layer:3});
		//在里面添加数据
		picker.setData(cityData)
	

	$('#selectcity').on('click',function(){
		picker.show(function(selectItems){
			$('#selectcity').val(selectItems[0].text+selectItems[1].text+selectItems[2].text)
		})
	})



	$('#address').on('click',function(){

	
		
		// 获取信息

		var name = $('[name = "name"]').val();
		var postcode = $('[name = "postcode"]').val();
		var location = $('[name = "location"]').val();
		var password= $('[name = "password"]').val();
		var data = {
				address:location,
				addressDetail:password,
				postcode:postcode,
				recipients:name


			};

		if(isEdit) {
			var url = "/address/addAddress";
			data.id = address.id;
		}else {
			var url = "/address/updateAddress"
		}

		$.ajax({
			url:url,
			type:'post',
			data:data ,
			success:function(res){

				console.log(res)
				if(res.success){

					if(isEdit){
						mui.toast('编辑完成');
					}else {
						mui.toast('添加成功');

					}
					setTimeout(function(){
						location.href = "address.html";
					},1500);

					
					
				}
		}

		})
	})
	
	
})