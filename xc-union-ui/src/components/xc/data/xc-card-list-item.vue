<template>
  <n-card class="product-card" :bordered="true" size="small" >
    <template #cover>
      <img :src="product.pictUrl" class="product-image" @click="handleClick"/>
    </template>
    <div class="brand">
      <n-tag type="error" size="small" class="brand-tag" :bordered="false">
        {{ product.brandName }}
      </n-tag>
      &nbsp;
      <n-tag type="error" size="small" class="brand-tag" :bordered="false">
        {{ product.shopTitle }}
      </n-tag>
    </div>
    <div class="price-section">


      <div class="current-price">
        <span class="price-symbol">¥</span>
        <span class="price-value">{{ product.finalPromotionPrice }}</span>
      </div>
      <div class="original-price">
        <span>¥{{ product.zkFinalPrice }}</span>
      </div>
      <n-tag type="error" size="small" class="discount-tag">
        返 {{ product.commissionAmount }}
      </n-tag>
    </div>
    <div class="title" @click="handleClick">{{ product.title }}</div>

    <div class="title">
      <n-space>
        <n-tag type="error" size="small" class="discount-tag" v-for="(it, i) in product.finalPromotionPathList"
               :key="i">
          {{ it.promotionDesc }}
        </n-tag>
      </n-space>
    </div>
    <div class="sales-info">
      <span>销量 {{ product.annualVol }}</span>
      <!-- 添加淘口令按钮 -->
      <n-button type="info" strong secondary size="mini" @click="tpwdCreateClick" class="taobao-btn">生成淘口令</n-button>
    </div>
  </n-card>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

// 定义自定义事件
const emit = defineEmits(['card-click']);

// 点击事件处理函数
const handleClick = () => {
  // 触发自定义事件并传递商品数据
  emit('card-click', props.product);
};

// 点击事件处理函数
const tpwdCreateClick = () => {
  // 触发自定义事件并传递商品数据
  emit('tpwdCreate-click', props.product);
};



</script>

<style scoped>
.product-card {
  width: 100%;
  transition: all 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.price-section {
  display: flex;
  align-items: baseline;
  margin-top: 8px;
  gap: 8px;
}

.current-price {
  color: #ff4d4f;
  font-weight: bold;
}

.price-symbol {
  font-size: 12px;
}

.price-value {
  font-size: 20px;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 12px;
}

.discount-tag {
  margin-left: auto;
}

.brand {
  margin: 8px 0;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  /* 添加 flex 布局 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-tag {
  /* 移除 margin-left: auto; 避免影响布局 */
}

.title {
  margin: 8px 0;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.sales-info {
  color: #999;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 让内容两端对齐 */
}


.taobao-btn {
  margin-left: auto; /* 让按钮靠右 */
}

</style>