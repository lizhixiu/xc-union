<template>
  <n-card title="" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="大额店铺券" tab="大额店铺券">
        <material-selection-list :promotionId="37116"/>
      </n-tab-pane>
      <n-tab-pane name="天猫店铺券" tab="天猫店铺券">
        <material-selection-list :promotionId="62191"/>
      </n-tab-pane>
      <n-tab-pane name="券券补" tab="券券补">
        <material-selection-list :promotionId="61809"/>
      </n-tab-pane>
      <n-tab-pane name="有价券" tab="有价券">
        <material-selection-list :promotionId="37104"/>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup>
import MaterialSelectionList from "@/views/tbk/material-selection-list.vue";
</script>
<style scoped>
</style>
<script setup lang="ts">
</script>