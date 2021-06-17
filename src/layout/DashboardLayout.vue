<template>
  <v-app id="inspire">
    <dashboard-navbar></dashboard-navbar>
    <dashboard-sidebar></dashboard-sidebar>
    <dashboard-content></dashboard-content>
  </v-app>
</template>

<script>
import DashboardSidebar from "./DashboardSidebar.vue";
import DashboardContent from "./DashboardContent.vue";
import DashboardNavbar from "./DashboardNavbar.vue";
export default {
  components: { DashboardContent, DashboardSidebar, DashboardNavbar },
};
</script>
