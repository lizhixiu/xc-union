<template>
  <div class="pagination-container" style="height: 50px">
    <div style="flex: 1;margin-right: 10px">
      <n-text>共 {{ itemCount }} 条记录</n-text>
    </div>
    <n-pagination
        :page="page"
        :page-size="pageSize"
        :item-count="itemCount"
        :page-sizes="[10, 20, 50, 100, 200]"
        @updatePage="emit('update-page', $event)"
        @updatePageSize="emit('update-page-size', $event)"
        show-quick-jumper
        show-size-picker
        style="margin: 0 auto;"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  itemCount: {
    type: Number,
    default: undefined
  }
})
const emit = defineEmits(['update-page', 'update-page-size'])
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
}
</style>
