import React from 'react'
import banner from "../../src/assets/bg.jpg"

const Banner = () => {

    const styles = {
        width: '100vw',
        height: '100vh',
        marginTop: '-80px'
    }
    return (
        <img src={banner} style={styles} />
    )
}

export default Banner