import {createApp} from 'vue';
import App from './App.vue';
import {setupTheme} from '@/scripts/plugins/theme.js'
import {setupNaiveDiscreteApi} from '@/scripts/plugins/naiveDiscreteApi'
import router from './router';
import naive from 'naive-ui';



const app = createApp(App)

async function start() {
    app.use(naive);
    setupNaiveDiscreteApi()
    await app.use(router);
    await setupTheme()
    app.mount('#app')
}

void start()

