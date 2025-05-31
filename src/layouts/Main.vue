<script setup>
import {useLayoutStore} from "@/stores/index.js";
import {onMounted} from "vue";
import Sidebar from "@/layouts/partials/Sidebar.vue";
import Navbar from "@/layouts/partials/Navbar.vue";
import Notifications from "@/layouts/partials/Notifications.vue";

const layout = useLayoutStore();

onMounted(() => {
  layout.init();
});
</script>

<template>
  <div id="app-wrapper">
    <div id="wrapper-overlay" :class="{ 'show': layout.menuIsOpen }" @click="layout.toggleMenu()"></div>
    <div id="notification-overlay" :class="{ 'show': layout.notificationsIsOpen }"
         @click="layout.toggleNotifications()">
    </div>

    <Notifications/>
    <Sidebar/>
    <main id="app-content">
      <Navbar/>

      <div id="app-content__wrapper">
        <slot/>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
