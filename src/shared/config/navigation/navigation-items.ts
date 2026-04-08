export type NavigationItem = {
  href: string
  label: string
}

export const navigationItems: NavigationItem[] = [
  { href: '/#home', label: 'Главная' },
  { href: '/#assortment', label: 'Ассортимент и услуги' },
  { href: '/#about', label: 'О нас' },
  { href: '/#projects', label: 'Наши проекты' },
  { href: '/#contacts', label: 'Контакты' },
]

export const contactNavigationItems = navigationItems.filter((item) => item.href !== '/#contacts')
