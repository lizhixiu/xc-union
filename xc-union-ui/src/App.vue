<template>
  <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
      v-bind="configProvider"
  >
    <n-message-provider>
      <n-dialog-provider>
        <router-view/>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import {reactive} from 'vue'
import {dateZhCN, NConfigProvider, zhCN} from 'naive-ui'
import global from '@/scripts/global'

const configProvider = reactive({})
configProvider.themeOverrides = global.selectTheme.themeOverrides

</script>

<style scoped>
/* 组件样式 */
</style>