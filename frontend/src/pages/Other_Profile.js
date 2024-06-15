import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext"
import QnaDetails from "../components/QnaDetails"

const OtherProfile = () => {
    const [loading, setLoading] = useState(true);
    const { usenam } = useParams(); // Destructure the username from the URL
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [userNam, setUserNam] = useState('');
    const [qna, setQna] = useState([]);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    console.log(usenam)
    useEffect(() => {

        // Fetch the user's profile from the backend
        // console.log(usenam,"fs")
        const fetchProfile = async () => {
            if (!user) {
                setError('You must be logged in')
                setLoading(false)
                return
            }
            try {
                const response = await fetch(`/api/profile/${usenam}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })

                if (response.ok) {
                    // console.log("dj")
                    const { profileData, qnas, userName } = await response.json();
                    console.log("yes", profileData);
                    console.log("no", qnas);
                    setQna(qnas);
                    setProfile(profileData);
                    setUserNam(userName)
                    // Populate input fields with profile data
                    if (profileData) {
                        setName(profileData.name);
                        setAge(profileData.age);
                        setBio(profileData.bio);
                        setUsername(profileData.username)
                        console.log(name);
                    }
                } else {
                    // If there is no profile or an error occurs, set profile to null
                    setProfile(null);
                    setQna([]);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [name, usenam, user]);

    const Back = () => {
        navigate('/profile')
    }
    if (loading) {
        return <div className="profile">Loading...</div>;
    }
    return (
        <div className='profile'>
            <h2>Profile</h2>
            {profile && user ? (
                <div>
                    <p>Usermame: {username}</p>
                    <p>Name: {name}</p>
                    <p>Age: {age}</p>
                    <p>Bio: {bio}</p>
                    <button onClick={Back}>Back</button>
                </div>
            ) : (
                <div>
                    {
                        user ? (
                            <div>
                                <p>Username: {userNam}</p>
                                <p>this user has not completed his profile</p>
                                <button onClick={Back}>Back</button>
                            </div>
                        ) : (
                            <p>you must be logged in to view profile</p>
                        )
                    }
                </div>
            )}
            <br /><br />
            {
                user && (
                    <div className="profile-problems">
                        <div>
                            <hr />
                            <h2 style={{color: '#162114'}}>{userNam} 's recent posts...</h2>
                            {qna ? qna?.map(qna => (
                                <QnaDetails qna={qna} key={qna._id} />
                            )) : (
                                <p>yo no problimo is added here yet</p>
                            )}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default OtherProfile;
