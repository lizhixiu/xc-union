<template>
  <n-card title="" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="全部" tab="全部">
        <jd-activity-list  />
      </n-tab-pane>

    </n-tabs>
  </n-card>
</template>
<script setup>
import JdActivityList from "@/views/jd/jd-activity-list.vue";
</script>
<style scoped>
</style>
<script setup lang="ts">
</script>