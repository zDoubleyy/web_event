

$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url


    //统一为有权限的接口，设置header请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete回调函数
    options.complete = function (res) {
        //不论成功还是失败，最终都会调用complete回调函数
        //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token,此时没有,如果有人手写token，那么就要清空
            localStorage.removeItem('token')
            //2.强制跳转到login.html
            location.href = '/login.html'

        }
    }
})


