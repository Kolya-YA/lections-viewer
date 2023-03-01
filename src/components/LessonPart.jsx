import { useEffect, useState } from "react"
import styles from './LessonPart.module.css'
import axios from "axios"
import LessonBlock from "./LessonBlock"

const LessonPart = ({ name, baseUrl, source }) => {

    const [rawContent, setRawContent] = useState([])
    // const [extLinks, setExtLinks] = useState([])  
    
    useEffect(() => {
        setRawContent([])
        // const [locUrls, extUrls] = urlsData(source, baseUrl)
        const [locUrls] = urlsData(source, baseUrl)
        const allReq = locUrls.map(url => axios.get(baseUrl + url))
        axios.all(allReq)
            .then(res => {
                const rcArr = res.map(r => ({ 
                    linkUrl: r.request.responseURL,
                    fileUrl: r.request.responseURL.split(baseUrl)[1],
                    data: r.data
                }))
                setRawContent(rcArr)
            })
            .catch(e => {
                console.error("ERROR", e)
            })
    }, [baseUrl, source])

    return (
        !!rawContent.length &&
        <details className={styles.part} open={name === 'plan'}>
            <summary className={styles.part__header}>
                {name}{!rawContent.length && ' (no content)'}
            </summary>
            {rawContent.map(rc => <LessonBlock key={rc.linkUrl} rawContent={rc} />)}
        </details>
    )
}

export default LessonPart

function urlsData(source, baseUrl) {
    const sourceArr = typeof source === 'string' ? [source] : source
    const locUrls = [], extUrls = []
    
    sourceArr.forEach(s => {
        if (s.trim().length) {
            if (s.slice(4).toLowerCase() === 'http') extUrls.push(s)
            else if (s.slice(-4).toLowerCase() === '.pdf') extUrls.push(baseUrl + s)
            else locUrls.push(s)
        }
    })

    return [locUrls, extUrls]
}
