import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout()
    }

    return (
        <header className="navbar-container">
            <div className="container">
                <Link to='/'>
                    <h1>Z-Coder</h1>
                </Link>
            </div>

            <nav>
                {user ? (<div>
                    <span style={{marginRight: '30px'}}>{user.username}</span>
                    <button style={{marginRight: '30px'}} onClick={handleClick} className='user-link'><u>log out</u></button>
                </div>) : (<div>
                    <Link to="/login" style={{marginRight: '30px'}} className='user-link'><u>login</u></Link>
                    <Link to="/signup" style={{marginRight: '30px'}} className='user-link'><u>signup</u></Link>
                </div>)
                }
            </nav>
        </header>
    )
}

export default Navbar