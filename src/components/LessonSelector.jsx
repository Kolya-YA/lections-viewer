import styles from "./LessonSelector.module.css"

const LessonSelector = ({ selConfig }) => {
    // const { lessons, curLesson, setCurLesson } = selConfig
    const { lessons, setCurLesson } = selConfig
    
    const handleChange = ({ target }) => {
        setCurLesson(target.value)
    }

    return (
        <div className="lesson-selector">
            <h2 className={styles.lessons__header}>
                This course has {lessons.length ? lessons.length : 'no'} lessons
            </h2>
            {
                !!lessons.length &&
                <form className={styles.lessons__list} onChange={handleChange}>
                    { lessons.map((name) => (
                        <label className={styles.lessons__item} key={name}>
                            <input
                                className={styles.lessons__input}
                                type="radio"
                                name="lessonRadio"
                                value={name} />
                            {name.replace('_', ' ')}
                        </label>
                    ))}
                </form>
            }
        </div>
    )
}

export default LessonSelector