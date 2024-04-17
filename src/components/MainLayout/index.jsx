import { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { API_URL } from "../../config";
import Header from "../Header";

const MainLayout = ({ children }) => {

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
            }
            finally{
                setProfileLoading(false)
            }
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return(
        <div>
            <Header/>
            { children }
        </div>
    )
}

export default MainLayout;