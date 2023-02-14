import { useEffect, useState } from "react"
import axios from 'axios'
import styles from './Main.module.css'
import Lesson from "./Lesson"

const Main = ({ curLesson, lName }) => {
    const [lMetadata, setLMetadata] = useState({})
    const baseUrl = curLesson ? urlConverter(curLesson) : ''
    
    useEffect(() => {
        if (baseUrl) {
            axios.get(baseUrl + 'metadata.json')
                .then(resp => {
                    const { data } = resp
                    setLMetadata(data)
                })
        }
    }, [curLesson , lName])

    return (
        <main className={styles.main}>
            {curLesson
                ? <Lesson lMetadata={lMetadata} baseUrl={baseUrl} lName={lName} /> 
                : <div className={styles.main__nothing}>Nothing selected</div>
            }
        </main>
    )
}

export default Main

function urlConverter(inpUrl) {
    const lessonUrlObj = new URL(inpUrl)
    const urlParams = new URLSearchParams(lessonUrlObj.search)
    const urlReplacers = [
        'api.github', 'raw.githubusercontent',
        'contents', urlParams.get('ref'),
        'repos/', ''
    ]
    return inpUrl
        .replace(urlReplacers[0], urlReplacers[1])
        .replace(urlReplacers[2], urlReplacers[3])
        .replace(urlReplacers[4], urlReplacers[5])
        .split('?')[0] + '/'
}