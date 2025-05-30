<template>
  <svg
      v-if="dynamic"
      aria-hidden="true"
      class="xc-icon"
      :fill="color"
      :style="{ width: size, height: size }"
  >
    <use :xlink:href="symbolId" :class="className"/>
    <title>{{ title }}</title>
  </svg>
  <n-icon
      v-else
      :color="color"
      :size="size"
      :title="title"
  >
    <component :is="xicons[icon]"/>
  </n-icon>
</template>
<script setup>
import {computed, ref} from 'vue'
import xicons from '@/scripts/xicons'
import svgIcons from '@/scripts/svg-icons'

const props = defineProps({
  prefix: {
    type: String,
    default: 'xc-icon'
  },
  icon: String,
  size: {
    type: String,
    default: '1em'
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  title: {
    type: String,
    default: ''
  }
});
const symbolId = computed(() => props.icon && props.icon.startsWith('#') ? props.icon : `#${props.prefix}-${props.icon}`)
const className = computed(() => props.icon && props.icon.startsWith('#') ? props.icon.substring(1) : `${props.prefix}-${props.icon}`)
const dynamic = ref(false)
if (svgIcons.indexOf(props.icon) != -1) {
  dynamic.value = true
}
</script>
<style scoped>
.xc-icon {
  vertical-align: -0.25em;
  overflow: hidden;
}
</style>
