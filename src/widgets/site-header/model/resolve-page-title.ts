import type { TFunction } from 'i18next'
import type { NavigationItem } from '@shared/config/navigation'

const HOME_HREF = '/#home'
const BASE_TITLE_KEY = 'meta.baseTitle'

export function resolvePageTitle(items: NavigationItem[], locationTarget: string, t: TFunction) {
  const normalizedTarget = locationTarget === '/' ? HOME_HREF : locationTarget
  const currentItem = items.find((item) => item.href === normalizedTarget)

  if (!currentItem) {
    return t(BASE_TITLE_KEY)
  }

  return `${t(currentItem.labelKey)} :: ${t(BASE_TITLE_KEY)}`
}
