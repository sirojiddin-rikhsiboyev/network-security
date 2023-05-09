import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";

// Pages
import FormPage from "@/pages/FormPage.vue";
import CommentsPage from "@/pages/CommentsPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: FormPage },
  { path: "/comments", component: CommentsPage },
];

const router: Router = createRouter({ history: createWebHistory(), routes });

export default router;
