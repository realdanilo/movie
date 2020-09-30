import React from 'react'
import '../css/MoviePreview.css'
import { Link } from 'react-router-dom'
import no_image from '../no_image.png'

export default function MoviePreview({ movie }) {
    const { id, original_language, poster_path, title, vote_average } = movie
    let imageBase;
    if (poster_path == null) {
        imageBase = no_image
    } else {
        imageBase = `https://image.tmdb.org/t/p/w500/${poster_path}`
    }
    return (
        <div className="movie-preview">
            <img src={imageBase} />
            <div className="info-movie">

                <p className="title">{title}</p>
                <p className="rating">Rating: {vote_average}</p>
                <p className="language">Lang: {original_language.toUpperCase()}</p>
                <Link to={`/movie/${id}`}>More</Link>
            </div>
        </div>
    )
}
