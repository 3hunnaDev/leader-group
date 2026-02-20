import { Outlet } from 'react-router-dom'
import { Header } from '@/components/header/header'
import styles from './app-layout.module.css'

export function AppLayout() {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
