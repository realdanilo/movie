import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import MoviePreview from './components/MoviePreview'
import { Link } from 'react-router-dom';

const baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=498c7c32435a1b0f6674cd42d3ba2c36"

function App() {
  const [search, setSearch] = useState(window.localStorage.getItem("movie-search") || "toy story")
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)

  const findMovies = async (pageN) => {
    let response = await axios.get(`${baseUrl}&query=${search}&page=${pageN}`)
    setData(response.data.results)
    setPage(response.data.page)
    setTotalPages(response.data.total_pages)
    setTotalResults(response.data.total_results)
    window.localStorage.setItem('movie-response', JSON.stringify(response.data))
  }
  useEffect(() => {
    let responseLocalStorage = JSON.parse(window.localStorage.getItem('movie-response'))
    if (responseLocalStorage != null) {

      setData(responseLocalStorage.results)
      setPage(responseLocalStorage.page)
      setTotalPages(responseLocalStorage.total_pages)
      setTotalResults(responseLocalStorage.total_results)
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem("movie-search", search)
  }, [search])

  const pageToggle = (number) => {
    findMovies(number)
  }

  return (
    <div className="main-container">
      <nav className="navbar">
        <label htmlFor="search">Name:</label>
        <input type="text" value={search} name="search" onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => findMovies(1)}>Search</button>
        <Link to="/liked">&#10084;</Link>
      </nav>
      {!data && <h4 className="na-response">Nothing to show</h4>}
      <div className="movie-frame">
        {data && data.map((movie, i) => <MoviePreview key={i} movie={movie} />)}
      </div>
      <div className="end-info-search">

        <p>Page: {page} of {totalPages} pages</p>
        <p>Results: {totalResults}</p>
        <div className="pagination">

          {page > 1 && <button onClick={() => pageToggle(page - 1)}>Previous</button>}
          {((totalPages != page) > 0) && <button onClick={() => pageToggle(page + 1)}>Next</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
