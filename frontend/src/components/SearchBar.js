import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchProfile = (event) => {
        event.preventDefault()
        // console.log(searchTerm)
        navigate(`/profile/${searchTerm}`)
        setSearchTerm('')
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSearchProfile}>
                <input
                    style={{paddingLeft: '10px'}}
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit"><FiSearch /></button>
            </form>
        </div>
    )
}

export default SearchBar