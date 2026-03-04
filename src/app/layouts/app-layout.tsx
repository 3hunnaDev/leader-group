import { Outlet } from 'react-router-dom'
import { SiteHeader } from '@widgets/site-header'

export function AppLayout() {
  return (
    <div className="app-layout">
      <SiteHeader />
      <div className="app-layout__content">
        <Outlet />
      </div>
    </div>
  )
}
