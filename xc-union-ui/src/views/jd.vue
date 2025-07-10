<template>
  <n-card title="" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="京东联盟实时热销榜" tab="京东联盟实时热销榜">
        <jd-rank-tabs/>
      </n-tab-pane>
      <n-tab-pane name="京东联盟官方活动" tab="京东联盟官方活动">
        <jd-activity-tabs/>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup>
import JdRankTabs from "@/views/jd/jd-rank-tabs.vue";
import JdActivityTabs from "@/views/jd/jd-activity-tabs.vue";
</script>
<style scoped>
</style>
<script setup lang="ts">
</script>