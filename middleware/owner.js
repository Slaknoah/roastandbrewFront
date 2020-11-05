export default function( context ) {
  if ( !context.$auth.loggedIn || context.$auth.user.permission == 'user' ) {
    return context.redirect('/');
  }
}