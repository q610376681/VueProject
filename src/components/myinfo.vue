<template>
    <div>
        <!-- 头部 -->
        <top></top>
        <!-- 内容 -->
        <div class="container" style="width: 1200px; height: 650px;">
		<div class="col-md-3">
			<div class="btn-group-vertical" role="group" aria-label="..."
				style="margin-top: 150px;">
				<button  id="myInfo" type="button" class="btn btn-default" @click="showUserInfo">我的信息</button>
				<button  id="myBook" type="button" class="btn btn-default" @click="showUserBooks">我发布的</button>
			</div>
		</div>
		<div class="col-md-9">
			<div class="row">
				<!--已购图书-->
				<div id="myBookDiv" v-if="moduleShow[1].show">
					<div class="row" style="margin-top: 15px">
						<div v-for="(book,i) in pb.list" :key="book.id" v-if="i<4" class="col-md-3" style="height: 240px; width: 165px;">
							<img :src="'./static/img/bookImg/'+book.photo_src" class="myphotosmall" style="height: 188px;"/>
							<!-- <h5 style="text-align: center;"> -->
								<a href="" @click.prevent="getBook(book.id)" target="_blank">{{book.name}}</a>&nbsp;
                <input  type="checkbox" style="zoom:120%;margin-top: 10px;" :value="book.id"
                v-model="isSell" @click="sellOrRelease($event)" />
							<!-- </h5> -->
						</div>
					</div>
					<div class="row" style="margin-top: 25px;">
						<div class="col-md-3" style="height: 240px; width: 165px;" v-for="(book,i) in pb.list" :key="book.id" v-if="i>=4">
							<img :src="'./static/img/bookImg/'+book.photo_src" class="myphotosmall" style="height: 188px" />
							<h5 style="text-align: center;">
								<a href="" @click.prevent="getBook(book.id)" target="_blank">{{book.name}}</a>
                <input  type="checkbox" style="zoom:120%;margin-top: 10px;" :value="book.id"
                v-model="isSell" @click="sellOrRelease($event)" />
							</h5>
						</div>
					</div>
					<!--已购商品分页-->
					<nav aria-label="Page navigation"
						style="text-align: center; margin-left: -250px; margin-top: 35px;">
						<ul class="pagination">
							<!--向左浏览页数  -->
							<li v-if="pb.pageNum===pb.start" class="disabled"><a
								href="javascript:void(0)" aria-label="Previous" > <span
									aria-hidden="true">&laquo;</span>
							</a></li>
							<li v-if="pb.pageNum!==pb.start"><a
								aria-label="Previous"  @click.prevent="getBooks(-1)"  style="cursor:pointer"> <span aria-hidden="true">&laquo;</span>
							</a></li>

							<!--显示每一页  -->
							<li v-for="i in pb.end" :key="i" v-if="i>=pb.start">
								<a href=""  @click.prevent="getBooks(i-pageNum)">{{i}}</a>
							</li>

							<!--向右浏览页数 -->
							<li v-if="pb.pageNum===pb.end" class="disabled"><a
								href="javascript:void(0)" aria-label="Next"> <span
									aria-hidden="true">&raquo;</span>
							</a></li>
							<li v-if="pb.pageNum!==pb.end">
                <a href="" aria-label="Next" @click.prevent="getBooks(1)">
                <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
						</ul>
					</nav>
				</div>
				<!--我的信息-->
				<div id="myInfoDiv" style="" v-if="moduleShow[0].show">
					<div  style="font-size:x-large ;text-align: left" >姓名: {{user.name}}</div>
					<div style="text-align: left" ><h3>学号: {{user.stnumber}}</h3></div>
					<h3 style="text-align: left;"  >学院: {{user.academy}}</h3>
					<h3  style="margin-top: 20px;text-align: left" >住址: {{user.address}}</h3>
					<h3  style="margin-top: 20px;text-align: left" >邮箱: {{user.email}}</h3>
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
// import $ from 'jquery'
export default {
  components: {
    top: top,
    bottom: bottom
  },
  data () {
    return {
      moduleShow: [
        {show: false}, // userInfo 0
        {show: true}// userBooks 1
      ],
      pb: '',
      imgSrc: '',
      pageNum: '',
      isSell: [],
      user: ''
    }
  },
  methods: {
    showUserInfo () {
      this.allHide()
      this.moduleShow[0].show = true
    },
    showUserBooks () {
      this.allHide()
      this.moduleShow[1].show = true
    },
    allHide () {
      for (var i = 0; i < this.moduleShow.length; i++) {
        this.moduleShow[i].show = false
      }
    },
    getBooks (page) {
      this.pageNum += page
      var user = JSON.parse(storage.session.getItem('user'))
      this.$http
        .post(PSApi.getUserBooks, {pageNum: this.pageNum, userId: user.id})
        .then(result => {
          this.pb = result.body
          console.log(this.pb)
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
    },
    sellOrRelease (event) {
      var bookId = event.target.value
      var operationType
      if (event.target.checked) operationType = 1
      else operationType = 0
      this.$http
        .post(PSApi.sellOrRelease, {bookId: bookId, operationType: operationType})
        .then(result => {
          // console.log(result.body)
        })
    }
  },
  created () {
    var user = JSON.parse(storage.session.getItem('user'))
    this.user = user
    console.log(user)
    this.imgSrc = PSApi.imgSrc
    this.pageNum = 1
    this.getBooks(0)
  },
  watch: {
    pb (val, oldVal) {
      console.log(this.user)
      // console.log('val为')
      // console.log(val)
      this.isSell = []
      for (var i = 0; i <= val.list.length; i++) {
        if (val.list[i].isSell === 1) {
          this.isSell.push(val.list[i].id)
        }
      }
    }
  },
  mounted () {
    // this.$ref.myInfoDiv.style.display = 'none'
    // console.log(this.$refs.myInfo.style.cssText)
  }
}

</script>

<style>
    .myphotosmall {
        width: 100%;
    }
</style>
