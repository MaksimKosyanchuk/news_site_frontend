import "./StartScreen.css"

function StartScreen({ children }) {
    return (
        <div className="start-screen app-transition">
            <div className="container">
                <div className="main-div">
                    {children}
                </div>
            </div>    
        </div>
    );
}

export default StartScreen;
