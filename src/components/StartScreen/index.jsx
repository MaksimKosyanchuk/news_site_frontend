import "./StartScreen.scss"
import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { API_URL } from "../../config";
import { useLocation } from "react-router-dom";

const StartScreen = ({ children }) => {
    const location = useLocation()
    const { setProfile, setProfileLoading } = useContext(AppContext) 

    const getProfile = async () => {
        setProfileLoading(true)
        const token = localStorage.getItem('token');
        
        if (token) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            };
            
            try {
                const response = await fetch(`${API_URL}/api/profile`, requestOptions);
                const profileData = await response.json();
                if (profileData.status === 'success') {
                    setProfile(profileData.data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setProfile(null)
            }
            finally{
                setProfileLoading(false)
            }
        }
        else{
            setProfile(null)
            setProfileLoading(false)
        }
    };

    useEffect(() => {
        getProfile();
        window.scrollTo(0, 0)
    }, [location]);



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
