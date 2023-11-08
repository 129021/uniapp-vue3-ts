<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CustomNavBar from './components/CustomNavBar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { getHomeBannerAPI, getCategoryMutliAPI, getHotMutliAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'

const guessRef = ref<XtxGuessInstance>()

const onScrolltolower = () => {
  // console.log('我触底拉');
  guessRef.value.getMore()
}

const homeBannerData = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  // console.log(res)
  homeBannerData.value = res.result
}

const categoryPanelData = ref<CategoryItem[]>([])
const getCategoryPanelData = async () => {
  const res = await getCategoryMutliAPI()
  // console.log('getCategoryMutliAPI:', res)
  categoryPanelData.value = res.result
}

const hotPanelData = ref<HotItem[]>([])
const getHotPanelData = async () => {
  const res = await getHotMutliAPI()
  // console.log('hotpaneldata:',res);
  hotPanelData.value = res.result
}
onLoad(() => {
  getHomeBannerData()
  // getCategoryMutliAPI
  getCategoryPanelData()
  getHotPanelData()
})
//

// 下拉刷新
const isRefresher = ref(false)
const onRefresherrefresh = async () => {
  isRefresher.value = true
  // console.log('下拉刷新了');
  // 重置猜你喜欢的数据
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getCategoryPanelData(),
    getHotPanelData(),
    guessRef.value?.getMore(),
  ])
  isRefresher.value = false
}
</script>

<template>
  <CustomNavBar></CustomNavBar>
  <scroll-view
    scroll-y
    @scrolltolower="onScrolltolower"
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isRefresher"
  >
    <XtxSwiper :list="homeBannerData" />
    <CategoryPanel :list="categoryPanelData" />
    <HotPanel :list="hotPanelData" />
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  scroll-view {
    flex: 1;
  }
}
//
</style>
