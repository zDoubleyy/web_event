$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                //调用form.val()快速为表单赋值,给form添加一个lay-filter="formUserInfo"属性即可实现
                form.val('formUserInfo',res.data)
            }
        })
    }

    //监听重置表单数据
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    //监听表单的提交事件
    $('.layui-form').on('click',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败')
                }
                
                //调用父页面中的方法，重新渲染用户头像和姓名
                window.parent.getUserInfo()
            }
        })
    })
})