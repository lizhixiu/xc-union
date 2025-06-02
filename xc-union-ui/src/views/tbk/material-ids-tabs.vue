<template>
  <n-card title="" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="促销活动-商品" tab="促销活动-商品">
        <material-ids-list :subject="1" materialType="1"/>
      </n-tab-pane>
      <n-tab-pane name="热门主题-商品" tab="热门主题-商品">
        <material-ids-list :subject="2" materialType="1"/>
      </n-tab-pane>
      <n-tab-pane name="精选榜单-商品" tab="精选榜单-商品">
        <material-ids-list :subject="3" materialType="1"/>
      </n-tab-pane>
      <n-tab-pane name="行业频道等-商品" tab="行业频道等-商品">
        <material-ids-list :subject="4" materialType="1"/>
      </n-tab-pane>
      <n-tab-pane name="其他-商品" tab="其他-商品">
        <material-ids-list :subject="5" materialType="1"/>
      </n-tab-pane>


      <n-tab-pane name="促销活动-权益" tab="促销活动-权益">
        <material-ids-list :subject="1" materialType="2"/>
      </n-tab-pane>
      <n-tab-pane name="热门主题-权益" tab="热门主题-权益">
        <material-ids-list :subject="2" materialType="2"/>
      </n-tab-pane>
      <n-tab-pane name="精选榜单-权益" tab="精选榜单-权益">
        <material-ids-list :subject="3" materialType="2"/>
      </n-tab-pane>
      <n-tab-pane name="行业频道等-权益" tab="行业频道等-权益">
        <material-ids-list :subject="4" materialType="2"/>
      </n-tab-pane>
      <n-tab-pane name="其他-权益" tab="其他-权益">
        <material-ids-list :subject="5" materialType="2"/>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup>
import MaterialIdsList from "@/views/tbk/material-ids-list.vue";
</script>
<style scoped>
</style>
<script setup lang="ts">
</script>