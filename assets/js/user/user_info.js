$(function() {
  var form = layui.form
  var layer = layui.layer



  form.verify({
    nickname: function(value) {
      if (value.length > 7) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  initUserInfo()

  function initUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success:function(res){
        console.log(res);
        if(res.status!==0){
          return layer.msg("获取用户信息失败！")
        }
        form.val('formUserInfo', res.data)
      }
    })

    // 表单的重置按钮
    $('#btnReset').on('click',function(e){
      e.preventDefault()
         initUserInfo()
    })
  }

  //表单的提交修改按钮
  $('.layui-form').on('submit',function(e){
    e.preventDefault();
    console.log(FormData);
    layer.msg('666')
    $.ajax({
          method: 'POST',
          url: '/my/userinfo',
          data: $(this).serialize(),
          success:function(res){
              if(res.status!==0){
               return   layer.msg('修改信息失败！')
              }
              form.val('formUserInfo', res.data)
          }
  })
  // // 初始化用户的基本信息
  // function initUserInfo() {
  //   $.ajax({
  //     method: 'GET',
  //     url: '/my/userinfo',
  //     success: function(res) {
  //       if (res.status !== 0) {
  //         return layer.msg('获取用户信息失败！')
  //       }
  //       // console.log(res)
  //       // 调用 form.val() 快速为表单赋值
  //       form.val('formUserInfo', res.data)
  //     }
  //   })
  // }

  // // 重置表单的数据
  // $('#btnReset').on('click', function(e) {
  //   // 阻止表单的默认重置行为
  //   e.preventDefault()
  //   initUserInfo()
  // })

  // // 监听表单的提交事件
  // $('.layui-form').on('submit', function(e) {
  //   // 阻止表单的默认提交行为
  //   e.preventDefault()
  //   // 发起 ajax 数据请求
  //   $.ajax({
  //     method: 'POST',
  //     url: '/my/userinfo',
  //     data: $(this).serialize(),
  //     success: function(res) {
  //       if (res.status !== 0) {
  //         return layer.msg('更新用户信息失败！')
  //       }
  //       layer.msg('更新用户信息成功！')
  //       // 调用父页面中的方法，重新渲染用户的头像和用户的信息
  //       window.parent.getUserInfo()
  //     }
  //   })
  })
})
