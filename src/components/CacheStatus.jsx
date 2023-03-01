// import { useEffect } from "react"

const CacheStatus = ({ lastCache }) => {
    const cacheTime = new Date(lastCache)

    return (
        <div className="nav-selector__update">
            Last update: <span className="nav-selector__time">{cacheTime.toLocaleTimeString()}</span>.
            <button className="nav-selector__reset-btn" disabled>Reset cache</button>
        </div>
    )
}

export default CacheStatus