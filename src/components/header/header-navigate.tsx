import { NavLink } from 'react-router-dom'
import { HEADER_NAVIGATION_ITEMS } from '@/shared/config/header-navigation'
import styles from './header-navigate.module.css'

export function HeaderNavigate() {
  return (
    <nav className={styles.root}>
      {HEADER_NAVIGATION_ITEMS.map((item) => (
        <NavLink
          key={item.id}
          to={item.to}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles['link-active']}` : styles.link
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
