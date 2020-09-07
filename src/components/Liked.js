import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Liked.css'
import { Link } from 'react-router-dom';
const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    // slidesToShow: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 7000,
    cssEase: "linear",
    className: "slider-custom"
};

export default function Liked() {
    const [movies, setMovies] = useState(null)
    useEffect(() => {
        let storageMovies = JSON.parse(window.localStorage.getItem("fav-movies"))
        if (storageMovies != null) {
            setMovies(storageMovies)
        }
    }, [])

    return (
        <div className="liked-container">
            {!movies && <h3 className="no-movies">No liked movies</h3>}
            {movies && <h3 className="no-movies">Your favorite movies</h3>}
            <div className="liked-movies-carousel">
                <Slider {...settings}>
                    {movies && movies.map((m, i) => <div key={i} className="liked-img-container"> <img src={`https://image.tmdb.org/t/p/w500${m.image}`} alt="liked image cover" /></div>)}
                </Slider>
            </div>
            <Link to="/">Go Back</Link>
        </div>
    )
}
