import { createApp }    from 'vue';
import './style.css';
import App              from './app.vue';
import PrimeVue         from 'primevue/config';
import Material         from '@primeuix/themes/material';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {
    Button, Card, Column, ConfirmationService, ConfirmDialog,
    DataTable, Select, SelectButton, Tag, Toast, ToastService, Toolbar, Tooltip, Image
} from 'primevue';
import i18n    from './i18n.js';
import router  from './router.js';
import pinia   from './pinia.js';

createApp(App).use(pinia)
    .use(router)
    .use(i18n)
    .use(PrimeVue, { theme: { preset: Material }, ripple: true })
    .use(ConfirmationService)
    .use(ToastService)
    .component('pv-button',         Button)
    .component('pv-card',           Card)
    .component('pv-column',         Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-data-table',     DataTable)
    .component('pv-select',         Select)
    .component('pv-select-button',  SelectButton)
    .component('pv-tag',            Tag)
    .component('pv-toast',          Toast)
    .component('pv-toolbar',        Toolbar)
    .component('pv-image',          Image)
    .directive('tooltip',           Tooltip)
    .mount('#app');
