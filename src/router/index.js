import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/dashboard",
      name: "dashboard",
      component: () => import("../layout/DashboardLayout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard.index",
          component: () => import("../views/dashboard/Index.vue"),
        },
        {
          path: "/mahasiswa",
          name: "mahasiswa.index",
          component: () => import("../views/mahasiswa/Index.vue"),
        },
        {
          path: "/dosen",
          name: "dosen.index",
          component: () => import("../views/dosen/Index.vue"),
        },
        {
          path: "/fakultas",
          name: "fakultas.index",
          component: () => import("../views/fakultas/Index.vue"),
        },
        {
          path: "/prodi",
          name: "prodi.index",
          component: () => import("../views/prodi/Index.vue"),
        },
        {
          path: "/matakuliah",
          name: "matakuliah.index",
          component: () => import("../views/matakuliah/Index.vue"),
        },
        {
          path: "/matakuliah_aktif",
          name: "matakuliah_aktif.index",
          component: () => import("../views/matakuliah_aktif/Index.vue"),
        },
        {
          path: "/krs",
          name: "krs.index",
          component: () => import("../views/krs/Index.vue"),
        },
        {
          path: "/khs",
          name: "khs.index",
          component: () => import("../views/khs/Index.vue"),
        },
        {
          path: "/transkrip",
          name: "transkrip.index",
          component: () => import("../views/transkrip/Index.vue"),
        },
      ],
    },
  ],
});
