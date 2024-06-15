import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext"
import QnaDetails from '../components/QnaDetails';


const Profile = () => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const { user } = useAuthContext()

    const [qna, setQna] = useState([])


    useEffect(() => {
        // Fetch the user's profile from the backend
        const fetchProfile = async () => {
            if (!user) {
                setError('You must be logged in')
                setLoading(false)
                return
            }
            try {
                const response = await fetch('/api/profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })

                if (response.ok) {
                    // console.log("dj")
                    const { profileData, qnas } = await response.json();
                    console.log(profileData);
                    console.log(qna);
                    setQna(qnas)
                    setProfile(profileData);
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
                    setQna([])
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchProfile();
    }, []);

    const handleEditProfile = () => {
        navigate('/profile/edit');
        // Redirect to edit profile page
        // history.push('/edit-profile');
    };
    const handleUpdateProfile = () => {
        navigate('/profile/update')
    }
    if (loading) {
        return <div className="profile">Loading...</div>;
    }
    return (
        <div className="profile">
            {profile ? (
                <div>
                    <p>Usermame: {username}</p>
                    <p>Name: {name}</p>
                    <p>Age: {age}</p>
                    <p>Bio: {bio}</p>
                    <button onClick={handleUpdateProfile}>Edit Profile</button>
                </div>
            ) : (
                <div>
                    {
                        user ? (
                            <div>
                                <p>Username: {user.username}</p>
                                <p>you have not completed your profile</p>
                                <button onClick={handleEditProfile}>Create Profile</button>
                            </div>
                        ) : (
                            <p>you must be logged in to view profile</p>
                        )
                    }
                </div>
            )}
            <br /><br />
            <div className="profile-problems">
                <div>
                    <hr />
                    <h2 style={{color: '#162114'}}>your recent posts....</h2>
                    {qna ? qna?.map(qna => (
                        <QnaDetails qna={qna} key={qna._id} />
                    )) : (
                        <p>yo no problimo is added here yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
