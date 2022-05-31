$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').click(function () {
        $('#file').click()
    })

    // 只要上传了文件就会触发 change事件
    $('#file').change(e => {
        const fileLength = e.target.files.length
        if (fileLength === 0) return
        const file = e.target.files[0]
        const imgUrl = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", imgUrl) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    })


    // - 为确定按钮，绑定点击事件  // 上传头像
    //   - 创建一个 Canvas 画布，将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $('#btnUpload').click(() => {
        // - 要拿到用户裁剪之后的头像
        const dataURL = $image
            .cropper("getCroppedCanvas", {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100,
            })
            .toDataURL("image/png");
        $.ajax({
            type: "POST",
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: res => {
                if (res.status !== 0) return layer.msg('上传失败！')
                layer.msg('成功！！')
                window.parent.getUserInfo()
            }
        })
    })
})