$(function(){
    //点击“去注册账号”的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()     
    })

    //点击“去登录”的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()     
    })

    //从layui中获取from/layer对象
    //自定义规则
    var form=layui.form
    var layer=layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ] ,
          //校验两次密码是否一致的规则
        repwd:function(value){
            //value形参拿到的是确认密码框的内容
            //与密码框中的内容进行判断，return错误提示即可
            var pwd=$('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录！')

            //模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        //阻止默认表单提交
        e.preventDefault()
        //快速提交表单数据
        var data=$(this).serialize()
        $.post('/api/login',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg('登陆成功');
            localStorage.setItem('token',res.token)
            //跳转到后台主页
            location.href='/index.html'
        })
    })
    

})