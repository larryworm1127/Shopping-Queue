import store from 'store';

export default function Menu() {
  if (!!store.get('loggedIn')) {
    switch (store.get('loginAs')) {
      case 0:
        return [
          { label: 'Home', pathname: '/' },
          { label: 'Profile', pathname: '/profile' },
          { label: 'Map', pathname: '/map' },
          { label: 'My Queues', pathname: '/queue' },
          { label: 'Logout', pathname: '/logout' }
        ];
      case 1:
        return [
          // Hide Map and My Queues tabs from shop owners and admin
          { label: 'Home', pathname: '/' },
          { label: 'Profile', pathname: '/store/profile' },
          { label: 'Current Queues', pathname: '/store/queues' },
          { label: 'Current Shoppers', pathname: '/store/shoppers' },
          { label: 'Logout', pathname: '/logout' },
        ];
      default:
        return [
          { label: 'Home', pathname: '/' },
          { label: 'Profile', pathname: '/admin/profile' },
          { label: 'All Queues', pathname: '/admin/queues' },
          { label: 'Logout', pathname: '/logout' },
        ];
    }
  } else {
    return [
      { label: 'Home', pathname: '/' },
      { label: 'Login', pathname: '/login' },
      { label: 'Register', pathname: '/register' },
    ];
  }
}

// pathname: (store.get('loginAs') === 0 ? '/profile' : (store.get('loginAs') === 1 ? 'owner-profile' : 'admin-profile'))
