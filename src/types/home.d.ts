/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}

export type CategoryItem = {
  /** id */
  id: string
  /** 图片链接 */
  icon: string
  name: string
}

export type HotItem = {
  alt: string
  /** id */
  id: string
  /** 图片链接 */
  pictures: array
  target: string
  icon: string
  title: string
  type: number
}

export type GuessItem = {
  count: number
  /** id */
  items: array
  /** 图片链接 */
  page: array
  target: string
  icon: string
  title: string
  type: number
}
