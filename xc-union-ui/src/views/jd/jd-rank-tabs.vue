<template>
  <n-card title="" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="全部" tab="全部">
        <jd-list :rankId="200000" />
      </n-tab-pane>

      <n-tab-pane name="食品酒水" tab="食品酒水">
        <jd-list :rankId="200001" />
      </n-tab-pane>

      <n-tab-pane name="家庭清洁" tab="家庭清洁">
        <jd-list :rankId="200002" />
      </n-tab-pane>


      <n-tab-pane name="个护美妆" tab="个护美妆">
        <jd-list :rankId="200003" />
      </n-tab-pane>

      <n-tab-pane name="医药保健" tab="医药保健">
        <jd-list :rankId="200004" />
      </n-tab-pane>

      <n-tab-pane name="生鲜" tab="生鲜">
        <jd-list :rankId="200005" />
      </n-tab-pane>

      <n-tab-pane name="数码家电" tab="数码家电">
        <jd-list :rankId="200006" />
      </n-tab-pane>

      <n-tab-pane name="家居日用" tab="家居日用">
        <jd-list :rankId="200007" />
      </n-tab-pane>

      <n-tab-pane name="时尚生活" tab="时尚生活">
        <jd-list :rankId="200008" />
      </n-tab-pane>

    </n-tabs>
  </n-card>
</template>
<script setup>
import JdList from "@/views/jd/jd-list.vue";
</script>
<style scoped>
</style>
<script setup lang="ts">
</script>