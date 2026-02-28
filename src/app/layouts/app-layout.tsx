import { Outlet } from 'react-router-dom'
import { SiteHeader } from '../../shared/ui/site-header/site-header'
import './app-layout.css'

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
