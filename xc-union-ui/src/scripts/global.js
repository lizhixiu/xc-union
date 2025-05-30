import {reactive, ref} from "vue";

const baseApi = import.meta.env.VITE_APP_BASE_API;
const modalIndex = ref(10)
const modalMap = reactive({})

export default {
    title: 'xc-union',
    baseApi: baseApi,
    filePrefix: '',
    dynamicComponentNames: [],
    config: {},
    uiSize: ref('medium'),
    selectTheme: {
        name: 'default',
        themeOverrides: {}
    },
    themeList: [{
        name: 'default',
        themeOverrides: 'defaultOverrides',
        style: 'defaultStyle'
    }],
    modal: {
        modalMap,
        create(id) {
            modalMap[id] = {}
            modalMap[id].vlaue = false
        },
        show(id) {
            modalMap[id].value = true
        },
        hide(id) {
            modalMap[id].value = false
        },
        getIndex(id) {
            modalIndex.value = modalIndex.value + 1
            modalMap[id].index = modalIndex.value
            return modalIndex.value
        }
    }
}
