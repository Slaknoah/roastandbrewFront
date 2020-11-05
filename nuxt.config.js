import fs from 'fs';
import path from 'path';

require('dotenv').config({
  path: process.env.ROAST_PLATFORM == 'mobile'
            ? '.env.mobile-' + ( process.argv[process.argv.length - 1].replace('--', '') )
            : '.env'
});

export default {
  mode: 'universal',

  server: {
    port: 4000,
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ROAST - Discover your next favourite cup of coffee.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'initial-scale=1, user-scalable=no, width=device-width, height=device-height, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /**
   * Customize the progress bar color
   */
  loading: false,
  pageTransition: {
    mode: ''
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/roastAPI.js',
    {
      src: '~/plugins/secureStorage.js',
      mode: 'client'
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@tailwindcss/ui'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_BASE_URL,
    credentials: true
  },

  env: {
    mobile: process.env.ROAST_PLATFORM == 'mobile' ? true : false
  },

  auth: {
    redirect:{
      login: '/?login=true',
      home: false
    },
    strategies: {
      'local': {
        user: {
          property: false
        },
        token: {
          property: 'token'
        },
        endpoints: {
          login: {
            url: '/api/v1/login',
            method: 'post',
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            },
          },
          logout: {
            url: '/api/v1/logout',
            method: 'post'
          },
          user: {
            url: '/api/v1/user',
            method: 'get'
          },
        },
      },
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: process.env.API_BASE_URL,
        endpoints:{
          login:{
            url: '/login',
          },
          user: {
            url: '/api/v1/user'
          },
          logout: {
            url: '/logout'
          }
        }
      }
    }
  },

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: '/nuxt/',

    /*
    ** Extend webpack config here
    */
   extend(config, ctx) {}
  }
}
