import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header  from './Header';
/* Component responsible for containing the entire movie detail view */
const DetailView = ({movieRequest, favorites, addFavorite, setModalView, setMovies, movies, ratedMovies, addRatedMovie}) => {
    const [posterDisplayState, setPosterDisplayState] = useState("hidden")
    function changePosterDisplayState(displayState) {
        setPosterDisplayState(displayState);
    }
    if (movieRequest !== null) {
        return (
        <div>
            <Header setModalView={setModalView}/>
            <section className={`flex bg-cover bg-no-repeat bg-[url(https://image.tmdb.org/t/p/original${movieRequest.backdrop})] items-center m-12`}>
                <PosterImage posterPath={movieRequest.poster} changePosterDisplayState={changePosterDisplayState}/>
                <MovieDetails movieData={movieRequest}/>
                <div>
                    <PerformanceDetails movieData={movieRequest} />
                    <br />
                    <ActionButtons movieData={movieRequest} addFavorite={addFavorite} favoriteMovies={favorites} />
                </div>
                <UserRating setMovies={setMovies} movieData={movieRequest} movies={movies} ratedMovies={ratedMovies} addRatedMovie={addRatedMovie} />
            </section>
            <PosterLargeDisplay displayState={posterDisplayState} posterPath={`https://image.tmdb.org/t/p/w500${movieRequest.poster}`} changePosterDisplayState={changePosterDisplayState} />
        </div>
        )
    }
    else {
        return (      
        <>
            <Header setModalView={setModalView}/>
            <h1>Empty Movie Detail Section (Nullish Selection)</h1>
        </>
        );
    }
}
/* Component for displaying the poster image */
const PosterImage = ({posterPath, changePosterDisplayState}) => {
    const largePosterImage = `https://image.tmdb.org/t/p/w500${posterPath}`;
    function handleImageClick(){
        changePosterDisplayState("absolute");
    }
    return (
        <div className="cursor-pointer hover:shadow-xl h-max basis-1/5">
            <img className="min-w-full rounded-lg" src={largePosterImage} alt="Movie Poster" draggable={false} onClick={handleImageClick} />
        </div>
    );
}
/**
 * Creates and returns a div containing the general movie data.
 * @param {Object} movieData the movie that has been requested by the suer
 * @returns performance details card
 */
const MovieDetails = ({movieData}) => {
    return (
        <div className="mx-8 basis-1/3 rounded-lg overflow-hidden shadow-lg p-5 bg-slate-100 border-2 border-gray-200 hover:bg-slate-200 hover:border-gray-300">
            <HeaderDetails movieData={movieData} />
            <OtherDetails movieData={movieData} />
        </div>
    )
}
/* Contains the header details (movie title, release date, genres, and more) */
const HeaderDetails = ({movieData}) => {
    return(
        <div>
            <h2 className="text-2xl font-bold"> {movieData.title} ({movieData.release_date.substring(0,4)})</h2>
            <ul className="flex list-none justify-start items-center"> 
                <li className='my-4 text-sm font-semibold tracking-wide'> {movieData.release_date.replaceAll("-", "/")} </li>
                {movieData.details.genres.map((genreObj) => <li className="ml-3 inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600 h-min" key={genreObj.id}>
                    {genreObj.name} 
                </li>)}
                <li className="ml-3 my-4 text-sm font-semibold tracking-wide"> {minutesToHours(movieData.runtime)} </li>
            </ul>
        </div>
    );
}
/* Contains the links for TMDB, IMDB and the movie description*/
const OtherDetails = ({movieData}) => {
    return (
        <div>
            <h3 className="text-lg italic pb-2 text-gray-900"> {movieData.tagline} </h3>
            <div> 
                <h3> Find More Information At: </h3>
                <div className="flex my-3"> 
                    <a href={`https://www.imdb.com/title/${movieData.imdb_id}`} className="text-blue-600 hover:cursor-pointer hover:underline"> IMDB </a>
                    <a href={`https://www.themoviedb.org/movie/${movieData.tmdb_id}`} className="ml-5 text-blue-600 hover:cursor-pointer hover:underline"> TMDB </a>
                </div>
            </div>
            <div> 
                <h3 className={"text-lg font-semibold mb-2"}> Description </h3>
                <p className='text-md'> {movieData.details.overview} </p>
            </div>
        </div>
    )
}
/**
 * Creates and returns a div containing the performance data from the requested movie
 * @param {Object} movieData the movie that has been requested by the suer
 * @returns performance details card
 */
const PerformanceDetails = ({movieData}) => {
    const ratingDetails = movieData.ratings;
    const movieRevenue = new Intl.NumberFormat('en-us', {style: 'currency', currency: "USD"}).format(movieData.revenue);
    return (
        <div className='basis-1/3 rounded-lg overflow-hidden shadow-lg p-5 bg-slate-100 border-2 border-gray-200 hover:bg-slate-200 hover:border-gray-300 mr-10'> 
            <h3 className='text-xl font-semibold '> Performance Details </h3>
            <article>
                <p className='py-2'> Revenue: {movieRevenue}</p>
                <p className='py-2'> Average Rating: {ratingDetails.average.toPrecision(4)}</p>
                <p className='py-2'> Number of ratings: {ratingDetails.count} </p>
                <p className='py-2'> Popularity: {Math.round(ratingDetails.popularity, 1)}%</p>  
            </article>     
        </div>
    );
}
/**
 * Container that allows the user to add a song to favorites, or close out of the detail view.
 * @param {*} param0 
 * @returns 
 */
const ActionButtons = ({favoriteMovies, addFavorite, movieData}) => {
    const isFavoriteMovie = favoriteMovies.includes(movieData);
    if (!isFavoriteMovie){
        return (
            <div className='flex justify-start mt-3'>
                <button className="w-[140px] text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-blue-500 hover:bg-blue-700" onClick={() => addFavorite(movieData)}> Add To Favorites </button>
                <Link to="/default"> <button className='w-[80px] ml-5 text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-red-500 hover:bg-red-700'> Close  </button> </Link>
            </div> 
        );
    } else{
        return (
            <div className='flex justify-start mt-3'>
                <button className="w-[140px] text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-blue-400 opacity-50 line-through" onClick={() => addFavorite(movieData)} disabled={true} title="Already Favorited" > Add To Favorites </button>
                <Link to="/default"> <button className='w-[80px] ml-5 text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-red-400 hover:bg-red-600'> Close  </button> </Link>
            </div> 
        );
    }
}
/* Allows the user to rate the movie, and updates movie data accordingly. */
const UserRating = ({setMovies, movieData, movies, ratedMovies, addRatedMovie}) => {
    const [userRating, setUserRating] = useState(0);
    const [starsArray, setStarsArray] = useState(new Array(10).fill(0));
    const hasBeenRated = ratedMovies.includes(movieData);
    function setRating(e){
        let inputValue = Number(e.target.value);
        if (inputValue > 10){ 
            inputValue = 10.0;
            alert("Your rating was greater than 10, and changed to 10 stars");
        } else if (inputValue < 0 || isNaN(inputValue)){
            alert("Your rating was either not a number, or less than 0, and was changed to 0 stars");
            inputValue = 0.0;
        }
        setUserRating(inputValue);
    }
    function applyRating (){
        const moviesCopy = [...movies];
        const newNumberOfRatings = movieData.ratings.count + 1;
        movieData.ratings.count = newNumberOfRatings;
        movieData.ratings.average = movieData.ratings.average + (userRating / newNumberOfRatings);
        setMovies(moviesCopy);
        const isDecimal = String(userRating).includes(".");
        const valArray = new Array(10).fill(0);
        if (isDecimal){ // Overly complex logic to make the star fill logic function, but hey, it works!
            let [mainValue, decimalValue] = String(userRating).split("."); // Splits the user rating into two parts
            let roundsToDecimal = false;
            Number(decimalValue) > 7 ? mainValue++ : roundsToDecimal = true;
            if (roundsToDecimal && mainValue < 1){valArray[0] = 0.5};
            for (let i = 0; i < mainValue; i++){
                valArray[i] = 1;
                if (i === mainValue - 1 && roundsToDecimal){
                    valArray[i + 1] = 0.5;
                }
            }
        } else {
            for (let i = 0; i < userRating; i++){
                valArray[i] = 1;
            }
        }
        setStarsArray(valArray);
        if (!hasBeenRated){addRatedMovie(movieData)};
    }
    return (
        <section className='basis-max rounded-lg overflow-hidden shadow-lg p-5 bg-slate-100 border-2 border-gray-200 hover:bg-slate-200 hover:border-gray-300'>
            <div className='flex'>
                <h2 className='tracking-tight font-semibold'> User Rating: </h2>
                <input className={"w-[75px] h-[25px] ml-3 border border-gray-500 px-3 py-1 rounded-lg shadow-md focus:outline-none focus:border-orange-400 mb-3"} type="number" max={10} min={0} onChange={setRating} placeholder={`${Math.ceil(Math.random() * 10)}.${Math.round(Math.random() * 10),0}`} />
            </div>
            <RatingApplyButton isDisabled={hasBeenRated} applyRating={applyRating} />
            <div className="flex">
                {starsArray.map((indexRating, index) => <StarImage key={index} imageIndex={index} indexRating={indexRating} />)}
            </div>
        </section>
    )
}
/* Returns a star image to be filled, rating dependent */
const StarImage = ({indexRating}) => {
    return (
        <img src={`images/star-${indexRating}.svg`} width={"26px"} draggable={false}/>
    )
}
/* Returns the button for rating the movie - state dependent */
const RatingApplyButton = ({isDisabled, applyRating}) => {
    if (!isDisabled){
        return(
            <div className='flex justify-start mt-2 mb-5 text-center'>
                <button className='w-max text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-violet-600 hover:bg-violet-800' onClick={() => applyRating()}> Apply Your Rating </button>
            </div>
        );
    } else {
        return (
            <div className='flex justify-start mt-2 mb-5 text-center'>
                <button className='w-max text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-violet-600 opacity-50 line-through' title="Your rating has been applied"> Apply Your Rating </button>
            </div>
        )
    }

}
/* Converts the runtime from minutes to hr:min format */
function minutesToHours(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
return `${hours}h ${minutes}m`
}

const PosterLargeDisplay = ({posterPath, displayState, changePosterDisplayState}) => {
    return (
    <div className={`${displayState} top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-30%]`}>
        <div className="relative bg-white rounded-lg shadow-xl border-4 border-gray-700">
            <img src={posterPath} alt="Large poster"  draggable={false} />
            <img src={"images/red-x-icon.png"} width={"45px"} draggable={false} className='absolute top-1 right-1 shadow-2xl z-10 hover:cursor-pointer' title="Close Image" onClick={() => changePosterDisplayState("hidden")} /> 
        </div>
    </div>
    );
}

export default DetailView;