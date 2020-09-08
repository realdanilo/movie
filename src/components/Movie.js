import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/Movie.css'
import { Link } from 'react-router-dom'

export default function Movie({ id }) {
    const [movie, setMovie] = useState({})
    const [youtubeUrl, setYoutubeUrl] = useState(null)
    const [favoriteMovies, setFavoriteMovies] = useState(null)
    const [isFavorite, setIsFavorite] = useState(null)
    let imageBase;
    useEffect(() => {
        const getMovie = async (id) => {
            console.log(id)
            let movieResponse = JSON.parse(window.localStorage.getItem("movie-response"))
            let response = movieResponse.results.find(m => m.id == id)
            let video = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=498c7c32435a1b0f6674cd42d3ba2c36&append_to_response=videos`)
            // building youtube ID and URL
            if (video.data.results.length > 1) {
                let youtubeKey = (video.data.results[0].key || "1")
                let url = `https://www.youtube.com/embed/${youtubeKey}`
                setYoutubeUrl(url)
            }
            setMovie(response)
        }
        getMovie(id)
    }, [])
    useEffect(() => {
        //set movie if it is liked or not, check
        let freshMovie = JSON.parse(window.localStorage.getItem("fav-movies")) || []
        setFavoriteMovies(freshMovie)
        freshMovie.map(m => m.id == movie.id ? setIsFavorite(true) : null)
    }, [movie])

    const toggleFav = () => {
        let newMovies;
        if (isFavorite == true) {
            newMovies = favoriteMovies.filter(m => m.id != movie.id)
            setIsFavorite(false)
        } else {
            newMovies = [{ id: movie.id, image: movie.poster_path }, ...favoriteMovies]
            setIsFavorite(true)
        }
        window.localStorage.setItem("fav-movies", JSON.stringify(newMovies))
    }
    const { original_title, overview, poster_path, release_date, vote_average } = movie
    if (poster_path == null) {
        imageBase = "https://www.classify24.com/wp-content/uploads/2017/04/no-image.png"
    } else {
        imageBase = `https://image.tmdb.org/t/p/w500/${poster_path}`
    }

    return (
        <div className="movie-main-container">
            <div className="image-container">

                <img src={imageBase} alt="movie image" />
                {!youtubeUrl && <p>No trailer video</p>}
                {youtubeUrl &&
                    <div className="iframe-container">
                        <iframe width="560" height="315" src={youtubeUrl} frameBorder="0" allowFullScreen={true} ng-show="showvideo"></iframe>
                    </div>}
            </div>
            <div className="movie-information">

                <h4>Title: {original_title}</h4>
                <p>Overview: <br /> {overview}</p>
                <p>{release_date}</p>
                <p>Rating: {vote_average}</p>
                <button className="add-to-like" onClick={toggleFav}>{isFavorite ? "Liked" : "Add to like movies"}</button>
                <Link to="/" >Back</Link>
            </div>
        </div>
    )
}
