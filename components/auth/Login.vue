<template>
  <base-modal :isModalOpen="showLogin">
    <div class="inline-block text-left overflow-hidden shadow-xl transform bg-white rounded-lg align-middle sm:max-w-sm w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <form class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 class="text-xl leading-6 font-medium text-gray-900 mb-3" id="modal-headline">
          Вход
        </h3>
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
            {{ validations.email.message }}
          </p>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Пароль
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                :class="{ 'border-red-500': !validations.password.valid }"
                type="password"
                autocomplete="current-password"
                placeholder="******************"
                v-model="form.password">
          <p class="text-red-500 text-xs italic" v-show="!validations.password.valid">
            {{ validations.password.message }}
          </p>
        </div>

        <span class="text-xs text-red-500" v-show="!validations.invalidLogin.valid">
          {{ validations.invalidLogin.message }}
        </span>

        <div class="flex items-center justify-between">
          <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  v-on:click="login">
            Войти
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800" href="#">
            Забыли пароль?
          </a>
        </div>
        <div class="flex items-center justify-between mt-5">
            Впервые на Pech?
          <a @click="openRegister" class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800 ml-3" href="#">
             Регистрация
          </a>
        </div>
      </form>

      <div class="-ml-2 absolute top-0 right-0 px-6 py-4">
        <button @click="closeLogin" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
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
import { EventBus } from '@/event-bus';
import BaseModal from '@/components/global/Modal/BaseModal';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      validations: {
        email: {
          valid: true,
          message: ''
        },
        password: {
          valid: true,
          message: ''
        },
        invalidLogin: {
          valid: true,
          message: ''
        }
      }
    };
  },
  props: {
    showLogin: false
  },
  methods: {
    closeLogin() {
      EventBus.$emit('hide-login');
    },
    openRegister() {
      this.closeLogin();
      EventBus.$emit('prompt-register')
    },
    validateLogin() {
      if ( this.form.email == '' || this.form.email.match(/^(([^<>()[\]\\.,;:\s@\"] +(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\. [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+ [a-zA-Z]{2,}))$/) ) {
        this.validations.email.valid = false;
        this.validations.email.message = 'Для входа необходимо ввести действующий email';
      } else {
        this.validations.email.valid = true;
        this.validations.email.message = '';
      }

      if ( this.form.password == '' ) {
        this.validations.password.valid = false;
        this.validations.password.message = 'Необходимо ввести пароль';
      } else {
        this.validations.password.valid = true;
        this.validations.password.message = '';
      }

      return ( this.validations.email.valid && this.validations.password.valid ) ? true : false;
    },

    runPreAuthAction() {
      switch ( this.preAuthAction.action ) {
        case 'navigate':
          this.$router.push({
            path: this.preAuthAction.route
          })
        break;
      }

      this.$store.commit( 'pendingActions/setPreAuthAction', {} );
    },

    login() {
      if (this.validateLogin()) {

        // Ensure right method is used depending on Platform
        if ( process.env.mobile ) {
          this.$auth.loginWith( 'local', { data: {
                  email: this.form.email,
                  password: this.form.password,
                  device_name: 'Mobile App'
                } } )
                .then( function( response ) {
                  this.$CapacitorSecureStorage.set({ key: 'zernoAuthToken', value: response.data.token })
                    .then( function( success ) {
                      this.closeLogin();
                      this.runPreAuthAction();
                      EventBus.$emit('zerno-login');
                    }.bind(this) )
                    .catch( function( error ) {
                      console.log( error );
                    });
                }.bind( this ) )
                .catch( function( error ) {
                  this.validations.invalidLogin.valid = false;
                  this.validations.invalidLogin.message = 'Invalid credentials, please try again!!'
                  this.validations.email.valid = false;
                  this.validations.password.valid = false;
                })
        } else {
          this.$auth.loginWith('laravelSanctum', { data: this.form })
            .then( function () {
                // Handle successful login
                this.closeLogin();
                this.runPreAuthAction();
                EventBus.$emit('zerno-login');
              }.bind(this)
            )
            .catch( function (error) {
                // Handle login errors
                this.validations.invalidLogin.valid = false;
                this.validations.invalidLogin.message = 'Неверные данные, попробуйте еще раз!!'
                this.validations.email.valid = false;
                this.validations.password.valid = false;
              }.bind(this)
            );
        }
      }
    }
  },
  components: {
    BaseModal
  },
  computed: {
    ...mapState('pendingActions', {
      'preAuthAction': state => state.preAuthAction
    })
  }
}
</script>