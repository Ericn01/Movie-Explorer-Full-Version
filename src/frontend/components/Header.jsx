/* Returns the Header component */
const Header = ({setModalView}) => {
    return (
        <section id="header" className="flex justify-between items-center px-10 py-4">
            <div className="flex items-center">
                <img src="images/logo.png" width={"75px"} alt="Movie"/>
                <h3 className="ml-4 font-bold text-xl tracking-tight"> Discover All Of Your Favorite Movies! </h3>
            </div>
            <button className="w-[100px] text-white flex justify-center p-2 border-2 border-orange-700 rounded-lg shadow  bg-orange-500 hover:bg-orange-600 font-semibold" value="absolute" onClick={setModalView}> About </button>
        </section>
    );
}

export default Header;