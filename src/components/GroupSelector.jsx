import { useEffect, useRef } from 'react'
import styles from './GroupSelector.module.css'

const GroupSelector = ({ isOpenGroupSel, handleCloseGroupSel, groups, curGroup, setCurGroup }) => {
    const dialog = useRef(null)

    useEffect(() => {
        const dlg = dialog.current
        if (isOpenGroupSel) !dlg.open && dlg.showModal()
        else dialog.current.close()
    }, [isOpenGroupSel])

    const handleChoice = e => {
        e.preventDefault();
        const newGroup = e.target.curGroup.value
        if (newGroup !== curGroup) {
            setCurGroup(newGroup)
            localStorage.curGroup = JSON.stringify(newGroup)
        }
    }

    return (
        <dialog ref={dialog} className={styles.dialog} onClose={handleCloseGroupSel}>
            <button onClick={handleCloseGroupSel}>Close (Esc)</button>
            <form onSubmit={handleChoice}>
                <h4>Select group</h4>
                { groups.map(g => {
                    return (
                    <label className={styles.dialog__label} key={g}>
                        <input type="radio" name="curGroup" value={g} defaultChecked={(g === curGroup)}/>
                        {g}
                    </label>
                )}) }
                <button onClick={handleCloseGroupSel}>Select</button>
            </form>
        </dialog>
    )
}

export default GroupSelector