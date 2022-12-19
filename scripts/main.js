// https://api.github.com/repos/ait-tr/cohort21/contents/basic_programming
// https://api.github.com/repos/ait-tr/cohort21/contents/basic_programming/lesson_34?ref=main
// https://raw.githubusercontent.com/ait-tr/cohort21/main/basic_programming/lesson_33/metadata.json

import { twoCources, tmpLessons } from './local-data.js'
import { lessons } from './lesson.js'

const reposPath = [
    'https://api.github.com/repos/ait-tr/cohort21/contents/',
    'https://api.github.com/repos/ait-tr/cohort_21_22_consultations/contents/'
]

const listOfCources = document.querySelector('#cource-select')
const listOfLessons = document.querySelector('#lesson-select')

const coursesUpdateTime = document.querySelector('.nav-selector__time')
const clearCacheBtn = document.querySelector('.nav-selector__reset-btn')
clearCacheBtn.addEventListener('click', () => {
    clearCache()

}, false)

fetchListOfCources(reposPath).then(cources => {
    renderListOfCources(cources)
    showCacheInfo()
})

listOfCources.addEventListener('change', ({ target }) => {
    if (target.value) {
        fetchListOfLessons(target.value).then(lessons => {
            renderListOfLessons(lessons)
        })
    } else {
        resetSelector(listOfLessons)
    }
})

listOfLessons.addEventListener('change', ({ target }) => {
    if (target.value) {
        lessons(target.value)
    } else {
        console.error('No lesson')
    }
})

async function fetchListOfCources(urls) {
    // const allCources = []
    // for (const url of urls) {
    //     const resp = await fetch(url);
    //     let cources = await resp.json();
    //     cources = cources.filter(c => c.type === 'dir')
    //     allCources.push(...cources)
    // }
    // return allCources.map(c => ({ "name": c.name, "url": c.url }));
    return twoCources
}

async function fetchListOfLessons(url) {
    const lTime = localStorage.lessonsTime
    if (!lTime || Date.now() - lTime > (20 * 60000)) { // if cache timed out
        clearCache()
    }

    if (localStorage.lessonsData) {
        const lData = JSON.parse(localStorage.lessonsData)
        if (lData[url]) {
            return lData[url]
        }
    }

    const resp = await fetch(url);
    let lessons = await resp.json();
    const fetchedData = {}
    fetchedData[url] = lessons.map(l => ({ name: l.name, url: l.url }))
    
    if (localStorage.lessonsData) {
        const presentLessonData = JSON.parse(localStorage.lessonsData)
        const newLessonData = { ...presentLessonData, ...fetchedData }
        localStorage.lessonsData = JSON.stringify(newLessonData)
        return newLessonData[url]
    } else {
        localStorage.lessonsTime = Date.now()
        localStorage.lessonsData = JSON.stringify(fetchedData)
        showCacheInfo()
        return fetchedData[url]
    }

    // let lessons = tmpLessons;
    // const regex = /^lesson_\d+$/;
    // lessons = lessons.filter(c => regex.test(c.name))
}

function renderListOfCources(cList) {
    cList.forEach(c => {
        const cource = document.createElement('option')
        cource.value = c.url
        cource.innerText = c.name.split('_').join(' ')
        listOfCources.appendChild(cource)
    })
}

function renderListOfLessons(lList) {
    const firstOpt = `— Select one of the ${lList.length} lessons. —`
    resetSelector(listOfLessons, firstOpt)

    lList.forEach((l, i) => {
        const lesson = document.createElement('option')
        lesson.value = l.url
        lesson.innerText = l.name.split('_').join(' ')
        // if( i === lList.length - 1) lesson.selected = true
        listOfLessons.appendChild(lesson)
    })
}

function resetSelector(selector, defaultText = '— No lesson —') {
    selector.innerText = ''
    const option = document.createElement('option')
    option.innerText = defaultText
    selector.appendChild(option)
}

function showCacheInfo() {
    const cacheTime = localStorage.lessonsTime ? new Date(+localStorage.lessonsTime).toLocaleString() : 'never'
    coursesUpdateTime.innerText = cacheTime
    console.log(cacheTime)
}

function clearCache() {
    localStorage.lessonsData = ''
    localStorage.lessonsTime = ''
    showCacheInfo()
}