import { useEffect, useState } from 'react'
import axios from 'axios'
import { init, trackPages } from 'insights-js'

import './assets/main.css'
import { groups } from './localData'
import { savedCurGroup } from './services/slecectGroup'

import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Main from './components/Main'
import GroupSelector from './components/GroupSelector'

const App = () => {
    init('vn0UWjIfk6yvZCcm')
    trackPages()
    
    const [curGroup, setCurGroup] = useState('')
    const [courses, setCourses] = useState([])
    const [curCourse, setCurCourse] = useState('')
    const [lessons, setLessons] = useState([])
    const [curLesson, setCurLesson] = useState('')
    const [isOpenGroupSel, setIsOpenGroupSel] = useState(false)

    const [lastCache, setLastCache] = useState(0) // TODO: create localStorage control
  
    const handleOpenGroupSel = () => setIsOpenGroupSel(true)
    const handleCloseGroupSel = () => setIsOpenGroupSel(false)


    useEffect(() => {
        let newGroup
        // eslint-disable-next-line no-constant-condition 
        if (false) { //  has group in URL param  // TODO: add URL params reader
            // get it and set as newGroup
        } else if (savedCurGroup(groups)) { // has saved group in local storage
            newGroup = savedCurGroup(groups)
        } else {
            setIsOpenGroupSel(true)
            // newGroup = groupSelector()
        }
        setCurGroup(newGroup)
        setCourses([])
        setLessons([])
    }, [curGroup])
  
    useEffect(() => {
        if (curGroup) {
            const lsCourseStr = localStorage[curGroup]
            if (lsCourseStr && JSON.parse(lsCourseStr)) {
                const lsCourseData = JSON.parse(lsCourseStr)
                if (!lsCourseData?.time || Date.now() - lsCourseData?.time > (10 * 60000)) {
                    localStorage[curGroup] = ''
                } else if (lsCourseData?.coursesNameAndUrl) {
                    const coursesNameAndUrl = lsCourseData.coursesNameAndUrl
                    setCurCourse('')
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
                    setCurCourse('')
                    setCourses(coursesNameAndUrl)
                })
        }
    }, [curGroup])

    useEffect(() => {
        if (curCourse) {
            const lsCourse = JSON.parse(localStorage[curGroup])
            if (lsCourse[curCourse]) {
                setLessons(lsCourse[curCourse])
            } else {
                axios.get(curCourse).then(resp => {
                    const { data } = resp
                    lsCourse[curCourse] = data
                    localStorage[curGroup] = JSON.stringify(lsCourse)
                    setCurLesson('')
                    setLessons(data)
                })
            }
        }
    }, [curCourse])

    return (
        <>
            <GroupSelector
                isOpenGroupSel={isOpenGroupSel}
                handleCloseGroupSel={handleCloseGroupSel}
                groups={Object.keys(groups)}
                curGroup={curGroup}
                setCurGroup={setCurGroup}
            />
            <Header curGroup={curGroup} lastCache={lastCache} setCurCourse={setCurCourse} handleOpenGroupSel={handleOpenGroupSel} />
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