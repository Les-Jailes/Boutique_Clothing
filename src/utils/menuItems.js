export const menuItems = [
  {
    alt: 'user profile website',
    src: '/user-profile.png',
    url: '/pages/user-profile',
    icon: 'user'
  },
  {
    alt: 'cart website',
    src: '/cart.png',
    url: '/pages/shopping-cart',
    icon: 'cart'
  },
  {
    alt: 'menu bar',
    src: '/menu-bar.png',
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