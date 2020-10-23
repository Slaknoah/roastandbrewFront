<template>
  <div>
    <h1>Verify</h1>
    <button @click="resendVerificationEmail">Resend verification</button>
  </div>
</template>

<script>
export default {
  layout: 'App',
  methods: {
    async verifyEmail() {
      this.verifyingEmail = true;
      this.message = await this.$axios.post( this.$route.query.verify_url );

      this.reloadUser();
    },
    async reloadUser(){
      await this.$auth.fetchUser();
      this.verifyingEmail = false;
    },
    async resendVerificationEmail() {
      await this.$axios.post('/api/v1/email/resend');
      this.emailResent = true;
    }
  },
  mounted() {
    if ( this.$route.query.verify_url ) {
      alert(this.$route.query.verify_url);
      this.verifyEmail;
    }
  }
}
</script>