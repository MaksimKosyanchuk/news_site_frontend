import { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { API_URL } from "../../config";

const ProfileLayout = ({ children }) => {

    const { setProfile, setProfileLoading } = useContext(AppContext) 

    const getProfile = async () => {
        console.log("get profile")
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
            console.log("null profile")
            setProfile(null)
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return(
        <div>
            { children }
        </div>
    )
}

export default ProfileLayout;