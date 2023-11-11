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
        url: '/pages/settings',
      },
      {
        title: 'More about us',
        url: '/pages/about-us',
      },
      {
        title: 'Get in Contact',
        url: '/pages/contact-us',
      },
    ],
    icon:'bar'
  },
];
