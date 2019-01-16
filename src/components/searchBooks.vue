<template>
<div>
  <!-- 头部 -->
  <top></top>
  <!-- 内容  -->
  <div class="container">
<div class="row" style="padding-left: 257px; margin-top: 15px;">
<div v-for="(book,i) in pb.list" :key="book.id" v-if="i<4" class="col-md-3" style="height: 140px; width: 165px;" >
<img :src="'./static/img/bookImg/'+book.photo_src"  class="myphotosmall" />
<h5 style="text-align: center;">
<a @click.prevent="getBook(book.id)"  target="_blank">{{book.name}}</a>
</h5>
</div>

</div>
<div class="row" style="padding-left: 257px; margin-top: 35px;">
<div class="col-md-3" style="height: 140px; width: 165px;" v-for="(book,i) in pb.list" :key="book.id" v-if="i>=4">
<img :src="'./static/img/bookImg/'+book.photo_src"  class="myphotosmall" />
<h5 style="text-align: center;">
<a @click.prevent="getBook(book.id)" th:text="${food.name}" target="_blank">{{book.name}}</a>
</h5>
</div>
</div>
<!--分页-->
<nav aria-label="Page navigation" style="text-align: center; margin-top: 35px; " >
<ul class="pagination">
							<!--向左浏览页数  -->
							<li v-if="pb.pageNum===pb.start" class="disabled"><a
								href="javascript:void(0)" aria-label="Previous" > <span
									aria-hidden="true">&laquo;</span>
							</a></li>
							<li v-if="pb.pageNum!==pb.start"><a
								aria-label="Previous"  @click.prevent="getSearchBooks(-1)"  style="cursor:pointer"> <span aria-hidden="true">&laquo;</span>
							</a></li>

							<!--显示每一页  -->
							<li v-for="i in pb.end" :key="i" v-if="i>=pb.start">
								<a href=""  @click.prevent="getSearchBooks(i-pageNum)">{{i}}</a>
							</li>

							<!--向右浏览页数 -->
							<li v-if="pb.pageNum===pb.end" class="disabled"><a
								href="javascript:void(0)" aria-label="Next"> <span
									aria-hidden="true">&raquo;</span>
							</a></li>
							<li v-if="pb.pageNum!==pb.end">
                <a href="" aria-label="Next" @click.prevent="getSearchBooks(1)">
                <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
						</ul>
</nav>
</div>
    <!-- 底部 -->
    <bottom></bottom>
</div>
</template>
<script>

import PSApi from '@/common/js/service.js'
import bottom from '@/components/bottom.vue'
import top from '@/components/top.vue'

export default {
  components: {
    top: top,
    bottom: bottom
  },
  data () {
    return {
      pageNum: '',
      categoryId: '',
      pb: '',
      searchString: ''
    }
  },
  methods: {
    getSearchBooks (page) {
      this.pageNum += page
      this.$http
        .post(PSApi.searchBooks, {pageNum: this.pageNum, searchString: this.searchString})
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
    }
  },
  created () {
    this.pageNum = 1
    console.log('接收到的参数为' + this.$route.query.searchString)
    this.searchString = this.$route.query.searchString
    this.getSearchBooks(0)
  },
  watch: {
    '$route' (to, from) {
      this.pageNum = 1
      console.log('qwe' + this.$route.query.searchString)
      this.searchString = this.$route.query.searchString
      this.getSearchBooks(0)
    }
  }
}
</script>

<style>

#head{
		margin-left: 20px;
		margin-bottom: 15px;
	}
	.myphotosmall {
width: 100%;
height: 100%;
    }
</style>
