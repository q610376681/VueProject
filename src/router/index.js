import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index.vue'
import login from '@/components/login.vue'
import myinfo from '@/components/myinfo.vue'
import productInfo from '@/components/productInfo.vue'
import releaseBook from '@/components/releaseBook.vue'
import classifiedBooks from '@/components/classifiedBooks.vue'
import searchBooks from '@/components/searchBooks.vue'
Vue.use(Router)

export default new Router({
  base: '/dist',
  routes: [
    {
      path: '/helloword',
      name: 'HelloWorld123',
      component: HelloWorld
    },
    {path: '/', redirect: '/index'},
    {path: '/login', component: login},
    {path: '/index', name: 'index', component: index},
    {path: '/myinfo', component: myinfo},
    {path: '/productInfo', component: productInfo},
    {path: '/releaseBook', component: releaseBook},
    {path: '/classifiedBooks', component: classifiedBooks},
    {path: '/searchBooks', component: searchBooks}
  ]
})
