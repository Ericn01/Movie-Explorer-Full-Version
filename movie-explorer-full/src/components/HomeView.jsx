import { useState } from 'react';
import { Link } from 'react-router-dom';
// Component for the home view - this one is the simplest by FAR
const HomeView = ({movieData, setParentMovieMatches}) => {
    // Home View Movie Search Matches
    const [movieNameInput, setMovieNameInput] = useState(""); // The Home view name input
    // Function to find movie matches -> sets up state to change the value of movie matches
    function findMovieMatches(e){
        const buttonName = e.target.name;
        if (buttonName === 'findMatchesBtn'){
            const matchingMovies = movieData.filter( (movie) => String(movie.title).toLowerCase().includes(movieNameInput.toLowerCase())); // Returns all the matching movies as an array of objects
            setParentMovieMatches(matchingMovies);
        }
        else {
            setParentMovieMatches(movieData);
        }
    }
    return (
    <div className='relative h-screen bg-gray-700'>
        <img src="images/hero.jpg" className='w-full h-full object-cover absolute z-0' draggable={false} />
        <section className="flex justify-center items-center bg-opacity-50 h-screen">
            <div className="p-10 bg-gray-100 border border-gray-200 rounded-xl shadow-xl h-min z-10">
                <h1 className="font-semibold tracking-tight text-gray-900 text-2xl text-center"> Movie Explorer </h1>
                <h3 className='italic text-lg font-md mt-3 tracking-tight text-center
            '> Find All of Your Favorite Movies! </h3>
                <div className="flex-auto my-7"> 
                    <div className='relative'>
                        <div className="absolute top-2 left-2">
                            <img src="images/search.png" width={"24px"} draggable={false}/>
                        </div>
                        <input type="text" id="movie-input" name="movie-input" autoComplete={"off"} placeholder="Enter a movie title..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " onChange={(e) => setMovieNameInput(e.target.value)}></input>
                    </div>
                </div>
                <div className="flex-auto my-5 justify-items-evenly"> 
                    <Link to="/default"> 
                        <button name="findMatchesBtn" className="rounded-lg relative justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 border-green-600 shadow-lg bg-green-500  text-white font-semibold hover:bg-green-600 hover:border-green-700" onClick={findMovieMatches}>  Find Matching Movies 
                        </button> 
                    </Link>
                    <Link to="/default">
                        <button className="rounded-lg relative justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 border-violet-600 shadow-lg bg-violet-500  text-white font-semibold hover:bg-violet-600 hover:border-violet-700 " id='all' onClick={findMovieMatches}>  Show All Movies 
                        </button>
                    </Link> 
                </div>
            </div>
        </section>
        <div className="text-gray-700 font-semibold tracking-tight text-xl absolute bottom-2 right-[40%]"> Photo Credits to <a href="https://www.pexels.com/photo/spiral-film-strip-65128/" className='text-blue-500'>Pietro Jeng (Pexels) </a> </div>
    </div>
    );
}

export default HomeView
