// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            // console.log(res);
            // 判断是否请求成功
            if (res.status !== 0) return layer.msg(res.message);
            // 获取用户信息成功
            layer.msg(res.message);
            // 渲染用户信息页面
            renderAvatar(res.data);
        }
    })
}

// 渲染用户信息
const renderAvatar = (user) => {
    console.log(user);
    let uname = user.nickname || user.username;
    // 渲染欢迎语句
    $('#welcome').html(`欢迎${uname}`)
    // 按需渲染头像
    if (user.user_pic !== null) {
        // 设置图片头像
        $('.layui-nav-img').attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        // 设置文本头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(uname[0].toUpperCase())
    }

}

$('#btnlogout').click(() => {
    layer.confirm('是否退出大事件？', {
        icon: 3,
        title: '提示'
    }, function () {
        localStorage.removeItem('token')
        location.href = '/login.html'
    })
})
getUserInfo();