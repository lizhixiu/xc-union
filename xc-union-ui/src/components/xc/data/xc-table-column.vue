<template>
    <span>
        <template v-if="type === 'html'">
            <xc-table-tooltip :nowrap="nowrap">
                <span v-html="getLabel(row, col)"></span>
            </xc-table-tooltip>
            <xc-icon v-if="col.copyText" class="copy-text" icon="CopyOutline"
                     @click="copyText(getValueByPath(row, col.field))"/>
        </template>
        <template v-else-if="type === 'templet'">
            <xc-table-tooltip :nowrap="nowrap">
                <span v-html="col.templet(row, col, index)"></span>
            </xc-table-tooltip>
            <xc-icon v-if="col.copyText" class="copy-text" icon="CopyOutline"
                     @click="copyText(col.templet(row, col, index))"/>
        </template>
        <template v-else-if="type === 'buttons'">
            <n-space>
                <template v-for="it in col.buttons">
                    <slot v-if="it.type == 'dynamic'" :name="it.field" :row="row" :index="index"/>
                    <n-button
                        v-else-if="it.if != undefined ? it.if(row) : true"
                        v-permission="it.permission"
                        :type="it.type"
                        :text="it.link"
                        :dashed="it.dashed"
                        :href="it.href"
                        :color="it.color"
                        :target="it.target"
                        :tag="it.tag || (it.link ? 'a' : 'button')"
                        :text-color="it.textColor || '#2D8CF0'"
                        @click="it.click(row)"
                    >
                        <template #icon v-if="it.icon">
                            <xc-icon :icon="it.icon"/>
                        </template>
                        {{ it.label }}
                    </n-button>
                </template>
            </n-space>
        </template>
        <template v-else-if="type === 'image'">
            <n-image-group v-if="row[col.field]">
                <div style="margin: 0 2px; display: inline-block">
                    <n-image
                        v-if="row[col.field]"
                        lazy
                        :width="componentProperties.table.image.width"
                        :height="componentProperties.table.image.height"
                        :src="row[col.field].startsWith('http') ? row[col.field] : global.filePrefix + encodeURIComponent(row[col.field])"
                    />
                </div>
            </n-image-group>
        </template>
        <template v-else-if="type === 'images'">
            <n-image-group v-if="row[col.field]">
                <div style="margin: 0 2px; display: inline-block" v-for="it in row[col.field]">
                    <n-image
                        v-if="it"
                        lazy
                        :width="componentProperties.table.image.width"
                        :height="componentProperties.table.image.height"
                        :src="it.startsWith('http') ? it : global.filePrefix + encodeURIComponent(it)"
                    />
                </div>
            </n-image-group>
        </template>
        <template v-else>
            <xc-table-tooltip :nowrap="nowrap">
                <span v-html="getLabel(row, col)"></span>
            </xc-table-tooltip>
            <xc-icon v-if="col.copyText" class="copy-text" icon="CopyOutline" @click="copyText(getLabel(row, col))"/>
        </template>
    </span>
</template>

<script setup>
import global from '@/scripts/global'
import {get as getValueByPath} from "lodash-es";
import componentProperties from '@/components/xc-component-properties'

import {notEmptyNot01} from '@/scripts/common.js';

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  row: {
    type: Object,
    default: () => {
    }
  },
  col: {
    type: Object,
    default: () => {
    }
  },
  index: {
    type: Number,
    default: undefined
  },
  nowrap: {
    type: Boolean,
    default: undefined
  }
})

function copyText(text) {
  // $common.copyText(text)
}

function getLabel(row, col) {
  return notEmptyNot01(getValueByPath(row, col.field)) ? getValueByPath(row, col.field) : notEmptyNot01(col.defaultValue) ? col.defaultValue : ''
}
</script>
