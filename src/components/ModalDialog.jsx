/* Returns the modal dialog when the user clicks on the 'About Button' in the header*/
const ModalDialog = ({displayState, changeDisplayState}) =>{
    return (
    <div className={`${displayState} top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[700px] z-10`}>
        <div className="relative bg-white rounded-lg shadow-xl border-2 p-3">
            <div> 
                <h1 className="ml-6 py-4 text-xl font-semibold text-gray-900 w-[50%]"> About this Project </h1>
            </div>
            <hr></hr>
            <div className="">
                <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed text-gray-500">
                        This website was created by Eric Nielsen for the COMP4513 (Web Development III) Course at Mount Royal University.
                    </p>
                    <p className="text-base leading-relaxed text-gray-500">
                        Date Deployed: March 1, 2023
                    </p>
                    <p className="text-base leading-relaxed text-gray-500">
                        Programming Logic and UI was built using ReactJS, styling with TailwindCSS, and content display with HTML.
                        <br></br>
                        This project is being hosted via Netlify.
                    </p>
                    <p className="text-base leading-relaxed text-blue-500 hover:underline">
                        <a href="https://github.com/Ericn01/Movie-Explorer"> GitHub Repository Link </a>
                    </p>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button value="hidden" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={changeDisplayState}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default ModalDialog;

