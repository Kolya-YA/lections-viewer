import styles from './Footer.module.css'

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footer__version}>
            v0.1 (alpha react) <a href="https://github.com/Kolya-YA/lections-viewer" target="_blank" rel="noopener noreferrer">Link to GitHub</a>
        </div>
        <div className={styles.footer__copyright}>
            Copyright © WebStrom & AIT ;-)
        </div>
    </footer>
)

export default Footer