import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

// Views
import HomeView from './views/HomeView.vue';
import CompareView from './views/CompareView.vue';
import WizardView from './views/WizardView.vue';
import ProgressView from './views/ProgressView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/compare', component: CompareView },
    { path: '/recommend', component: WizardView },
    { path: '/progress', component: ProgressView },
  ],
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
