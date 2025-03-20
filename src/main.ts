import './assets/main.css';
import './assets/css/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 1. 引入你需要的组件
import { Button, Icon, PullRefresh, Field, CellGroup, Image as VanImage, Form, Toast, Dialog } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';


const app = createApp(App)

// 3. 注册你需要的组件
app.use(Button);
app.use(Icon);
app.use(PullRefresh);
app.use(Field);
app.use(CellGroup);
app.use(VanImage);
app.use(Form);
app.use(Toast);
app.use(createPinia())
app.use(router)

app.mount('#app')
