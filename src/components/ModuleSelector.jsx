import styles from './ModuleSelector.module.css'

const ModuleSelector = ({ selConfig }) => {

    // console.log("Course selector config", selConfig);
    
    const { id, label, defOption, options, curOption, setCurOption } = selConfig
    const allOptions = [{ name: defOption, url: '' }, ...options]

    const handleChange = ({ target }) => {
        setCurOption(target.value)
    }

    return (
        <div className={styles.selector}>
            <label htmlFor={id}>{label} </label>
            <select className={styles.selector__select} name="coruces" id={id} value={curOption} onChange={handleChange} open>
                {
                    allOptions.map((o, i) =>
                        <option key={i} value={o.url}>{o.name}</option>
                    )
                }
            </select>
        </div>
    )
}

export default ModuleSelector