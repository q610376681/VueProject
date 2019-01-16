<template>
  <div>
    <!-- 头部 -->
    <top></top>
    <!-- 内容 -->
    <div class="panel panel-default container" style="width:1000px">
      <div class="panel-body">
        <div class="page-header col-md-12 text-left " style="margin:10px">
          <h4>基本信息</h4>
        </div>
        <p class="" style="margin-bottom:17px;">
							发布您想出手的宝贝信息，也许会有人看到哟～记得至少留下您的一种联系方式，好让买家能找到您
				</p>
        <form class="form-horizontal" ref="releaseForm" :model="releaseForm" enctype="multipart/form-data">
          <div class="form-group">
            <label class="col-md-2 control-label" style="margin-left:-40px">图书名称：</label>
            <div class="col-md-10">
							<input v-model="releaseForm.name" name="name" maxlength="100"   class="form-control" type="text" placeholder="图书名称">
						</div>
          </div>
          <div class="form-group" style="margin-top:10px">
            <label class="col-md-2  control-label text-align" style="margin-left:-40px">图书介绍：</label>
            <div class="col-md-10 ">
							<textarea v-model="releaseForm.introduction" name="introduction" maxlength="1000" class="form-control" rows="5" ></textarea>
						</div>
          </div>
          <div class="form-group" style="margin-top:10px">
            <label class="col-md-2  control-label text-align" style="margin-left:-40px">作者：</label>
            <div class="col-md-4 ">
							<input v-model="releaseForm.author" name="author" class="form-control">
						</div>
            <label class="col-md-2  control-label text-align">出版社：</label>
            <div class="col-md-4 ">
							<input v-model="releaseForm.publishing_house" name="publishing_house" class="form-control">
						</div>
          </div>
        <div class="form-group" style="margin-top:10px">
            <label class="col-md-2  control-label text-align" style="margin-left:-40px">价格：</label>
            <div class="col-md-4 ">
							<input v-model="releaseForm.price" name="price" class="form-control">
						</div>
            <label class="col-md-2  control-label text-align">类别：</label>
            <div class="col-md-4 ">
							<select class="form-control" v-model="releaseForm.selected">
                <option v-for="category in categoryList" :key="category.name">{{category.name}}</option>
              </select>
						</div>
        </div>
        <div class="form-group" style="margin-top:10px">
          <label class="col-md-2 text-align">联系方式</label>
          <label class="col-md-10 text-left" style="font-weight:200;margin-left:-50px">（至少选填一项）</label>
        </div>
         <div class="form-group" style="margin-top:10px">
            <label class="col-md-2  control-label text-align" style="margin-left:-40px" >手机：</label>
            <div class="col-md-4 ">
							<input v-model="releaseForm.phoneNumber" name="phoneNumber" class="form-control" placeholder="请输入手机号">
						</div>
            <label class="col-md-2  control-label text-align">QQ：</label>
            <div class="col-md-4 ">
							<input v-model="releaseForm.QQ"  name="QQ" class="form-control" placeholder="请输入QQ号">
						</div>
          </div>
          <div class="form-group" style="margin-top:10px">
            <label class="col-md-2  control-label text-align" style="margin-left:-40px" >微信：</label>
            <div class="col-md-4 ">
							<input v-model="releaseForm.weixin"  name="weixin" class="form-control" placeholder="请输入微信号">
						</div>
            <label class="col-md-2  control-label text-align">交易地点：</label>
            <div class="col-md-4 ">
							<input v-model="releaseForm.tradingPlace" name="tradingPlace" class="form-control" placeholder="交易地点">
						</div>
          </div>
          <div class="page-header col-md-12 text-left " style="margin:10px">
            <h4>图片信息</h4>
          </div>
          <div class="form-group">
            <label for="exampleInputFile" class="col-md-2">图书封面</label>
            <input type="file" id="exampleInputFile" @change='add_img($event)' accept="image/gif,image/jpeg,image/jpg,image/png">
            <img v-if="releaseForm.photo_src !==''" :src="'./static/img/bookImg/'+releaseForm.photo_src" style="height:190px;width:140px" />
          </div>
          <button type="button"  @click="releaseBook"  col-md-12 class="btn btn-info" style="width:200px">马上发布</button>
        </form>
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
      categoryList: '',
      releaseForm: {
        name: '',
        introduction: '',
        photo_src: '',
        price: '',
        author: '',
        publishing_house: '',
        weixin: '',
        phoneNumber: '',
        QQ: '',
        tradingPlace: '',
        selected: ''
      }
    }
  },
  methods: {
    releaseBook () {
      if (this.releaseForm.selected === '' || this.releaseForm.selected === null) {
        alert('请输入书的类别!')
      } else {
        var user = JSON.parse(storage.session.getItem('user'))
        this.$http
          .post(PSApi.releaseBooks, {name: this.releaseForm.name,
            introduction: this.releaseForm.introduction,
            photo_src: this.releaseForm.photo_src,
            price: this.releaseForm.price,
            author: this.releaseForm.author,
            publishing_house: this.releaseForm.publishing_house,
            weixin: this.releaseForm.weixin,
            phoneNumber: this.releaseForm.phoneNumber,
            QQ: this.releaseForm.QQ,
            tradingPlace: this.releaseForm.tradingPlace,
            selected: this.releaseForm.selected,
            userId: user.id
          })
          .then(response => {
            console.log(response)
            alert('插入成功')
            this.$router.push('/myinfo')
            // if (confirm(response.body.msg)) {
            //   this.$router.push('/myinfo')
            // } else {
            //   this.$router.push('/myinfo')
            // }
          })
      }
    },
    add_img (event) {
      // let reader = new FileReader()
      let img = event.target.files[0]
      let size = img.size
      if (size > 11145728) {
        alert('请选择10M以内的图片')
        return false
      }
      // var uri = ''
      let form = new FormData()
      form.append('file', img, img.name)
      this.$http.post(PSApi.uploadBookCover, form, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(response => {
        console.log(response.data)
        console.log(response.data.data)
        this.releaseForm.photo_src = response.data.data
      })
    }
  },
  created () {
    this.$http
      .post(PSApi.getAllCategory)
      .then(result => {
        this.categoryList = result.body
        // console.log(this.categoryList)
      })
  }
}
</script>

<style>
</style>
