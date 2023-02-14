import { useState } from "react"

const CacheStatus = () => {
    const [cacheTime, setCacheTime] = useState('never')

    return (
        <div className="nav-selector__update">
            Last update: <span className="nav-selector__time">{cacheTime}</span>.
            <button className="nav-selector__reset-btn">Reset cache</button>
        </div>
    )
}

export default CacheStatus