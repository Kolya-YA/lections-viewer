import styles from './Header.module.css'
import CacheStatus from './CacheStatus'

const Header = ({ lastCache, setCurCourse, handleOpenGroupSel, curGroup }) => {

    return (
        <header className={styles.header}>
            <div className={ styles.header__selector}>
                <button title='Group selector' onClick={handleOpenGroupSel}>⋮</button>
            </div>
            <div>
                <h1 className={styles.header__name}>{curGroup || ' ← Select group'}</h1>
                { false  && <CacheStatus lastCache={lastCache} setCurCourse={setCurCourse} /> }
            </div>
        </header>
    )}

export default Header