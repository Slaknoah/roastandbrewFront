export default $axios => ({
  async index() {
    try {
      return await $axios.$get( '/api/v1/brew-methods' );
    } catch ( err ) {
      // console.log( err );
    }
  },
});