<script setup>
// import { useLayoutStore } from '@dash/stores/index.js'

// const layout = useLayoutStore()

// import {useToast} from "vue-toastification";
// const toast = useToast();

const logout = () => {
  // api.post('/logout')
  //   .then(({data}) => {
  //     toast[data.status](data.message);
  //     setTimeout(() => {
  //       localStorage.removeItem('token');
  //       window.location.href = '/';
  //     }, 1000);
  //   });
}
</script>

<template>
  <nav class="navbar bg-body-tertiary shadow" id="app-navbar">
    <!--    <button class="btn bg-body-tertiary"-->
    <!--            id="app-sidebar-toggle"-->
    <!--            @click="layout.toggleMenu()"-->
    <!--    >-->
    <!--      <i class="fas fa-bars"></i>-->
    <!--    </button>-->

    <div class="d-flex justify-content-center align-items-center">
<!--      <button class="btn bg-body-tertiary position-relative" @click="layout.toggleNotifications()">-->
<!--        <i class="fas fa-bell"></i>-->
<!--        <span class="nf-count">0</span>-->
<!--      </button>-->

      <div class="dropdown">
        <button
          class="btn bg-body-tertiary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fas fa-user"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <router-link :to="{ name: 'settings' }" class="dropdown-item nav-profile-item">
              <i class="fas fa-gear"></i>
              <span>Ayarlarım</span>
            </router-link>
          </li>
          <li>
            <button class="dropdown-item nav-profile-item" @click="logout">
              <i class="fas fa-sign-out-alt"></i>
              <span>Çıkış Yap</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
