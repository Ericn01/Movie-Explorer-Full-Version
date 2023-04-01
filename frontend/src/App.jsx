import React, { useEffect, useState } from 'react';
import DefaultView from './components/DefaultView';
import HomeView from './components/HomeView';
import DetailView from './components/DetailView';
import { Route, Routes } from 'react-router-dom';
import ModalDialog from './components/ModalDialog';
import { baseUrl } from './constants';

// Application component
function App() {
  const [movies, setMovies] = useState(null);
  function setMovieData(movieData) { setMovies(movieData) }; 
  // Movie matches setup
  const [movieMatches, setMovieMatches] = useState([]);
  // Setting up a callback function to retrieve matches from the home view.
  function setMatches (matches) {
    setMovieMatches(matches);
  }
  // Favorite Movies set up
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  // Function/logic to add a favorite movie
  function addFavoriteMovie(movie){
    if (favoriteMovies.includes(movie)){
      alert('This movie has already been favorited!');
    }
    else {
      setFavoriteMovies([...favoriteMovies, movie]); // add the newest movie to favorite movies list 
    }
  }
  // Allows the user to remove their favorite movies, and updates the state 
  function removeFavoriteMovie(movieId){
    const removeMovieIndex = favoriteMovies.findIndex( (favoriteMovie) => favoriteMovie.id === movieId);
    removeMovieIndex === 0 ? favoriteMovies.shift() : favoriteMovies.splice(removeMovieIndex, removeMovieIndex);
    setFavoriteMovies([...favoriteMovies]);
  }
  // State for movies that have been rated
  const [ratedMovies, setRatedMovies] = useState([]);
  function addRatedMovie(movie){setRatedMovies([...ratedMovies, movie])};
  // Movie Details click setup (must stored the movie in state)
  const [movieDetails, setMovieDetails] = useState(null); // set it up as nothing for now
  function requestMovieDetails(movie) {
    setMovieDetails(movie);
  }
  // Genres list setup
  let genres = JSON.parse(localStorage.getItem("genres"));
  async function getGenresList(movieData){
    let genres = new Map();
    movieData.map((m) => { 
      const genreObject = m.details.genres;
      if (genreObject !== null){
        genreObject.forEach( (genreEntry) => {
          const genreIsSet = genres.has(genreEntry.id);
          genreIsSet === false ? genres.set(genreEntry.id, genreEntry.name) : ""}
        )
      }
    });
    localStorage.setItem("genres", JSON.stringify(Object.fromEntries(genres)));
    return genres;
  }
  // Setting up a variable for the loading 
  // Check the movie data 
  useEffect( () => 
    {
      async function getMovieData() {
        const request = await fetch(baseUrl);
        const data = await request.json();
        setMovies(data);
        localStorage.setItem("movieData", JSON.stringify(data));
        genres = getGenresList(data);
      }
      const movieData = localStorage.getItem("movieData");
      movieData === null ? getMovieData() : setMovies(JSON.parse(movieData)); // local storage existence vs not existing
    }, []);
    // Modal View State managements
    const [modalState, setModalState] = useState("hidden");
    function changeModalView(e){
      const newViewState = e.target.value;
      setModalState(newViewState);
    }
  return (
  <main className='relative font-sen'>
    <ModalDialog changeDisplayState={changeModalView} displayState={modalState} />
    <Routes>
      <Route path="/" element={<HomeView movieData={movies} setParentMovieMatches={setMatches}/>} />
      <Route path="/default" element={<DefaultView homeMatches={movieMatches} favorites={favoriteMovies} addFavorite={addFavoriteMovie} movieDetails={requestMovieDetails} genres={genres} setParentMovieMatches={setMatches} movieData={movies} removeFavoriteMovie={removeFavoriteMovie} setModalView={changeModalView}/>} />
      <Route path="/details" element={<DetailView movieRequest={movieDetails} addFavorite={addFavoriteMovie} favorites={favoriteMovies} setModalView={changeModalView}  setMovies={setMovieData} movies={movies} ratedMovies={ratedMovies} addRatedMovie={addRatedMovie} />} />
    </Routes>
  </main>);
};

export default App;
