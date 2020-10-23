<template>
  <div id="app-layout" class="flex flex-col min-h-screen w-screen select-none">
    <app-header v-show="showHeader"/>

    <main>
      <nuxt />
    </main>

    <register :showRegister="isRegisterOpen && !$auth.user"/>
    <login :showLogin="isLoginOpen && !$auth.user"/>

    <app-footer v-show="showFooter"/>
  </div>
</template>

<script>
import AppHeader from '@/components/global/Header/AppHeader';
import AppFooter from '@/components/global/Footer/AppFooter';
import Register from '@/components/auth/Register';
import Login from '@/components/auth/Login';
import { EventBus } from '@/event-bus';

export default {
  data() {
    return {
      isLoginOpen: false,
      isRegisterOpen: false
    }
  },
  components: {
    AppFooter,
    AppFooter,
    Register,
    Login
  },
  methods: {
    toggleLogin() {
      this.isLoginOpen = !this.isLoginOpen;
    },
    toggleRegister() {
      this.isRegisterOpen = !this.isRegisterOpen;
    }
  },
  computed: {
    showFooter() {
      let pages = [];

      return pages.indexOf(this.$route.name) == -1;
    },
    showHeader() {
      let pages = [];

      return pages.indexOf(this.$route.name) == -1;
    }
  },
  created() {
    EventBus.$on('loginClicked', this.toggleLogin );

    EventBus.$on('loginClose', this.toggleLogin );

    EventBus.$on('registerClicked', this.toggleRegister );

    EventBus.$on('registerClose', this.toggleRegister );
  }
}
</script>

<style>
  .disable-scrollbars ::-webkit-scrollbar {
    width: 0;
    background: transparent;
    display: none;
  }
</style>