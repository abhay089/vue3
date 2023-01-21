/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import store from "./store";
// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import vqVuetify from "@qnx/vuetify";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);

registerPlugins(app);
app.use(store);
app.use(pinia);
app.use(vqVuetify);

app.mount("#app");
