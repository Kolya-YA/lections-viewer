export function savedCurGroup(groups) {
    const lsCurGroup = localStorage.curGroup
    if (lsCurGroup) {
        const curGroup = JSON?.parse(lsCurGroup)
        if (Object?.keys(groups).includes(curGroup)) {
            return curGroup
        }
    }
    return undefined
}

// export const groupSelector = () => {
//     // TODO: Add real selector
//     // const curGroup = JSON.stringify('cohort21')
//     // localStorage.curGroup = curGroup
//     // return curGroup 
//     return ''
// }