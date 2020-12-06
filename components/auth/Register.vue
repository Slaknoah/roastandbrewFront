<template>
  <base-modal :isModalOpen="showRegister">
    <div class="inline-block text-left overflow-hidden shadow-xl transform bg-white rounded-lg align-middle sm:max-w-sm w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <form class="px-8 pt-6 pb-8 mb-4">
        <h3 class="text-xl leading-6 font-medium text-gray-900 mb-3" id="modal-headline">
          Регистрация
        </h3>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Имя
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                :class="{ 'border-red-500': !validations.name.valid }"
                type="text"
                placeholder="John Doe"
                v-model="form.name">
          <p class="text-red-500 text-xs italic" v-show="!validations.name.valid">
            {{validations.name.message}}
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                :class="{ 'border-red-500': !validations.email.valid }"
                type="text"
                autocomplete="username"
                placeholder="example@mail.com"
                v-model="form.email">
          <p class="text-red-500 text-xs italic" v-show="!validations.email.valid">
            {{validations.email.message}}
          </p>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Пароль
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                :class="{ 'border-red-500': !validations.password.valid }"
                autocomplete="new-password"
                type="password"
                placeholder="******************"
                v-model="form.password">
          <p class="text-red-500 text-xs italic" v-show="!validations.password.valid">
            {{validations.password.message}}
          </p>

          <div class="flex items-center mt-1">
            <span class="rounded-full mr-1 w-12 h-1 block"
                  v-bind:class="{
                        'bg-red-500' : passwordStrength.score <= 1,
                        'bg-orange-500' : passwordStrength.score == 2,
                        'bg-yellow-500' : passwordStrength.score == 3,
                        'bg-green-500' : passwordStrength.score == 4
                    }"></span>
            <span class="rounded-full mr-1 w-12 h-1 block"
                    v-bind:class="{
                        'bg-gray-500' : passwordStrength.score <= 1,
                        'bg-orange-500' : passwordStrength.score == 2,
                        'bg-yellow-500' : passwordStrength.score == 3,
                        'bg-green-500' : passwordStrength.score == 4
                    }"></span>
            <span class="rounded-full mr-1 w-12 h-1 block"
                    v-bind:class="{
                        'bg-gray-500' : passwordStrength.score <= 2,
                        'bg-yellow-500' : passwordStrength.score == 3,
                        'bg-green-500' : passwordStrength.score == 4
                    }"></span>
            <span class="rounded-full mr-1 w-12 h-1 block"
                    v-bind:class="{
                        'bg-gray-500' : passwordStrength.score <= 3,
                        'bg-green-500' : passwordStrength.score == 4
                    }"></span>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Повторите пароль
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                :class="{ 'border-red-500': !validations.confirm_password.valid }"
                type="password"
                autocomplete="new-password"
                placeholder="******************"
                v-model="form.confirm_password">
          <p class="text-red-500 text-xs italic" v-show="!validations.confirm_password.valid">
            {{validations.confirm_password.message}}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
                  type="button"
                  @click.prevent="register">
            Регистрация
          </button>
          <a @click.prevent="openLogin" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Уже есть аккаунт ? Войти
          </a>
        </div>
      </form>

      <div class="-ml-2 absolute top-0 right-0 px-6 py-4">
        <button @click="closeRegister" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
          <!-- Heroicon name: x -->
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/global/Modal/BaseModal';
import { EventBus } from '@/event-bus';
const zxcvbn = require('zxcvbn');

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      validations: {
        name: {
          valid: true,
          message: ''
        },
        email: {
          valid: true,
          message: ''
        },
        password: {
          valid: true,
          message: ''
        },
        confirm_password: {
          valid: true,
          message: ''
        }
      }
    }
  },
  props: {
    showRegister: false
  },
  methods: {
    closeRegister() {
      EventBus.$emit('hide-register');
    },
    openLogin() {
      this.closeRegister();
      EventBus.$emit('prompt-login')
    },
    register() {
      if ( this.validateRegistration() ) {
        this.$axios.get('/sanctum/csrf-cookie')
          .then( function() {
            this.$axios.post('/register', this.form)
              .then( function( response ) {
                  this.$auth.loginWith( 'laravelSanctum', { data: this.form } )
                    .then( function() {
                      // Handle authentication success
                      this.closeRegister();
                      EventBus.$emit('roast-login');
                    }.bind(this) )
                }.bind(this)
              )
              .catch( function( error ) {
                  // Handle registration failure and show error messages
                  // error.response.data.errors.message
                }.bind(this)
              )
          }.bind(this));
      }
    },
    validateRegistration() {
      let formValid = true;

      if (this.form.name == '') {
        this.validations.name.valid = false;
        this.validations.name.message = 'A name is required on this field';
        formValid = false;
      } else {
        this.validations.name.valid = true;
        this.validations.name.message = '';
      }

      if (this.form.email == '' || !this.form.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.validations.email.valid = false;
        this.validations.email.message = 'A valid email address has to be entered to register user';
        formValid = false;
      } else {
        this.validations.email.valid = true;
        this.validations.email.message = '';
      }

      if (this.form.password == '' || this.passwordStrength.score < 4) {
        this.validations.password.valid = false;
        this.validations.password.message = 'A secure password must be entered';
        formValid = false;
      } else {
        this.validations.password.valid = true;
        this.validations.password.message = '';
      }

      if (this.form.confirm_password == '' || this.form.confirm_password != this.form.password) {
        this.validations.confirm_password.valid = false;
        this.validations.confirm_password.message = 'Your passwords must match';
        formValid = false;
      } else {
        this.validations.confirm_password.valid = true;
        this.validations.confirm_password.message = '';
      }


      return formValid;
    }
  },
  computed: {
    passwordStrength(){
      return zxcvbn( this.form.password );
    }
  },
  components: {
    BaseModal
  }
}
</script>
