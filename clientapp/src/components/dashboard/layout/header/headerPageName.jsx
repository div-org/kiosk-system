const headerNameList = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'dashboard-icon.png'
  },
  {
    path: '/dashboard/clients',
    name: 'Clients',
    icon: 'clients-icon.png'
  }
]


export const getHeaderPageName = (path) => {
  const headerItem = headerNameList.find(item => item.path === path)
  return headerItem ? headerItem : {}
}