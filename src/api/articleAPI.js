// 文章相关的API接口 都封装到这个模块中
// 向外按需导出一个 API函数
import request from '@/utils/request.js'
export const getAticleListAPI = function(_page, _limit) {
  return request.get('/articles',
  // 请求参数
    {
      params: {
        _page,
        _limit
      }
    })
}
