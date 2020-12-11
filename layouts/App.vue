<template>
  <div id="app-layout" class="flex flex-col min-h-screen w-screen select-none safe-top safe-left safe-right safe-bottom">
    <app-header v-show="showHeader"/>

    <main>
      <nuxt />
    </main>

    <register :showRegister="isRegisterOpen && !$auth.user"/>
    <login :showLogin="isLoginOpen && !$auth.user"/>

    <app-footer v-show="showFooter"/>
    <app-mobile-footer class="md:hidden"></app-mobile-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/global/Header/AppHeader';
import AppFooter from '@/components/global/Footer/AppFooter';
import AppMobileFooter from '@/components/global/Footer/AppMobileFooter';
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
    AppMobileFooter,
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

      return process.env.mobile ? false : pages.indexOf(this.$route.name) == -1;
    },
    showHeader() {
      let pages = [];

      return pages.indexOf(this.$route.name) == -1;
    }
  },

  beforeRouteEnter (to, from, next) {
    if( to.query.login == 'true' )  {
      EventBus.$emit('hide-register');
      EventBus.$emit('prompt-login');
    }

    if( to.query.register == 'true' ) {
      EventBus.$emit('hide-login');
      EventBus.$$emit('prompt-register');
    }

    next();
  },

  watch: {
    $route(to, from) {
      if( to.query.login == 'true' ){
        EventBus.$emit('prompt-login');
      }

      if( to.query.register == 'true' ){
        EventBus.$emit('prompt-register');
      }
    }
  },

  created() {
    EventBus.$on('prompt-login', this.toggleLogin );

    EventBus.$on('hide-login', this.toggleLogin );

    EventBus.$on('prompt-register', this.toggleRegister );

    EventBus.$on('hide-register', this.toggleRegister );
  },

  mounted() {
    if( this.$route.query.login == 'true' ){
      EventBus.$emit('prompt-login');
    }

    if( this.$route.query.register == 'true' ){
      EventBus.$emit('prompt-register');
    }
  }
}
</script>

<style>
  .disable-scrollbars ::-webkit-scrollbar {
    width: 0;
    background: transparent;
    display: none;
  }

  .roast-checkbox-container {
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    line-height: 1.45
}

.roast-checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0
}

.roast-checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border: 1px solid #515151;
    border-radius: 3px
}

.roast-checkbox-container:hover input~.roast-checkmark,.roast-checkmark {
    background-color: #fff
}

.roast-checkbox-container input:checked~.roast-checkmark {
    background-color: #342c0c
}

.roast-checkmark:after {
    content: "";
    position: absolute;
    display: none
}

.roast-checkbox-container input:checked~.roast-checkmark:after {
    display: block
}

.roast-checkbox-container .roast-checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg)
}
</style>