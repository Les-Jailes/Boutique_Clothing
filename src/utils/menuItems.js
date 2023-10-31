export const menuItems = [
  {
    alt: 'user profile website',
    src: '/user-profile.png',
    url: '/user-profile',
  },
  {
    alt: 'cart website',
    src: '/cart.png',
    url: '/shopping-cart',
  },
  {
    alt: 'menu bar',
    src: '/menu-bar.png',
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
  },
];