<template>
    <div>
        <!-- 头部 -->
        <top></top>
        <!-- 内容 -->
        <div class="container">
		<!--轮播图 参考http://www.runoob.com/bootstrap/bootstrap-carousel-plugin.html-->
		<div id="myCarousel" class="carousel slide">
			<!-- 轮播（Carousel）指标 -->
			<ol class="carousel-indicators">
				<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
				<li data-target="#myCarousel" data-slide-to="1"></li>
				<li data-target="#myCarousel" data-slide-to="2"></li>
			</ol>
			<!-- 轮播（Carousel）项目 -->
			<div class="carousel-inner" style="height: 600px">
				<div class="item active">
					<img :src="imgSrc+'/lunbotu1.jpg'" alt="First slide">
				</div>
				<div class="item" >
					<img :src="imgSrc+'/lunbotu2.jpg'" alt="First slide">
				</div>
				<div class="item" >
					<img :src="imgSrc+'/lunbotu3.jpg'" alt="First slide">
				</div>
			</div>
			<!-- 轮播（Carousel）导航 -->
			<a class="left carousel-control" href="#myCarousel" role="button"
				data-slide="prev"> <span
				class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a> <a class="right carousel-control" href="#myCarousel" role="button"
				data-slide="next"> <span
				class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>
	</div>
	<!--个性化推荐-->
	<div style="text-align: left;" class="container">
		<h3>为您推荐</h3>
		<div class="row">
			<!--第一部分-->
			<div class="col-md-4" style="height: 400px;">
				<div class="row">
					<div class="col-md-12" style="height: 197px;">
						<a href="#"><img :src="imgSrc+'/tui1.png'"
							class="myphotobig" /></a>
					</div>
					<div class="col-md-6" style="height: 197px;">
						<a href="#"><img :src="'./static/img/bookImg/'+recmmondBooks[0].photo_src"
							class="myphotosmall" @click="getBook(recmmondBooks[0].id)" /></a>
					</div>
					<div class="col-md-6" style="height: 197px;">
						<a href="#"><img :src="'./static/img/bookImg/'+recmmondBooks[1].photo_src"
							class="myphotosmall" @click="getBook(recmmondBooks[1].id)" /></a>
					</div>
				</div>
			</div>
			<!--第二部分-->
			<div class="col-md-4" style="height: 400px;">
				<div class="row">
					<div class="col-md-12" style="height: 197px;">
						<a href="#"><img :src="imgSrc+'/tui3.png'"
							class="myphotobig" /></a>
					</div>
					<div class="col-md-6" style="height: 197px;">
						<a href="#"><img :src="'./static/img/bookImg/'+recmmondBooks[2].photo_src"
							class="myphotosmall" @click="getBook(recmmondBooks[2].id)" /></a>
					</div>
					<div class="col-md-6" style="height: 197px;">
						<a href="#"><img :src="'./static/img/bookImg/'+recmmondBooks[3].photo_src"
							class="myphotosmall" @click="getBook(recmmondBooks[3].id)" /></a>
					</div>
				</div>
			</div>
			<!--第三部分-->
			<div class="col-md-4" style="height: 400px;">
				<div class="row">
					<div class="col-md-12" style="height: 197px;">
						<a href="#"><img :src="imgSrc+'/tui2.png'"
							class="myphotobig" /></a>
					</div>
					<div class="col-md-6" style="height: 197px;">
						<a href="#"><img :src="'./static/img/bookImg/'+recmmondBooks[4].photo_src" class="myphotosmall" @click="getBook(recmmondBooks[4].id)" /></a>
					</div>
					<div class="col-md-6" style="height: 197px;">
						<a href="#"><img :src="'./static/img/bookImg/'+recmmondBooks[5].photo_src" class="myphotosmall" @click="getBook(recmmondBooks[5].id)"/></a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--最新上架-->
	<div class="container">
		<h3 style="text-align: left;">最新上架</h3>
		<div class="row">
			<!--第一部分-->
			<div class="col-md-4" style="height: 400px;">
				<div class="row">
					<div class="col-md-12" style="height: 197px;">
						<img :src="imgSrc+'/guang2.png'" class="myphotobig" />
					</div>
					<div class="col-md-6" style="height: 197px;">
						<img :src="'./static/img/bookImg/'+latestBooks[0].photo_src" class="myphotosmall" @click="getBook(latestBooks[0].id)" />
					</div>
					<div class="col-md-6" style="height: 197px;">
						<img :src="'./static/img/bookImg/'+latestBooks[1].photo_src" class="myphotosmall" @click="getBook(latestBooks[1].id)" />
					</div>
				</div>
			</div>
			<!--第二部分-->
			<div class="col-md-4" style="height: 400px;">
				<div class="row">
					<div class="col-md-12" style="height: 197px;">
						<img :src="imgSrc+'/guang1.png'" class="myphotobig" />
					</div>
					<div class="col-md-6" style="height: 197px;">
						<img :src="'./static/img/bookImg/'+latestBooks[2].photo_src" class="myphotosmall" @click="getBook(latestBooks[2].id)" />
					</div>
					<div class="col-md-6" style="height: 197px;">
						<img :src="'./static/img/bookImg/'+latestBooks[3].photo_src" class="myphotosmall" @click="getBook(latestBooks[3].id)" />
					</div>
				</div>
			</div>
			<!--第三部分-->
			<div class="col-md-4" style="height: 400px;">
				<div class="row">
					<div class="col-md-12" style="height: 197px;">
						<img :src="imgSrc+'/guang3.png'" class="myphotobig" />
					</div>
					<div class="col-md-6" style="height: 197px;">
						<img :src="'./static/img/bookImg/'+latestBooks[4].photo_src" class="myphotosmall" @click="getBook(latestBooks[4].id)"/>
					</div>
					<div class="col-md-6" style="height: 197px;">
						<img :src="'./static/img/bookImg/'+latestBooks[5].photo_src" class="myphotosmall" @click="getBook(latestBooks[5].id)" />
					</div>
				</div>
			</div>
		</div>
	</div>
        <!-- 底部 -->
        <bottom></bottom>
    </div>
</template>

<script>

import bottom from '@/components/bottom.vue'
import top from '@/components/top.vue'
import PSApi from '@/common/js/service.js'
import storage from '@/common/js/storage.js'

export default {
  components: {
    top: top,
    bottom: bottom
  },
  data () {
    return {
      imgSrc: '',
      latestBooks: [],
      recmmondBooks: [],
      user_id: ''
    }
  },
  methods: {
    getLatestBooks () {
      this.$http
        .post(PSApi.getLatestBooks)
        .then(result => {
          this.latestBooks = result.body.data
          // console.log(this.latestBooks)
        })
    },
    getRecommendBooks () {
      var user = JSON.parse(storage.session.getItem('user'))
      // console.log(user)
      if (typeof user === 'undefined' || user === null) {
        console.log('用户未登陆')
        this.user_id = 0
      } else {
        this.user_id = user.id
      }
      this.$http
        .post(PSApi.getRecommendBooks, {user_id: this.user_id})
        .then(result => {
          // console.log(result.body)
          this.recmmondBooks = result.body
          // console.log(this.recmmondBooks)
        })
    },
    getBook (bookId) {
      console.log(bookId)
      this.$router.push({
        path: '/productInfo',
        query: {
          bookId: bookId
        }
      })
    }
  },
  created () {
    this.imgSrc = PSApi.imgSrc
    this.getLatestBooks()
    this.getRecommendBooks()
  }
}
</script>

<style>
    .carousel-inner img {
      width: 100%;
      height: 100%;
    }
    .myphotobig {
        width: 100%;
        height: 100%;
    }
    .myphotosmall {
        margin-top: 15px;
        width: 100%;
        height: 100%;
    }
</style>
