export default function( context ) {
  if ( !context.$auth.loggedIn || context.$auth.state.user.permission != 'admin' ) {
    return context.redirect('/');
  }
}