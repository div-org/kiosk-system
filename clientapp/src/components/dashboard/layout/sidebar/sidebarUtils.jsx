import Image from "../../../custom/Image"

const menuList = [
  {
    id: 'dashboard',
    name: 'dashboard',
    icon: 'dashboard-icon.png',
    route: '/dashboard'
  },
  {
    id: 'clients',
    name: 'clients',
    icon: 'clients-icon.png',
    route: '/dashboard/clients'
  },
  {
    id: 'billing',
    name: 'billing',
    icon: 'billing-icon.png',
    route: '/billing'
  },
  {
    id: 'reports',
    name: 'reports',
    icon: 'reports-icon.png',
    route: '/reports'
  },
  {
    id: 'support',
    name: 'support',
    icon: 'support-icon.png',
    route: '/support'
  }
]


export const getMenuList = () => {
  return menuList
}