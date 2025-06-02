<template>
  <n-card title="" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="淘宝商品卡片" tab="淘宝商品卡片">
        <tbk-card-list/>
      </n-tab-pane>
      <n-tab-pane name="淘宝商品列表" tab="淘宝商品列表">
        <tbk-list/>
      </n-tab-pane>
      <n-tab-pane name="物料精选升级版" tab="物料精选升级版">
        <material-ids-tabs/>
      </n-tab-pane>
      <n-tab-pane name="物料精选" tab="物料精选">
        <material-selection-tabs/>
      </n-tab-pane>
      <n-tab-pane name="淘宝店铺列表" tab="淘宝店铺列表">
        <shop-list/>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup>
import TbkList from "@/views/tbk/tbk-list.vue";
import TbkCardList from "@/views/tbk/tbk-card-list.vue";
import ShopList from "@/views/tbk/shop-list.vue";
import MaterialSelectionTabs from "@/views/tbk/material-selection-tabs.vue";
import MaterialIdsTabs from "@/views/tbk/material-ids-tabs.vue";
</script>
<style scoped>
</style>
<script setup lang="ts">
</script>