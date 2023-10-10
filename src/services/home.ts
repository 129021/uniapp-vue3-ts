import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { http } from '@/utils/http'
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

// /home/category/mutli

export const getCategoryMutliAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}

// /home/hot/mutli
export const getHotMutliAPI = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}

// GET/home/goods/guessLike
export const getHomeGoodsGuessLikeAPI = () => {
  return http({
    method: 'GET',
    url: '/home/goods/guessLike',
  })
}
