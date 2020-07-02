import store from 'store';

export default function Menu() {
  if (!!store.get('loggedIn')) {
    return (store.get('loginAs') === 0) ?
      [
        { label: 'Home', pathname: '/' },
        { label: 'Profile', pathname: '/profile' },
        { label: 'Map', pathname: '/map' },
        { label: 'My Queues', pathname: '/queue' },
        { label: 'Logout', pathname: '/logout' }
      ] :
      [
        // Hide Map and My Queues tabs from shop owners and admin
        { label: 'Home', pathname: '/' },
        { label: 'Profile', pathname: '/profile' },
        { label: 'Logout', pathname: '/logout' },
      ];
  } else {
    return [
      { label: 'Home', pathname: '/' },
      { label: 'Login', pathname: '/login' },
      { label: 'Register', pathname: '/register' },
    ];
  }
}
