import store from 'store'

export default function Menu() {
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
        pathname: (store.get('loginAs') === 0 ? '/profile' : (store.get('loginAs') === 1 ? 'owner-profile' : 'admin-profile'))
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
      {
        label: 'Register',
        pathname: '/register'
      },
    ];
  }
}
