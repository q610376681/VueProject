<template>
    <div class="container" style="margin-top: -50px;">
        <!-- 登陆退出 -->
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <h5 id="head" v-if="isLogout">
                        <router-link to="/login">
                            <span style="float:right" class="label label-success">登陆/注册</span>
                        </router-link>
                </h5>
                <h5 id="head" v-if="!isLogout">
                    <span>欢迎您,{{userName}}</span>
                        <span style="float:right ;cursor:pointer " class="label label-danger" @click.prevent="logout">退出</span>
                </h5>
            </div>
		</div>
        <!-- 导航条 -->
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-4">
                <img src="../assets/img/logo.png" style="margin-right:110px;height: 50px;width: 200px;"/>
            </div>
            <div class="col-md-4">
                <form class="navbar-form navbar-left" role="search" style="padding-left: 50px" onsubmit="return false">
                    <div class="form-group">
                        <input id="findFoodText" type="text" class="form-control" placeholder="请输入书名" v-model="searchString">
                    </div>
                    <button type="button" class="btn btn-default" @click="searchBooks">查找</button>
                </form>
            </div>
            <div class="col-md-4">
                <div class="btn-group" role="group" style="margin-left: 180px;margin-top: 10px;">
                    <!--  -->
                    <router-link :to="{path:'/releaseBook', query:{categoryList:categoryList}}" v-if="!isLogout">
                        <button type="button" class="btn btn-default" >我要发布</button>
                    </router-link>
                    <router-link to='/myinfo' v-if="!isLogout">
                        <button type="button" class="btn btn-default">我的信息</button>
                    </router-link>
                </div>
            </div>
		</div>
        <!-- 类别条 -->
		<nav class="navbar navbar-default" style="margin-top: 20px;">
			<div class="container">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<a class="navbar-brand" href="/#/index" @click.prevent="toIndex"> <img
						:src="imgSrc+'/bnuLogo.png'"
						style="height: 30px; width: 30px; display: inline;" /> &nbsp;首页
					</a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li v-for="category in categoryList" :key="category.name" style="margin-top: 5px;">
              <a href="" @click.prevent="getCategoryBooks(category.id)">{{category.name}}</a></li>
					</ul>
				</div>
				<!-- /.navbar-collapse -->
			</div>
			<!-- /.container-fluid -->
		</nav>
	</div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import storage from '@/common/js/storage.js'
import PSApi from '@/common/js/service.js'

export default {
  names: 'index',
  data () {
    return {
      isLogout: true,
      userName: '',
      imgSrc: '',
      categoryList: '',
      searchString: ''
    }
  },
  created () {
    this.imgSrc = PSApi.imgSrc
    var user = JSON.parse(storage.session.getItem('user'))
    if (user !== null && typeof user !== 'undefined') {
      this.isLogout = false
      this.userName = user.name
    }
    this.$http
      .post(PSApi.getAllCategory)
      .then(result => {
        this.categoryList = result.body
        console.log(this.categoryList)
      })
  },
  methods: {
    logout: function () {
      this.isLogout = true
      storage.session.removeItem('user')
    },
    getCategoryBooks (categoryId) {
      console.log(categoryId)
      this.$router.push({
        path: '/classifiedBooks',
        query: {
          categoryId: categoryId
        }
      })
    },
    searchBooks () {
      console.log(this.searchString)
      this.$router.push({
        path: '/searchBooks',
        query: {
          searchString: this.searchString
        }
      })
    },
    toIndex () {
      this.$router.push('/index')
    }
  }
}
</script>

<style>

</style>
