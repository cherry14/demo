//申请一个变量存储用户信息
var userInfo = null;



$.ajax({
	url:'/user/queryUserMessage',
	type:'get',
	async:false,
	success:function(res){
		console.log(res)
		if(res.error ){
			// location.href = 'login.html';
		}
		userInfo = res;

	}
})

$(function(){
		$('#logout').on('click',function(){
		
			$.ajax({
				url:'/user/logout',
				type:"get",
				success:function(res){
					if(res.success){
						mui.toast('退出成功,即将跳转到首页..');
						setTimeout(function(){
							location.href = 'index.html';
						},1500)
						
					}
				}
			})
		})
		console.log(userInfo, 888888)
		var html = template('userinfoTpl',userInfo);
		$('#userInfobox').html(html)


		$('#ForUpdatapassword').on('tap',function(){
			// alert(1)
			setTimeout(function(){
				location.href = 'modify.html'
			},1000)
		})

		$('#ADDaddress').on('tap',function(){
			location.href = 'address.html'
		})
})