import { useEffect, useState } from 'react'
import './assets/main.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Main from './components/Main'
import axios from 'axios'

const groups = {
  'cohort21': [
    // "http://localhost:3001/basicProgCourse",
    // "http://localhost:3001/consultCourse",
    'https://api.github.com/repos/ait-tr/cohort21/contents/',
    'https://api.github.com/repos/ait-tr/cohort_21_22_consultations/contents/'
  ],
  'cohort22': [
  ]
}

const basicProgUrl = "http://localhost:3001/basicProgLessons"
const consultUrl = "http://localhost:3001/consultLessons" 

function App() {
  const [curGroup, setCurGroup] = useState('')

  const [courses, setCourses] = useState([])
  const [curCourse, setCurCourse] = useState('')
  const [lessons, setLessons] = useState([])
  const [curLesson, setCurLesson] = useState('')
  const [lastCache, setLastCache] = useState(0);
  
  useEffect(() => { // TODO: add group selector
    const lsCurGroup = localStorage.curGroup
    if (lsCurGroup) {
      setCurGroup(JSON.parse(lsCurGroup))
      return
    }
    localStorage.curGroup = JSON.stringify('cohort21')
    setCurGroup(curGroup)
  }), []
  
  useEffect(() => {
    if (curGroup) {
      const lsCourseStr = localStorage[curGroup]
      if (lsCourseStr) {
        const lsCourseData = JSON.parse(lsCourseStr)
        if (!lsCourseData?.time || Date.now() - lsCourseData?.time > (10 * 60000)) {
          localStorage[curGroup] = null
        } else if (lsCourseData?.coursesNameAndUrl) {
          const coursesNameAndUrl = lsCourseData.coursesNameAndUrl
          setCourses(coursesNameAndUrl)
          return
        }
      }

      const coursesRequests = groups[curGroup].map(url => axios.get(url))
      axios.all(coursesRequests)
      .then(resp => {
        const respCources = [].concat(...resp.map(r => r.data))
        const filtredCourses = respCources.filter(c => c.type === 'dir')
        const coursesNameAndUrl = filtredCourses.map(c => ({ name: c.name, url: c.url }))
        localStorage[curGroup] = JSON.stringify({ time: Date.now(), coursesNameAndUrl })
        setLastCache(Date.now())
        setCourses(coursesNameAndUrl)
      })
    }
  }, [curGroup])

  useEffect(() => {
    if (curCourse) {
      const lsCourse = JSON.parse(localStorage[curGroup])
      if (lsCourse[curCourse]) {
        setLessons(lsCourse[curCourse])
        return
      }
      // let lessonUrl
      // if (curCourse === 'https://api.github.com/repos/ait-tr/cohort21/contents/basic_programming?ref=main') lessonUrl = basicProgUrl
      // else if (curCourse === 'https://api.github.com/repos/ait-tr/cohort_21_22_consultations/contents/consultations?ref=main') lessonUrl = consultUrl
      // else {
      //   setLessons([])
      //   return
      // }
      axios.get(curCourse).then(resp => {
        const { data } = resp
        lsCourse[curCourse] = data
        localStorage[curGroup] = JSON.stringify(lsCourse)
        setLessons(data)
      })
    }
  }, [curCourse])

  return (
    <>
      <Header lastCache={lastCache} setCurCourse={setCurCourse} />
      <div className='wrapper'>
        <Nav
          courses={courses}
          curCourse={curCourse}
          setCurCourse={setCurCourse}
          lessons={lessons.map(l => l.name)}
          curLesson={curLesson}
          setCurLesson={setCurLesson}
          />
          <Main
            curLesson={lessons.filter(l => l.name === curLesson)[0]?.url}
            lName={curLesson}
            />
      </div>
      <Footer />
    </>
  )
}

export default App