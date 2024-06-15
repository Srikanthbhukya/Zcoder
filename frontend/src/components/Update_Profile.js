import React, { useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom'; 


const UpdateProfile = () => {
  const navigate = useNavigate();

    const [error,setError]=useState(null)
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const { user } = useAuthContext()


const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
        setError('You must be logged in')
        return
    }
    const prof = {name,age,bio}
    
    const response = await fetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(prof),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()


    if (!response.ok) {
      setError(json.error)

    //   setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setAge('')
      setBio('')
      navigate('/profile');

    //   setEmptyFields([])
    //   dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <form className="update-profile" onSubmit={handleSubmit}> 
      <h3>Add Info for Profile</h3>

      <label>Name:</label>
      <br />
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        // className={emptyFields.include('title') ? 'error' :''}
      />
      <br />
      <br />

      <label>Age:</label>
      <br />
      <input 
        type="number" 
        onChange={(e) => setAge(e.target.value)} 
        value={age}
        // className={emptyFields.include('load') ? 'error' :''}
      />
      <br />
      <br />

      <label>Bio:</label>
      <br />
      <textarea 
        type="text" 
        onChange={(e) => setBio(e.target.value)} 
        value={bio} 
        // className={emptyFields.include('reps') ? 'error' :''}
      />
      <br />
      <br />

      <button>Add Profile</button>
      <br />
      <br />
      {error && <div className="error">{error}</div>}
      <br />
    </form>
  )
}

export default UpdateProfile