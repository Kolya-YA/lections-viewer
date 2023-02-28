import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'

import java from 'highlight.js/lib/languages/java'
hljs.registerLanguage('java', java)

import xml from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('xml', xml)

import css from 'highlight.js/lib/languages/css'
hljs.registerLanguage('css', css)

import scss from 'highlight.js/lib/languages/scss'
hljs.registerLanguage('scss', scss)

import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)

import json from 'highlight.js/lib/languages/json'
hljs.registerLanguage('json', json)

import sql from 'highlight.js/lib/languages/sql'
hljs.registerLanguage('sql', sql)

import 'highlight.js/styles/github.css';
import styles from './LessonPart.module.css'

const LessonBlock = ({ rawContent }) => {
    const content = prepareContent(rawContent)

    return (
        <>
            <div className={ styles.part__content }>
                <div className={ styles.part__filename }>{ rawContent.url }</div>
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
        case 'xml':
        case 'html':
            return `<pre><code>${hljs.highlight(rawContent.data, {language: 'xml'}).value}</code></pre>`
        case 'css':
            return `<pre><code>${hljs.highlight(rawContent.data, {language: 'css'}).value}</code></pre>`
        case 'scss':
            return `<pre><code>${hljs.highlight(rawContent.data, {language: 'scss'}).value}</code></pre>`
        case 'js':
        case 'jsx':
            return `<pre><code>${hljs.highlight(rawContent.data, {language: 'javascript'}).value}</code></pre>`
        case 'json':
            return `<pre><code>${hljs.highlight(rawContent.data, {language: 'json'}).value}</code></pre>`
        case 'sql':
            return `<pre><code>${hljs.highlight(rawContent.data, {language: 'sql'}).value}</code></pre>`
        default:
            return `<pre><code>${hljs.highlightAuto(rawContent.data)}</code></pre>`
    }
}