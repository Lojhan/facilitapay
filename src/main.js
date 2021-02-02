import { createApp } from 'vue'
import App from './App.vue'
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';

import PrimeVue from 'primevue/config';

createApp(App)
.use(PrimeVue)
.component('Dropdown', Dropdown)
.component('InputNumber', InputNumber)

.mount('#app')
