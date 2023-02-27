import styles from './Lesson.module.css'
import LessonPart from "./LessonPart"

const Lesson = ({ lMetadata, baseUrl, lName }) => {
    const hasLesson = Object.keys(lMetadata).length !== 0
    // const lessonSections = ['plan', 'theory', 'homework', 'code']

    return (
        hasLesson
            ?   <div className={styles.lesson}>
                    <div className={styles.lesson__header}>
                        <h2>Content of {lName}</h2>
                        {lMetadata.date && <time dateTime={lMetadata.date}>{lMetadata.date}</time>}
                    </div>
                    

                    {Object.entries(lMetadata).map(([sectionName, source], i) => {
                        if (sectionName !== 'date' && source.length !== 0) {
                            return <LessonPart key={i} name={sectionName} baseUrl={baseUrl} source={source} />
                        }
                    })}
                </div>
            :   <div className={styles.lesson__error}>Nothing to show or metadata error</div> 
    )    
}

export default Lesson

// <p>{JSON.stringify(Object.entries(lMetadata))}</p>
//<p>{JSON.stringify(lMetadata.code)}</p>