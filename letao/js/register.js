$(function(){
	// 注册按键获取文本信息
	$('#register-btn').on('click',function(){
		var username = $('[name="username"]').val();
		var moblie = $('[name="moblie"]').val();
		var password = $('[name="password"]').val();
		var surepassword = $('[name="surepassword"]').val();
		var vCode = $('[name="vCodee"]').val();
		
		if (!username) {
			// alert('请输入用户名')
			mui.toast('请输入用户名');
			return;
		}
			if (moblie.length <11) {
			// alert('请输入正确手机号')
			mui.toast('请输入正确手机号');
			return;
		}
			if (password != surepassword || !password) {
			// alert('两次输入密码不一致')
			mui.toast('两次输入密码不一致');
			return;
		}
			if (/^\d{6}$/.test(vCode) || !vCode) {
			// alert('验证码错误')
			mui.toast('验证码错误');
			return;
		}


		// 获取登录接口
		$.ajax({
			url:'/user/register',
			type:'post',
			data:{
				username:username,
				moblie:moblie,
				password:password,
				vCode:vCode


			},
		
			success:function(res){
				alert('注册成功');

			setTimeout(function(){

						location.href = "login.html";

					},2000)
			}

		})

		
	})
	// 获取认证码
	$('#getcode').on('click',function(){
		
		$.ajax({
			url:'/user/vCode',
			type:'get',
			success:function(res){
				console.log(res)
			}
		})
	})

})