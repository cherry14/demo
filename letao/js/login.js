$(function(){
	$('#login-btn').on('tap',function(){
		var username = $.trim($('[name="username"]').val());
		var password = $.trim($('[name="password"]').val());
		

		if(!username){
			mui.toast('请输入正确的用户名');
			return;
		}
		if(password.length < 6){
			mui.toast('请输入正确密码');
			return;
		}
		$.ajax({
		url:'/user/login',
		type:'post',
		data:{
			username:username,
			password:password
		},
		success:function(res){
			mui.toast('登录成功');
			location.href = "user.html";

		}
	
		})

	})

	// 立即注册按钮
	$('.register-now').on('click',function(){
		location.href = 'register.html'
	})
	
})