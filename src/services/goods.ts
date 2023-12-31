import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

// GET/goods
export const getGoodsAPI = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
}
