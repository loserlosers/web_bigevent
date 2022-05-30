$(function () {
    // 切换登录注册页面
    $('#link_reg').click(function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_login').click(function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 引入from模块
    const form = layui.form
    var layer = layui.layer

    // 自定义检测规则
    form.verify({
        // 密码校验
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 确认密码校验
        repwd: (value) => {
            const pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) {
                // 1.通过形参拿到的是确认密码框中的内容
                // 2.还需要拿到密码框中的内容
                // 3.然后进行一次等于的判断
                // 4.如果判断失败,则return一个提示消息即可
                return "两次密码不一致"
            }
        }
    })

    // 设置根目录
    // const baseUrl = 'http://www.liulongbin.top:3007'

    // 注册功能
    $('#form_reg').on('submit', (e) => {
        // 阻止默认事件
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {

                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功！')
                // 模拟点击跳转登录
                $('#link_login').click()
            }
        })
    })
TEWSFSFEFFSFWSFFEFSSFESFFSEF
    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res.token);
                if (res.status !== 0) return layer.msg(res.message)
                // 登陆成功后把令牌 token 存放到本地
                localStorage.setItem('token', res.token)
                // 跳转到主页
                location.href = '/index.html'
            }
        })
    })
})