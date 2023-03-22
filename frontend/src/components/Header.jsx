import { IconContext } from 'react-icons';
import { MdOutlineMovieCreation } from 'react-icons/md'
/* Returns the Header component */
const Header = ({setModalView}) => {
    return (
        <section id="header" className="flex justify-between items-center px-10 py-4 bg-slate-200">
            <div className="flex items-center">
                <IconContext.Provider value={{size: "65px"}}>
                    <MdOutlineMovieCreation />
                </IconContext.Provider>
                <h3 className="ml-4 font-bold text-xl tracking-tight"> Discover All Of Your Favorite Movies! </h3>
            </div>
            <button className="m-2 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md font-semibold border-1 border-green-600 hover:bg-green-700 tracking-tight" value="absolute" onClick={setModalView}> About </button>
        </section>
    );
}

export default Header;