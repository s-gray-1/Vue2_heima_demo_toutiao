import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'
// 把VueRouter安装为 Vue的组件
Vue.use(VueRouter)
// 路由规则的数组
const routes = [
  // 定义首页的路由规则
  { path: '/', component: Home },
  { path: '/user', component: User }
  // 定义我的路由规则
]
// 创建路由实例对象
const router = new VueRouter({
  routes
})

export default router
