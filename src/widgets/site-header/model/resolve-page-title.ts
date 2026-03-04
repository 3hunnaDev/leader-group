import type { NavigationItem } from '@shared/config/navigation'

const BASE_TITLE = 'Leader Group'
const HOME_HREF = '/#home'

export function resolvePageTitle(items: NavigationItem[], locationTarget: string) {
  const normalizedTarget = locationTarget === '/' ? HOME_HREF : locationTarget
  const currentItem = items.find((item) => item.href === normalizedTarget)

  if (!currentItem?.label) {
    return BASE_TITLE
  }

  return `${currentItem.label} :: ${BASE_TITLE}`
}
