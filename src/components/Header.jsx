import styles from './Header.module.css'
import CacheStatus from './CacheStatus'

const Header = () => (
    <header className={styles.header}>
        <div className={ styles.header__selector}><button disabled>⋮</button></div>
        <div>
            <h1 className={styles.header__name}>cohort21</h1>
            <CacheStatus />
        </div>
    </header>
)

export default Header