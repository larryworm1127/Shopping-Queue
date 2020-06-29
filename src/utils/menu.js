import store from 'store'

export default function Menulog() {
  if (!!store.get('loggedIn')) {
    return [
      {
        label: 'Home',
        pathname: '/'
      },
      {
        label: 'Map',
        pathname: '/map'
      },
      {
        label: 'My Queues',
        pathname: '/queue'
      },
      {
        label: 'Profile',
        pathname: '/profile'
      },
      {
        label: 'Register',
        pathname: '/register'
      },
      {
        label: 'Login',
        pathname: '/login'
      },
      {
        label: 'Logout',
        pathname: '/logout'
      },
    ];
  }
  else {
    return [
      {
        label: 'Home',
        pathname: '/'
      },
      {
        label: 'Login',
        pathname: '/login'
      },
    ];
  }
}
