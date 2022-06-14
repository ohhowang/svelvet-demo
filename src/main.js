import { createApp } from "vue";
import App from "./App.vue";
import Drag from "./plugins/drag";

createApp(App).use(Drag).mount("#app");
