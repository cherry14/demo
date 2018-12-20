$(function(){
	
	$('#password-change').on('tap',function(){
		// 获取信息

		var password = $('[name="password"]').val();

		var newpassword = $('[name="newpassword"]').val();
		var surepassword= $('[name="surepassword"]').val();
		var vCode = $('[name="vCode"]').val();



		if (password ==''){
			mui.toast('请输入原密码');
			return;
		}
		if (password == newpassword){
			mui.toast('新密码不可与原密码一样');
			return;
		}
		if (surepassword != newpassword){
			mui.toast('两次密码不一致');
			return;
		}

		if (!vCode){
			mui.toast('请输入验证码');
			return;
		}



		$.ajax({
			url:'/user/updatePassword',
			type:'post',
			data:{
				oldPassword:password,
				newPassword:newpassword,
				 vCode: vCode
			},
			success:function(res){
					console.log(res)
			}

		})
	})

	// 	// 获取认证码
	$('#getcode').on('tap',function(){
		
		$.ajax({
			url:'/user/vCodeForupdatePassword',
			type:'get',
			success:function(res){
				console.log(res)
			}
		})
	})
})