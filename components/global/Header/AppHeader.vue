<template>
  <div class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:block hidden">
      <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div class="lg:w-0 lg:flex-1 hidden md:block">
          <nuxt-link to="/" class="flex items-center">
            <img class="h-7 w-auto" src="/img/logos/header-logo.svg" alt="Workflow">
          </nuxt-link>
        </div>

        <transition name="fade-in">
          <div class="absolute md:hidden">
            <a v-on:click="$router.go(-1)" class="cursor-pointer flex items-center justify-center w-8 h-8 ml-3">
                <img src="/img/ui/back.svg" class="h-5 pointer-events-none"/>
            </a>
          </div>
        </transition>
        <nav class="hidden md:flex spac23123e-x-10">
          <div class="relative">
            <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
            <button @click.prevent="isFlyoutOpen = !isFlyoutOpen" type="button" class="px-3 text-gray-500 group inline-flex items-center space-x-2 text-base leading-6 font-medium hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150" to="/">
              <span>Solutions</span>
              <!--
                Heroicon name: chevron-down

                Item active: "text-gray-600", Item inactive: "text-gray-400"
              -->
              <svg class="text-gray-400 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <transition
             enter-active-class="transition ease-out duration-200"
             enter-class="opacity-0 translate-y-1"
             enter-to-class="opacity-100 translate-y-0"
             leave-active-class="transition ease-in duration-150"
             leave-class="opacity-100 translate-y-0"
             leave-to-class="opacity-0 translate-y-1">
              <div v-show="isFlyoutOpen" class="absolute top-1/2 left-1/2 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                <div class="rounded-lg shadow-lg">
                  <div class="rounded-lg shadow-xs overflow-hidden">
                    <div class="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                        <!-- Heroicon name: chart-bar -->
                        <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <div class="space-y-1">
                          <p class="text-base leading-6 font-medium text-gray-900">
                            Analytics
                          </p>
                          <p class="text-sm leading-5 text-gray-500">
                            Get a better understanding of where your traffic is coming from.
                          </p>
                        </div>
                      </a>
                      <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                        <!-- Heroicon name: cursor-click -->
                        <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        <div class="space-y-1">
                          <p class="text-base leading-6 font-medium text-gray-900">
                            Engagement
                          </p>
                          <p class="text-sm leading-5 text-gray-500">
                            Speak directly to your customers in a more meaningful way.
                          </p>
                        </div>
                      </a>
                      <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                        <!-- Heroicon name: shield-check -->
                        <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div class="space-y-1">
                          <p class="text-base leading-6 font-medium text-gray-900">
                            Security
                          </p>
                          <p class="text-sm leading-5 text-gray-500">
                            Your customers data will be safe and secure.
                          </p>
                        </div>
                      </a>
                      <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                        <!-- Heroicon name: view-grid -->
                        <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <div class="space-y-1">
                          <p class="text-base leading-6 font-medium text-gray-900">
                            Integrations
                          </p>
                          <p class="text-sm leading-5 text-gray-500">
                            Connect with third-party tools that you’re already using.
                          </p>
                        </div>
                      </a>
                      <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                        <!-- Heroicon name: refresh -->
                        <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <div class="space-y-1">
                          <p class="text-base leading-6 font-medium text-gray-900">
                            Automations
                          </p>
                          <p class="text-sm leading-5 text-gray-500">
                            Build strategic funnels that will drive your customers to convert
                          </p>
                        </div>
                      </a>
                    </div>
                    <div class="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                      <div class="flow-root">
                        <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150">
                          <!-- Heroicon name: play -->
                          <svg class="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Watch Demo</span>
                        </a>
                      </div>
                      <div class="flow-root">
                        <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150">
                          <!-- Heroicon name: phone -->
                          <svg class="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>Contact Sales</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <nuxt-link to="/companies" class="px-3 text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">
            Компании
          </nuxt-link>
        </nav>
        <div class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0" v-if="!$auth.user">
          <a @click.prevent="openLogin" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
            Войти
          </a>
          <span class="inline-flex rounded-md shadow-sm">
            <a @click="openRegister" class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
              Регистрация
            </a>
          </span>
        </div>

        <!-- Profile dropdown -->
        <div class="hidden ml-3 relative md:flex justify-end md:flex-1"
              v-else
              @mouseover="isUserMenuActive = true"
              @mouseleave="isUserMenuActive = false">
          <div>
            <button class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true">
              <img class="h-8 w-8 rounded-full" src="https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg" alt="">
            </button>
          </div>

          <transition enter-active-class="transition ease-out duration-100"
                      enter-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95">
            <div class="origin-top-right absolute right-0 mt-10 w-48 rounded-md shadow-lg" v-show="isUserMenuActive">
              <div class="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Профиль</a>

                <nuxt-link v-if="$auth.user.permission == 'admin'"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          to="/system-settings">System Settings</nuxt-link>

                <a @click.prevent="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Выйти</a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="px-4 md:hidden">
      <div class="flex justify-between items-center border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
        <transition name="fade-in">
          <div class="block" v-if="showNav">
            <a v-on:click="$router.go(-1)" class="cursor-pointer flex items-center justify-center w-8 h-8">
              <img src="/img/ui/back.svg" class="h-5 pointer-events-none"/>
            </a>
          </div>

          <div class="logo block" v-else>
            <nuxt-link to="/" class="flex items-center">
              <img class="h-6 w-auto" src="/img/logos/header-logo-sm.svg" alt="Workflow">
            </nuxt-link>
          </div>
        </transition>

        <div class="search">
          <a href="#">
            <svg class="w-6 h-6" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 19L13 13L19 19ZM15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus';

export default {
  data() {
    return {
      isFlyoutOpen: false,
      isUserMenuActive: false
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout();
    },
    openLogin() {
      EventBus.$emit('prompt-login');
    },
    openRegister() {
      EventBus.$emit('prompt-register');
    }
  },
  computed: {
    showNav(){
      return this.$route.name != 'index';
    }
  },
  watch: {
    $route() {
      this.isUserMenuActive = false;
      this.isFlyoutOpen = false;
    }
  }
}
</script>