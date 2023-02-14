import styles from './Nav.module.css'
import ModuleSelector from "./moduleSelector"
import LessonSelector from "./LessonSelector"
   

const Nav = ({ courses, curCourse, setCurCourse, lessons, curLesson, setCurLesson }) => {
    const courseSelector = {
        id: "course-select",
        label: "Courses",
        defOption: "— Please select a cource —",
        options: courses.map(c => ({ name: c.name, url: c.url })),
        curOption: curCourse,
        setCurOption: setCurCourse
    }

    const lessonSelector = {
        // lessons: [
        //     {"name": "lesson_10", "url": "https://api.github.com/repos/ait-tr/cohort21/contents/basic_programming/lesson_10?ref=main"},
        //     {"name": "lesson_20", "url": "https://api.github.com/repos/ait-tr/cohort21/contents/basic_programming/lesson_20?ref=main"},
        //     {"name": "lesson_30", "url": "https://api.github.com/repos/ait-tr/cohort21/contents/basic_programming/lesson_30?ref=main"},
        // ]
        lessons,
        curLesson,
        setCurLesson,
    }
 
    return (
        <nav className={styles.navs}>
            <ModuleSelector selConfig={courseSelector} selected={''} />
            <LessonSelector selConfig={lessonSelector} />
        </nav>
    )
}

export default Nav