$(function () {
  //点击去注册账号链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  //点击去登录链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


// 从 layui 中获取 form 对象
var form = layui.form
var layer = layui.layer
// 通过 form.verify() 函数自定义校验规则
form.verify({
  // 自定义了一个叫做 pwd 校验规则
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

  // 校验两次密码是否一致的规则
  repwd: function (value) {
    //获取密码输入的值
    var pwd = $(".reg-box [name=password]").val()
    if (pwd !== value) {
      return '两次输入密码不一致'
    }
  }

})

//监听表单提交事件
$('#form_reg').on('submit', function (e) {
  //阻止表单默认提交事件
  e.preventDefault()
  // 2. 发起Ajax的POST请求
  var data = {
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()
  }
  $.POST('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
    if (res.status !== 0) {
      return layer.msg(res.message)

    } layer.msg('注册成功,请登录')

    //模拟人点击事件
    $('#link_login').click()
  })
})

// 监听登录表单的提交事件
$('#form_login').on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: 'http://ajax.frontend.itheima.net/api/login',
    // 快速获取表单中的数据
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('登录失败')
      }
      layer.msg('登录成功')
       // 将登录成功得到的 token 字符串，保存到 localStorage 中
      localStorage.setItem('token', res.token)
      // 跳转到后台主页
      location.href = '/index.html'
    }
  })
 })
})