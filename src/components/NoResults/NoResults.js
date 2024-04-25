import { useNavigate } from "react-router-dom"
import "../NoResults/NoResults.scss"

import React from 'react'

const NoResults = ({title_1, title_2, route}) => {
    const navigate = useNavigate()

    return (
        <div className="no-favourites">
            <p className="no-items_line_1">{title_1}</p>
            <p className="no-items_line_2">{title_2}</p>
            <button onClick={() => { navigate(route) }} className="btn border-0 rounded-0 text-center">Browse Now</button>
        </div>
    )
}

export default NoResults