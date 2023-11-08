export const menuItems = [
  {
    url: '/pages/user-profile',
    icon: 'user'
  },
  {
    url: '/pages/shopping-cart',
    icon: 'cart'
  },
  {
    url: '/',
    submenu: [
      {
        title: 'Settings',
        url: '/settings',
      },
      {
        title: 'More about us',
        url: '/about-us',
      },
      {
        title: 'Get in Contact',
        url: '/contact-us',
      },
    ],
    icon:'bar'
  },
];