<template>
  <div class="w-full py-2 bg-white border-t-2 h-16 fixed bottom-0 flex justify-center align-center">

    <nuxt-link class="w-1/3 flex justify-center flex-wrap" to="/companies" v-slot="{ href, isExactActive }">
      <a @click.prevent="$router.push(href)">
        <svg v-if="isExactActive" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.657 16.657L13.414 20.9C13.2284 21.0857 13.0081 21.2331 12.7656 21.3336C12.523 21.4342 12.2631 21.4859 12.0005 21.4859C11.738 21.4859 11.478 21.4342 11.2354 21.3336C10.9929 21.2331 10.7726 21.0857 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.40051 4.60901 7.93873C5.21452 6.47694 6.2399 5.22754 7.55548 4.3485C8.87107 3.46947 10.4178 3.00029 12 3.00029C13.5822 3.00029 15.1289 3.46947 16.4445 4.3485C17.7601 5.22754 18.7855 6.47694 19.391 7.93873C19.9965 9.40051 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 11C15 11.7956 14.6839 12.5587 14.1213 13.1213C13.5587 13.6839 12.7956 14 12 14C11.2044 14 10.4413 13.6839 9.87868 13.1213C9.31607 12.5587 9 11.7956 9 11C9 10.2044 9.31607 9.44129 9.87868 8.87868C10.4413 8.31607 11.2044 8 12 8C12.7956 8 13.5587 8.31607 14.1213 8.87868C14.6839 9.44129 15 10.2044 15 11Z" fill="white" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        <span class="text-xs w-full text-center">Карта</span>
      </a>
    </nuxt-link>

    <nuxt-link class="w-1/3 flex justify-center flex-wrap" to="/" v-slot="{ href, isExactActive }">
      <a @click.prevent="$router.push(href)">
        <svg v-if="isExactActive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 1L3 8H17L10 1Z" fill="black"/>
          <path d="M17 8H3L7 19C7.26522 19 7.51957 18.8946 7.70711 18.7071C7.89464 18.5196 8 18.2652 8 18V14C8 13.7348 8.10536 13.4804 8.29289 13.2929C8.48043 13.1054 8.73478 13 9 13H11C11.2652 13 11.5196 13.1054 11.7071 13.2929C11.8946 13.4804 12 13.7348 12 14V18C12 18.2652 12.1054 18.5196 12.2929 18.7071C12.4804 18.8946 12.7348 19 13 19L17 8Z" fill="black"/>
          <path d="M3 8V18C3 18.2652 3.10536 18.5196 3.29289 18.7071C3.48043 18.8946 3.73478 19 4 19H7L3 8Z" fill="black"/>
          <path d="M17 18V8L13 19H16C16.2652 19 16.5196 18.8946 16.7071 18.7071C16.8946 18.5196 17 18.2652 17 18Z" fill="black"/>
          <path d="M7.70711 18.7071C7.51957 18.8946 7.26522 19 7 19H13C12.7348 19 12.4804 18.8946 12.2929 18.7071C12.1054 18.5196 12 18.2652 12 18V14C12 13.7348 11.8946 13.4804 11.7071 13.2929C11.5196 13.1054 11.2652 13 11 13H9C8.73478 13 8.48043 13.1054 8.29289 13.2929C8.10536 13.4804 8 13.7348 8 14V18C8 18.2652 7.89464 18.5196 7.70711 18.7071Z" fill="black"/>
          <path d="M1 10L3 8M3 8L10 1L17 8M3 8H17M3 8V18C3 18.2652 3.10536 18.5196 3.29289 18.7071C3.48043 18.8946 3.73478 19 4 19H7M3 8L7 19M17 8L19 10M17 8V18C17 18.2652 16.8946 18.5196 16.7071 18.7071C16.5196 18.8946 16.2652 19 16 19H13M17 8L13 19M7 19C7.26522 19 7.51957 18.8946 7.70711 18.7071C7.89464 18.5196 8 18.2652 8 18V14C8 13.7348 8.10536 13.4804 8.29289 13.2929C8.48043 13.1054 8.73478 13 9 13H11C11.2652 13 11.5196 13.1054 11.7071 13.2929C11.8946 13.4804 12 13.7348 12 14V18C12 18.2652 12.1054 18.5196 12.2929 18.7071C12.4804 18.8946 12.7348 19 13 19M7 19H13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        <span class="text-xs w-full text-center">Главная</span>
      </a>
    </nuxt-link>

    <a @click.prevent="openLogin" class="w-1/3 flex justify-center flex-wrap">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span class="text-xs w-full text-center">Войти</span>
    </a>
  </div>
</template>


<script>
import { EventBus } from '@/event-bus';

export default {
  methods: {
    openLogin() {
      EventBus.$emit('prompt-login');
    },
  }
}
</script>