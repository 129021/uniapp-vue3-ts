import type { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'

export const useGuessList = () => {
  const guessRef = ref<XtxGuessInstance>()
  const onScrollToLower = () => {
    guessRef.value?.getMore()
  }
  return {
    guessRef,
    onScrollToLower,
  }
}
