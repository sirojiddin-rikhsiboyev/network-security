import { createApp } from "vue";
import router from "@/router";
import App from "@/App.vue";

import "@/assets/main.css";
import "uikit/dist/css/uikit.min.css";

// @ts-ignore
import UiKit from "uikit/dist/js/uikit";
// @ts-ignore
import UiKitIcon from "uikit/dist/js/uikit-icons";

UiKit.use(UiKitIcon);

createApp(App).use(router).mount("#app");
