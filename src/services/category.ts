import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

// GET/category/top
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
