<script setup>
import { useLayoutStore } from '@/stores/index.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const layout = useLayoutStore()
const router = useRouter()
const activeSubMenus = ref([])

// const ps = usePersonalStore()

const toggleSubMenu = (uniq_id) => {
  activeSubMenus.value.includes(uniq_id)
    ? (activeSubMenus.value = activeSubMenus.value.filter((item) => item !== uniq_id))
    : activeSubMenus.value.push(uniq_id)
}

// const checkPermission = (menuItem) => {
//     if (ps.personal.roles.includes('Super Admin')) return true;
//
//     if (menuItem.permission && !ps.personal.permissions.includes(menuItem.permission)) return false;
//
//     if (menuItem.children && menuItem.children.length > 0) {
//         return menuItem.children.some((item) => {
//             return !(item.permission && !ps.personal.permissions.includes(item.permission));
//         });
//     }
//
//     return true;
// }
</script>

<template>
  <aside
    id="app-sidebar"
    class="shadow"
    :class="{
      show: layout.menuIsOpen,
      mini: layout.currentStatus === 'mini' && !layout.menuIsOpen,
      full: layout.currentStatus === 'mini' && layout.menuIsOpen,
    }"
    @mouseover="layout.currentStatus === 'mini' ? (layout.menuIsOpen = true) : null"
    @mouseleave="layout.currentStatus === 'mini' ? (layout.menuIsOpen = false) : null"
  >
    <div class="navbar-brand-box">
      <span class="logo-mini">X</span>
      <span class="logo-big">Project X</span>
    </div>

    <ul class="sidebar-menu">
      <!--            <li class="sidebar-menu__item"-->
      <!--                v-for="mItem in layout.menu"-->
      <!--                :key="mItem.uniq_id"-->
      <!--                v-show="checkPermission(mItem)"-->
      <!--            >-->
      <li
        class="sidebar-menu__item"
        v-for="mItem in layout.menu"
        :key="mItem.uniq_id"
      >
        <a
          href="javascript:void(0);"
          class="nav-link"
          v-if="mItem.path === ''"
          @click.prevent="toggleSubMenu(mItem.uniq_id)"
        >
          <span class="sidebar-menu__item__icon">
            <i :class="'fas ' + mItem.icon"></i>
          </span>
          <span>{{ mItem.name }}</span>

          <i class="fas fa-angle-down ms-auto" v-if="activeSubMenus.includes(mItem.uniq_id)"></i>
          <i class="fas fa-angle-right ms-auto" v-else></i>
        </a>

        <router-link :to="mItem.path" class="nav-link" v-else>
          <span class="sidebar-menu__item__icon">
            <i :class="'fas ' + mItem.icon"></i>
          </span>
          <span>{{ mItem.name }}</span>
        </router-link>

        <ul
          class="sidebar-menu__submenu"
          v-if="mItem.children"
          :class="{
            show:
              activeSubMenus.includes(mItem.uniq_id) ||
              mItem.children.some((item) => item.path === router.currentRoute.value.path),
          }"
        >
<!--          <li-->
<!--            class="sidebar-menu__item"-->
<!--            v-for="subItem in mItem.children"-->
<!--            :key="subItem.uniq_id"-->
<!--            v-show="checkPermission(subItem)"-->
<!--          >-->
            <li
              class="sidebar-menu__item"
              v-for="subItem in mItem.children"
              :key="subItem.uniq_id"
            >
            <router-link :to="subItem.path" class="nav-link sub-link">
              <span>{{ subItem.name }}</span>
              <span class="app-menu-badge" v-if="subItem.badge">{{ subItem.badge || 0 }}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.app-menu-badge {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #ff0000;
  color: #fff;
  padding: 0 5px;
  border-radius: 0.25rem;
  font-size: 12px;
}
</style>
