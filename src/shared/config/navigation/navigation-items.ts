export type NavigationItem = {
  href: string
  labelKey: string
}

export const navigationItems: NavigationItem[] = [
  { href: '/#home', labelKey: 'header.navigation.home' },
  { href: '/#solutions', labelKey: 'header.navigation.solutions' },
  { href: '/#why-us', labelKey: 'header.navigation.whyUs' },
  { href: '/#projects', labelKey: 'header.navigation.projects' },
  { href: '/#contact', labelKey: 'header.navigation.contact' },
]

export const contactNavigationItems = navigationItems.filter((item) => item.href !== '/#contact')
