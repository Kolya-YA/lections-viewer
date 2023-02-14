import { marked } from "marked"
import hljs from "highlight.js"
import 'highlight.js/styles/github.css';
import styles from './LessonPart.module.css'

const LessonBlock = ({ rawContent }) => {
    const content = prepareContent(rawContent)

    return (
        <>
            <div class={ styles.part__content }>
                <div class={ styles.part__filename }>{ rawContent.url }</div>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </>
    )
}

export default LessonBlock

function prepareContent(rawContent) {
    const blockType = rawContent.url.split('.').at(-1)
    switch (blockType) {
        case 'md':
            return marked(rawContent.data)
        case 'java':
            return `<pre><code>${hljs.highlight(rawContent.data, {language: 'java'}).value}</code></pre>`
        default:
            return (rawContent.data)
    }
}