$(function () {
    const form = layui.form
    // 自定义检验规则
    form.verify({
        nickname: val => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！"
        }
    })

    // 获取用户信息
    const initUserInfo = () => {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) return layer.msg(res.message)
                // console.log(res);
                // 利用 form.val() 进行快速赋值
                form.val("formUserInfo", res.data)
            }
        })
    }

    // 重置功能
    $('#btnReset').click(e => {
        e.preventDefault()
        initUserInfo()
    })

    // 更新用户信息
    $('.layui-form').on('submit',function (e)  {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            // 快速获取表单域的信息
            data:$(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 调用 父页面 的函数， 渲染欢迎语
                window.parent.getUserInfo()
            }
        })
    })


    initUserInfo()
})