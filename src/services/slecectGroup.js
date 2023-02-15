const selectGroup = () => {
    const lsCurGroup = localStorage.curGroup
    let curGroup;
    if (lsCurGroup) {
        curGroup = JSON.parse(lsCurGroup)
    } else {
        curGroup = JSON.stringify('cohort21') // TODO: Add real selector
        localStorage.curGroup = curGroup
    }
    return curGroup
}

export default selectGroup