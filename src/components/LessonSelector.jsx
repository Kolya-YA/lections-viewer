import styles from "./LessonSelector.module.css"

const LessonSelector = ({ selConfig }) => {
    // console.log("selector config", selConfig);
    const { lessons, curLesson, setCurLesson } = selConfig
    
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
                <div className={styles.lessons__list} onChange={handleChange}>
                    { lessons.map((name, i) => (
                        <label className={styles.lessons__item} key={i}>
                            <input className={styles.lessons__input} type="radio" name="lessonRadio" value={name} />
                            {name}
                        </label>
                    ))}
                </div>
            }
        </div>
    )
}

export default LessonSelector