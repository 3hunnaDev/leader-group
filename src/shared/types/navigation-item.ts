import type { AppRoutePath } from '@/shared/config/route-paths'

export interface NavigationItem {
  id: string
  label: string
  to: AppRoutePath
}
