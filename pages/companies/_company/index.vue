<template>
  <div>
    <div class="w-full bg-cover bg-center h-56.25 md:h-72 lg:h-125" :style="'background-image: url(' + company.header_image_url + ')'"></div>
    <div class="flex flex-col pb-10 md:pt-10 pt-5 w-full mx-auto max-w-screen-xl">
      <div v-if="$auth.loggedIn && canModifyCompany" class="mb-5 flex justify-end px-4 sm:px-6 lg:ml-4 lg:flex-row">
        <span class="shadow-sm rounded-md mr-2" >
          <nuxt-link :to="'/companies/' + company.slug + '/edit'" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
            <svg class="sm:-ml-1 sm:mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            <span class="hidden sm:block">Изменить</span>
          </nuxt-link>
        </span>

        <span class="shadow-sm rounded-md">
          <a @click.prevent="deleteCompany" href="#" class="inline-flex items-center px-4 py-2 border border-red-400 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:border-red-500 focus:outline-none focus:shadow-outline-red focus:border-red-300 active:text-red-800 active:bg-red-50 transition duration-150 ease-in-out">
            <svg class="sm:-ml-1 sm:mr-2 h-5 w-5 text-red-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            <span class="hidden sm:block text-red-400 hover:text-red-500">Удалить</span>
          </a>
        </span>
      </div>

      <div class="px-4 sm:px-6 flex items-center justify-between">
        <div class="flex-1 min-w-0 max-w-md items-center flex">
          <img :src="company.logo_url" alt="" class="h-20 w-20 rounded-full">

          <div class="ml-5">
            <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
              {{ company.name }}
            </h1>
            <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6" v-if="company.cafes_count">
                <svg class="flex-shrink-0 mr-1 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                {{ company.cafes_count }} Кафе
              </div>
              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                <!-- Heroicon name: location-marker -->
                <svg class="flex-shrink-0 mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                {{ company.city }}, {{ company.state }}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 flex lg:mt-0 lg:ml-4 lg:flex-row flex-col">
          <div class="flex flex-col items-center mb-1 w-24">
            <img src="/img/ui/like.svg" class="cursor-pointer" v-if="!liked" @click="likeCompany">
            <img src="/img/ui/liked.svg" class="cursor-pointer" v-else @click="likeCompany">
            <span class="text-base text-gray-500" v-if="likes">{{ likes }}</span>
          </div>
        </div>
      </div>

      <div class="">
        <div class="mt-10 px-4">
          <div class="text-3xl font-bold text-black mb-2">Описание</div>
          <div>
            {{ company.description }}
          </div>
        </div>

        <div class="mt-10 px-4">
          <div class="text-3xl font-bold text-black mb-4">Услуги</div>
          <div class="flex flex-col w-full md:flex-row">
            <div class="flex items-start w-full md:w-1/2 lg:w-1/3" v-if="company.roaster">
              <img src="/img/icons/coffee-bag.svg" class="mr-5">
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Ростер</span>
                <span class="text-base text-gray-600">Эта компания обжаривает свой кофе.</span>
              </div>
            </div>

            <div class="flex items-start mt-4 w-full md:mt-0 md:w-1/2 lg:w-1/3" v-if="company.subscription">
              <img src="/img/icons/subscription.svg" class="mr-5">
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Подписка доступна</span>
                <span class="text-base text-gray-600">Посетите их веб-сайт для получения информации о подписке.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 px-4">
          <div class="text-3xl font-bold text-black mb-4">Контакты</div>
          <div class="flex flex-col w-full md:flex-row">
            <div class="flex items-start w-full md:w-1/2 lg:w-1/3" v-if="company.website">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Website</span>
                <a :href="company.website" target="_blank" class="text-base text-gray-600">{{ company.website }}</a>
              </div>
            </div>

            <div class="flex items-start w-full md:w-1/2 lg:w-1/3 mt-3" v-if="company.instagram_url">
              <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.002 21.041C9.54195 21.041 9.25195 21.028 8.29195 20.986C7.54332 20.9614 6.80439 20.8092 6.10695 20.536C4.90026 20.0664 3.94609 19.1119 3.47695 17.905C3.21426 17.205 3.07257 16.4655 3.05795 15.718C3.00195 14.76 3.00195 14.446 3.00195 12.005C3.00195 9.538 3.01495 9.25 3.05795 8.295C3.07289 7.54853 3.21457 6.81001 3.47695 6.111C3.94558 4.90253 4.9013 3.94718 6.10995 3.479C6.8086 3.21521 7.5473 3.07315 8.29395 3.059C9.24895 3.005 9.56295 3.005 12.002 3.005C14.482 3.005 14.767 3.018 15.712 3.059C16.4605 3.07327 17.2012 3.21531 17.902 3.479C19.1103 3.94771 20.0658 4.90288 20.535 6.111C20.8021 6.8202 20.9445 7.57026 20.956 8.328C21.012 9.28601 21.012 9.59901 21.012 12.039C21.012 14.479 20.998 14.799 20.956 15.746C20.9411 16.4942 20.799 17.2344 20.536 17.935C20.0656 19.1427 19.11 20.0976 17.902 20.567C17.2022 20.8292 16.4631 20.9709 15.716 20.986C14.761 21.041 14.448 21.041 12.002 21.041ZM11.968 4.588C9.52195 4.588 9.26795 4.6 8.31295 4.643C7.74294 4.65056 7.17843 4.75575 6.64395 4.954C5.85471 5.25601 5.23018 5.878 4.92495 6.666C4.72517 7.2063 4.61996 7.77698 4.61395 8.353C4.56095 9.322 4.56095 9.576 4.56095 12.005C4.56095 14.405 4.56995 14.696 4.61395 15.659C4.62291 16.2292 4.72805 16.7938 4.92495 17.329C5.23063 18.1165 5.85505 18.738 6.64395 19.04C7.17807 19.2396 7.7428 19.3448 8.31295 19.351C9.28095 19.407 9.53595 19.407 11.968 19.407C14.421 19.407 14.675 19.395 15.622 19.351C16.1924 19.3441 16.7573 19.2389 17.292 19.04C18.0764 18.7354 18.6969 18.1153 19.002 17.331C19.2014 16.7903 19.3065 16.2193 19.313 15.643H19.324C19.367 14.687 19.367 14.432 19.367 11.989C19.367 9.54601 19.356 9.289 19.313 8.334C19.304 7.76446 19.1988 7.20052 19.002 6.666C18.6976 5.88058 18.077 5.2593 17.292 4.954C16.7574 4.75475 16.1924 4.64953 15.622 4.643C14.655 4.588 14.402 4.588 11.968 4.588ZM12.002 16.624C10.1319 16.6252 8.44537 15.4997 7.72882 13.7725C7.01226 12.0452 7.40686 10.0563 8.72858 8.73347C10.0503 7.4106 12.0388 7.01428 13.7667 7.72934C15.4946 8.4444 16.6215 10.13 16.622 12C16.6192 14.5511 14.553 16.619 12.002 16.624ZM12.002 8.998C10.3451 8.998 9.00195 10.3412 9.00195 11.998C9.00195 13.6549 10.3451 14.998 12.002 14.998C13.6588 14.998 15.002 13.6549 15.002 11.998C14.9981 10.3427 13.6572 9.00185 12.002 8.998ZM16.802 8.28501C16.2074 8.2828 15.7269 7.79959 15.728 7.20501C15.7291 6.61043 16.2114 6.12901 16.806 6.12901C17.4005 6.12901 17.8828 6.61042 17.884 7.205C17.8842 7.49187 17.7702 7.76703 17.5672 7.96968C17.3642 8.17234 17.0888 8.2858 16.802 8.28501Z" fill="#2E3A59"/>
              </svg>
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Instagram</span>
                <a :href="company.instagram_url" target="_blank" class="text-base text-gray-600">{{ company.instagram_url }}</a>
              </div>
            </div>

            <div class="flex items-start w-full md:w-1/2 lg:w-1/3 mt-3" v-if="company.facebook_url">
              <svg class="mr-2 w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                <path d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z" fill="#2E3A59"/>
                </g>
                <defs>
                <clipPath id="clip0">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
              </svg>
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Facebook</span>
                <a :href="company.facebook_url" target="_blank" class="text-base text-gray-600">{{ company.facebook_url }}</a>
              </div>
            </div>

            <div class="flex items-start w-full md:w-1/2 lg:w-1/3 mt-3" v-if="company.twitter_url">
              <svg class="mr-2 w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.995 6.68799C20.8914 6.15208 21.5622 5.30823 21.882 4.31399C21.0397 4.81379 20.118 5.16587 19.157 5.35499C17.8246 3.94552 15.7135 3.60251 14.0034 4.51764C12.2933 5.43277 11.4075 7.37948 11.841 9.26999C8.39062 9.09676 5.17598 7.4669 2.99702 4.78599C1.85986 6.74741 2.44097 9.25477 4.32502 10.516C3.64373 10.4941 2.97754 10.3096 2.38202 9.97799C2.38202 9.99599 2.38202 10.014 2.38202 10.032C2.38241 12.0751 3.82239 13.8351 5.82502 14.24C5.19308 14.4119 4.53022 14.4372 3.88702 14.314C4.45022 16.0613 6.06057 17.2583 7.89602 17.294C6.37585 18.4871 4.49849 19.1342 2.56602 19.131C2.22349 19.1315 1.88123 19.1118 1.54102 19.072C3.50341 20.333 5.78738 21.0023 8.12002 21C11.3653 21.0223 14.484 19.7429 16.7787 17.448C19.0734 15.1531 20.3526 12.0342 20.33 8.78899C20.33 8.60299 20.3257 8.41799 20.317 8.23399C21.1575 7.62659 21.8828 6.87414 22.459 6.01199C21.676 6.35905 20.8455 6.58691 19.995 6.68799Z" fill="#2E3A59"/>
              </svg>
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Twitter</span>
                <a :href="company.twitter_url" target="_blank" class="text-base text-gray-600">{{ company.twitter_url }}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 px-4">
          <div class="text-3xl font-bold text-black mb-2">
            Кафе
            <a class="text-indigo-600 font-bold text-base ml-1"
              @click="login('navigate-to-add-cafe')"
              v-if="!$auth.loggedIn">Добавить кафе →</a>
            <nuxt-link :to="'/companies/'+company.slug+'/cafes/new'"
                      class="text-indigo-600 font-bold text-base ml-1"
                      v-if="$auth.loggedIn && canModifyCompany">Добавить кафе →</nuxt-link>
          </div>
          <div class="flex justify-start flex-wrap overflow-x-auto pt-2 lg:flex-wrap">
            <nuxt-link v-for="cafe in cafes"
                      :key="cafe.id"
                      :to="'/companies/'+company.slug+'/cafes/'+cafe.slug"
                      class="flex-grow-0 flex-shrink-0 mb-5 mr-4 cursor-pointer w-full sm:w-48 md:w-56.25">

              <div class="bg-white border-b-2 border-gray-200 rounded-15" style="box-shadow: rgba(0, 0, 0, 0.21) 0px 2px 9px 0px;">
                <div class="block w-full bg-center bg-cover rounded-t-15 h-40 md:h-48" :style="'background-image: url(' + cafe.primary_image_url + ');'">
                </div>
                <div class="flex flex-col border-t border-lightBlueBorder py-5 px-4">
                  <span class="font-bold text-base w-full truncate">{{ cafe.location_name }}</span>
                  <div class="flex">
                    <span class="text-xs text-textGray">{{ `${ cafe.city }, ${ cafe.country }`  }}</span>
                  </div>
                </div>
              </div>

            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus';
import { mapState } from 'vuex';

export default {
  layout: 'App',
  async asyncData( { app, params, error } ) {
    try {
      const [ company, cafes ] = await Promise.all([
        app.$api.companies.show( params.company ),
        app.$api.cafes.index( params.company )
      ]);

      return {
        company: company,
        cafes: cafes
      }
    } catch( e ) {
      error( {
        statusCode: 404, message: ''
      } );
    }
  },
  data() {
    return {
      likes: 0,
      liked: false,
    }
  },
  computed: {
    ...mapState('pendingActions', {
      'preAuthAction': state => state.preAuthAction
    }),
    canModifyCompany() {
      return this.$auth.loggedIn && this.$auth.user.permission != 'user';
    }
  },
  methods: {
    async deleteCompany() {
      if ( confirm('Are you sure you want to delete?') ) {
        await this.$api.companies.delete( this.company.slug )
          .then( function ( response ) {
            this.$router.push( {
              path: `/companies`
            } );
          }.bind( this ) );
      }

    },

    setUpLikes() {
      if ( this.$auth.loggedIn ) {
        this.liked = this.company.liked;
      }

      this.likes = this.company.likes_count;
    },

    async likeCompany() {
      if ( this.$auth.loggedIn ) {
        let toggleLike = await this.$api.companies.like( this.$route.params.company );
        this.liked = toggleLike.status;
        this.likes = toggleLike.likes;
      } else {
        this.$store.commit('pendingActions/setPreAuthAction', {
          action: 'like-company',
          company: this.$route.params.company
        } );

        EventBus.$emit('prompt-login');
      }
    },

    login( preAuthAction = '' ) {
      if (preAuthAction != '') {
        switch( preAuthAction ) {
          case 'navigate-to-add-cafe':
            this.$store.commit( 'pendingActions/setPreAuthAction', {
              action: 'navigate',
              route: `/companies/${this.company.slug}/cafes/new`
            })
          break;
        }
      }

      EventBus.$emit('prompt-login');
    },

    runPreAuthAction() {
      switch ( this.preAuthAction.action ) {
        case 'like-company':
          this.likeCompany();
        break;
      }

      this.$store.commit( 'pendingActions/setPreAuthAction', {} );
    }
  },
  async mounted() {
    EventBus.$off('zerno-login');

    EventBus.$on('zerno-login', function() {
      this.runPreAuthAction();
    }.bind(this));
    this.setUpLikes();
  }
}
</script>

<style scoped>
  input[type="file"]{
      position: absolute;
      top: -5000px;
  }
</style>