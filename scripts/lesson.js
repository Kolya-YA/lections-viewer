export function lessons(lessonUrl) {
    // https://api.github.com/repos/ait-tr/cohort21/contents/basic_programming/lesson_34?ref=main
    // https://raw.githubusercontent.com/ait-tr/cohort21/main/basic_programming/lesson_33/metadata.json
    const converter = new showdown.Converter();
    const lessonUrlObj = new URL(lessonUrl)
    const urlParams = new URLSearchParams(lessonUrlObj.search)
    const urlReplacers = [
        'api.github', 'raw.githubusercontent',
        'contents', urlParams.get('ref'),
        'repos/', ''
    ]
    const rawLessonUrl = lessonUrl
        .replace(urlReplacers[0], urlReplacers[1])
        .replace(urlReplacers[2], urlReplacers[3])
        .replace(urlReplacers[4], urlReplacers[5])
        .split('?')[0] + '/'

    const queryDict = {};
    queryDict.lessonParts = ['plan', 'theory', 'homework', 'code']  // List of parts should be show
    queryDict.mainURL = rawLessonUrl + 'metadata.json'              // url to metadata.json file
    queryDict.baseUrl = rawLessonUrl

    const lessonsContainer = document.querySelector('#lessons');
    const partTemplate = document.querySelector('#part-template');
    const codeTemplate = document.querySelector('#code-template');

    fetchLessonPart(queryDict.mainURL, 'json').then(metadataJSON => {
        lessonsContainer.textContent = ''
        renderParts(metadataJSON);
    });

    function renderParts(metadata) {
        queryDict.lessonParts.forEach((part, i) => {
            if (metadata[part]) {
                const partBlock = partTemplate.content.cloneNode(true);
                if (i === 0) partBlock.querySelector('details').open = true; // Open first part of lesson
                partBlock.querySelector('.part__header').textContent = part;
                partBlock.querySelector('.part__content').id = part;

                if (part === 'code') { // fetch and render blocks of code
                    metadata[part].forEach(codePath => {
                        const progLang = codePath.split('.').at(-1);
                        const codeBlock = codeTemplate.content.cloneNode(true);
                        const codeBlockHeader = codeBlock.querySelector('.part__code-header');
                        const codeBlockCode = codeBlock.querySelector('pre code');

                        codeBlockCode.classList.add(`language-${progLang}`);
                        codeBlockHeader.textContent = codePath;
                        partBlock.querySelector('.part__content').appendChild(codeBlock);
                        fetchAndRenderPart(queryDict.baseUrl + codePath, codeBlockCode, progLang);
                    });
                } else {
                    fetchAndRenderPart(queryDict.baseUrl + metadata[part], partBlock.getElementById(part));
                }

                lessonsContainer.appendChild(partBlock);
            }
        });
    }

    function fetchAndRenderPart(path, el, code) {
        fetchLessonPart(path).then((text) => {
            if (code) {
                el.textContent = text;
                hljs.highlightElement(el);
            } else {
                el.innerHTML = text.length
                    ? converter.makeHtml(text)
                    : '<p>No content 🙁</p>'
            }
        });
    }

    async function fetchLessonPart(url, json) {
        const resp = await fetch(url);
        return await json ? resp.json() : resp.text();
    }
}