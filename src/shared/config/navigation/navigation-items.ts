export type NavigationItem = {
  href: string
  label: string
}

export const navigationItems: NavigationItem[] = [
  { href: '/#home', label: 'Home' },
  { href: '/#solutions', label: 'Solutions' },
  { href: '/#why-us', label: 'Why Us' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
]

export const contactNavigationItems = navigationItems.filter((item) => item.href !== '/#contact')
