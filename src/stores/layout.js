import {defineStore} from "pinia";
import {ref} from "vue";
import defMenu from "@/constants/menu.js";

export const useLayoutStore = defineStore('layout', () => {
  const menuIsOpen = ref(true);
  const notificationsIsOpen = ref(false);

  const currentStatus = ref('full');

  const menu = ref([]);

  const toggleMenu = () => {
    menuIsOpen.value = !menuIsOpen.value;
    currentStatus.value = menuIsOpen.value ? 'full' : 'mini';
  }

  const toggleNotifications = () => {
    notificationsIsOpen.value = !notificationsIsOpen.value;
  }

  const init = () => {
    menu.value = defMenu;
  }

  return {
    menuIsOpen,
    currentStatus,
    toggleMenu,
    notificationsIsOpen,
    toggleNotifications,
    menu,
    init,
  };
}, {persist: true});
