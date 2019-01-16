<template>
    <div>
      <!-- 顶部 -->
      <top></top>
    <div class="container container-small">
    <form action="" v-if="!isReg">
    <h3>登录界面</h3>
    <div class="form-group">
        <label>用户名：</label>
        <input class="form-control" type="text" v-model="username">
    </div>
    <div class="form-group">
        <label>密码：</label>
        <input class="form-control" type="password" v-model="password">
    </div>
    <div class="form-group"><button class="btn btn-primary btn-block" type="button" @click="log()">登陆</button></div>
    <div class="form-group"><button class="btn btn-primary btn-block" type="button" @click="reg()">注册</button></div>

    </form>
    <form action="" v-else>
    <h3>注册界面</h3>
    <div class="form-group">
        <label>用户名：</label>
        <input class="form-control" type="text" v-model="username">
    </div>
    <div class="form-group">
        <label>密码：</label>
        <input class="form-control" type="password" v-model="password">
    </div>
    <div class="form-group">
        <label>再次输入密码：</label>
        <input class="form-control" type="password" v-model="repeatpassword">
    </div>
    <div class="form-group">
        <label>姓名：</label>
        <input class="form-control" type="text" v-model="name">
    </div>
    <div class="form-group">
        <label>学号：</label>
        <input class="form-control" type="text" v-model="STNumber">
    </div>
    <div class="form-group">
        <label>地址：</label>
        <input class="form-control" type="text" v-model="address">
    </div>
    <div class="form-group">
        <label>email：</label>
        <input class="form-control" type="text" v-model="email">
    </div>
        <div class="form-group">
        <label>学院：</label>
        <input class="form-control" type="text" v-model="academy">
    </div>
    <div v-if="passwordsame">
        <div class="alert alert-danger">两次输入的密码不一致</div>
    </div>
    <div class="form-group"><button class="btn btn-primary btn-block" type="button" @click="addUser()">确定</button></div>
    <div class="form-group"><button class="btn btn-primary btn-block" type="button" @click="no()">取消</button></div>
    </form>
</div>
<!-- 底部 -->
    <bottom></bottom>
    </div>
</template>

<script>
import PSApi from '@/common/js/service.js'
import storage from '@/common/js/storage.js'
import bottom from '@/components/bottom.vue'
import top from '@/components/top.vue'

export default {
  components: {
    top: top,
    bottom: bottom
  },
  data () {
    return {
      isReg: false,
      name: '',
      username: '',
      STNumber: '',
      academy: '',
      email: '',
      address: '',
      password: '',
      repeatpassword: '',
      passwordsame: false
    }
  },
  methods: {
    log () {
      // 根据用户名密码请求登陆
      console.log('用户请求登陆')
      console.log(this.username)
      console.log(this.password)
      this.$http
        .post(PSApi.login, {username: this.username, password: this.password})
        .then(result => {
          // name是返回的用户的名字
          var name = result.body.name
          if (name === null || typeof name === 'undefined') {
            console.log('登陆失败')
            alert('用户名或者密码错误,请重新登陆!')
          } else {
            // 用户不为空即登陆成功,将用户加进session中
            console.log('登陆成功')
            storage.session.setItem('user', JSON.stringify(result.body))
            this.$router.push('/index')
          }
        })
    },
    reg () {
      this.isReg = true
    },
    addUser () {
      if (this.password === this.repeatpassword) {
        this.passwordsame = false
      } else {
        this.passwordsame = true
      }
      this.$http
        .post(PSApi.userRegister, {name: this.name,
          password: this.password,
          username: this.username,
          STNumber: this.STNumber,
          academy: this.academy,
          email: this.email,
          address: this.address
        })
        .then(response => {
          console.log(response)
          if (response.body.result === '1') {
            alert('注册成功')
            this.no()
          } else {
            alert(response.body.result)
          }
        })
    },
    no () {
      this.isReg = false
    }
  }

}
</script>

<style>
   .container-small{
            max-width: 500px;
        }
</style>
