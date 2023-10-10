<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CustomNavBar from './components/CustomNavBar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { getHomeBannerAPI, getCategoryMutliAPI, getHotMutliAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'

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
</script>

<template>
  <CustomNavBar></CustomNavBar>
  <scroll-view scroll-y>
    <XtxSwiper :list="homeBannerData" />
    <CategoryPanel :list="categoryPanelData" />
    <HotPanel :list="hotPanelData" />
    <XtxGuess />
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
