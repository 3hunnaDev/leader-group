import { HeaderNavigate } from './header-navigate'
import { Button } from '@/shared/ui/button'
import styles from './header.module.css'

export function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <HeaderNavigate />
        <Button variant="primary" className={styles.action}>
          Создать заявку
        </Button>
      </div>
    </header>
  )
}
