import styles from './Nav.module.css'
import ModuleSelector from "./ModuleSelector"
import LessonSelector from "./LessonSelector"
   

const Nav = ({ courses, curCourse, setCurCourse, lessons, curLesson, setCurLesson }) => {
    const courseSelector = {
        id: "course-select",
        label: "Select a course",
        defOption: "— Please select a cource —",
        options: courses.map(c => ({ name: c.name, url: c.url })),
        curOption: curCourse,
        setCurOption: setCurCourse
    }
    const lessonSelector = {
        lessons: lessons.filter(l => l !== 'lesson_example').reverse(),
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