$(function () {
    //调用获取用户信息
    getUserInfo()

    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //1.清空本地存储的token
            localStorage.removeItem('token')
            //跳转到登录页
            location.href='/login.html'
            layer.close(index);
          });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //导入baseAPI.js用于拼贴路径
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return console.log(res.message);
            }
            //调用renderAvatar()渲染调用用户头像
            renderAvatar(res.data)
        }
        // //不论成功还是失败，最终都会调用complete回调函数
        // complete:function(res){
        //     // console.log('执行了complete回调');
        //     // console.log(res);
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        //         //1.强制清空token,此时没有,如果有人手写token，那么就要清空
        //         localStorage.removeItem('token')
        //         //2.强制跳转到login.html
        //         location.href='/login.html'

        //     }
        // }
    })
}

//渲染用户头像
function renderAvatar(user){
    //1.获取用户名称
    var name=user.nickname||user.username
    //2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //3.渲染用户头像
    if(user.user_pic!==null){
        //3.1渲染图片头像
        $('.layui-nav-img').attr('scr',user.user_pic).show()
        $('.text-avatar').hide()

    }else{
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}