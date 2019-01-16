<template>
<div>
  <top></top>
  <div class="container">
  <div class="row" style="margin-left:80px">
  <div class="container col-md-10">
    <div class="row">
    <div class="col-sm-1"></div>
    <div class="col-sm-3">
        <img class="img-rounded" :src="'./static/img/bookImg/'+book.photo_src" style="width:200px;height:200px" alt="">
    </div>
    <div class="col-sm-8">
      <div class="contianer">
          <div class="book-name">
              <p>{{book.name}}</p>
            </div>
            <div class="book-intro">
              <p>{{book.introduction}}</p>
            </div>
            <div class="row">
            <div class="book-author col-sm-4">
              <p>{{book.author}}</p>
            </div>
            <div class="book-publisher col-sm-4">
              <p>出版社:{{book.publishing_house}}</p>
            </div>
            <div class="book-time col-sm-4">
              <p>上架时间:{{book.date}} </p>
            </div>
            </div>
            <br>
            <br>
            <div class="panel panel-info">
              <div class="panel-heading" style="text-align: left;">交易信息</div>
                <div class="panel-body" style="text-align: left;">
                    <div class="">
                        <p >价格：{{book.price}}</p>
                      </div>
                      <div class="">
                        <p>手机：{{book.phoneNumber}}</p>
                      </div>
                      <div class="">
                        <p>微信：{{book.weixin}}</p>
                      </div>
                      <div class="">
                        <p>QQ：{{book.qq}}</p>
                      </div>
                      <div class="">
                        <p>交易地点：{{book.tradingPlace}}</p>
                      </div>
                </div>
            </div>
      </div>
    </div>
    </div>
  </div>
  <div class="col-md-2"></div>
  </div>
</div>
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
      bookId: '',
      bookname: 'Python编程 从入门到实践',
      introduction: '【图灵程序设计丛书】Python3.5编程入门图书 机器学习 数据处理 网络爬虫热门编程语言 从基本概念到完整项目开发 帮助零基础读者迅速掌握Python编程 附赠源代码文件',
      imgsrc: '../assets/logo.png',
      price: '12',
      author: '作者:[美]埃里克·马瑟斯（Eric Matthes）',
      saler: '***',
      qq: '******',
      phonenumber: '**********',
      wechat: '******',
      email: '***@***',
      place: '电子楼',
      book: ''
    }
  },
  created () {
    // console.log('接收到的参数为' + this.$route.query.bookId)
    this.bookId = this.$route.query.bookId
    this.$http
      .post(PSApi.getBook, {book_id: this.bookId})
      .then(result => {
        this.book = result.body
        console.log(this.book)
      })
  }
}
</script>

<style>

.book-name{
  font-size: 28px;
  text-align: left;
}
.book-text{
  color: #000;
  text-align: left;
}
.book-intro{
  font-size: 20px;
  text-align: left;
}

.book-author,
.book-publisher,
.book-time {
  font-size: 10px;
  text-align: left;
}

.book-price{
  font-size: 28px;
  text-align: left;
}
.clear-float:after,
.clear-float:before{
  content: "";
  display: block;
  clear: both;
}

</style>
