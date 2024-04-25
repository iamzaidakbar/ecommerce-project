import { CCarousel, CCarouselItem, CImage } from "@coreui/react"
import image1 from "../../assets/women_wearing_hat.jpg"
import image2 from "../../assets/women_on_street.jpg"
import image3 from "../../assets/women-doing-exercise.jpg"
import image4 from "../../assets/black_and_white_women.avif"
import "../Home/Home.scss"

import React from 'react'

const Home = () => {
    return (
        <div className="home">
            <img src={image2} />
        </div> 
    )
}

export default Home