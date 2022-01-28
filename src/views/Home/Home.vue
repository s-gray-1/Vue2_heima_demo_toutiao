<template>
  <div class="home-container">
    <van-nav-bar title="黑马头条" fixed placeholder/>

  <!-- 导入注册并使用ArticleInfo组件 -->
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <ArticleInfo v-for="item in artlist"
  :key="item.id"
  :title="item.title"
  :author="item.aut_name"
  :cmt-count="item.comm_count"
  :time="item.pubdate"
  :cover="item.cover"></ArticleInfo>
  </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
// 导入
import { getAticleListAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/Article/ArticleInfo.vue'
export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10,
      // 文章的数组
      artlist: [],
      // 是否正在加载下一页数据，如果 loading 为 true，则不会反复触发 load 事件
      // 每当下一页数据请求回来之后，千万要记得，把 loading 从 true 改为 false
      loading: true,
      // 所有数据是否加载完毕了，如果没有更多数据了，一定要把 finished 改成 true
      finished: false,
      // 是否正在下拉刷新
      isLoading: false

    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    // 封装获取文章列表数据的方法
    // 封装获取文章列表数据的方法
    async initArticleList(isRefresh) {
      const { data: res } = await getAticleListAPI(this.page, this.limit)
      // console.log(res)
      // 如果是上拉加载更多 那么应该是：

      if (isRefresh) {
      // 证明是下拉刷新 新数据在前 旧数据在后
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        // 证明是 上拉加载更多 旧数据在前 新数据在后
        // this.artlist = [旧数据在前，新数据在后]
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }
      if (res.length === 0) {
        // 证明没有下一页数据了直接把finished 改为true 表示数据加载完了
        this.finished = true
      }
    },
    // 只要 onLoad 被调用，就应该请求下一页数据
    onLoad() {
      // console.log('触发了load事件')

      // 1.让页码值加一
      this.page++

      // 2 中心请求接口获取数据
      this.initArticleList()
    },
    onRefresh() {
      console.log('触发啦下拉刷新')
      // 1 让 页码值加一
      this.page++
      // 2 重新加载数据
      this.initArticleList(true)
    }
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
// .home-container{
//   /deep/.van-nav-bar{
//   background-color: #007bff;
//     .van-nav-bar__title{
//     color: #fff;
//     }
//   }

// }

</style>
