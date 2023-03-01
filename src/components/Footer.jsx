import styles from './Footer.module.css'

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footer__version}>
            <a href="https://github.com/Kolya-YA/lections-viewer" target="_blank" rel="noopener noreferrer">
                v{import.meta.env.VITE_REACT_APP_VERSION} (react) GitHub
            </a>
        </div>
        <div className={styles.footer__copyright}>
            Copyright © WebStrom & AIT
        </div>
    </footer>
)

export default Footer