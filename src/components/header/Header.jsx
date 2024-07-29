import './header.css'
import { signOut } from "firebase/auth"
import useAuthStore from "../../store/authStore"
// import useNotesStore from "../../store/notesStore"
import { auth } from "../../firebase/firebase"
import { useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { ToastContext } from '../../context/ToastContext'

const Header = () => {
  const { setShowToast, setToastData } = useContext(ToastContext)
  const logoutUser = useAuthStore(state => state.logout)  
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()

  const blankUser = 'https://i.pinimg.com/236x/bd/c1/e5/bdc1e5e427351857e07a44b7eef254b6.jpg' || 'https://cdn-icons-png.flaticon.com/512/9706/9706577.png'
  const { email, name, profilePicURL } = user || { profilePicURL: blankUser }

  const logout = async () => {
    await signOut(auth)
    localStorage.removeItem('user-info')
    logoutUser()
    navigate('/')
    setShowToast(false)
    setToastData({})
  }

  return (
    <header className="header">
        <div className="header__content">
            <div className="header__logo">
                <i className="ri-exchange-2-line icon"></i>
                <span>Finsight</span>
            </div>

            {/* <nav className="nav">
                <button className="nav__button">
                    <i className="ri-menu-line icon"></i>
                </button>

                <ul className="nav__items">
                    <li className='nav__item'>
                        <a href="" className='nav__link'>contact</a>
                    </li>

                    <li className='nav__item'>
                        <a href="" className='nav__link'>about</a>
                    </li>

                    <li className='nav__item'>
                        <a href="" className='nav__link'>logout</a>
                    </li>
                </ul>
            </nav> */}

            <div className="header__user">
                <img 
                    src={profilePicURL} 
                    alt={name} 
                    className="header__user-image" 
                />
                
                <ul className="header__user-info">
                    <li className='header__user-name'>{name}</li>
                    <li className='header__user-email'>{email}</li>
                    <li className='header__user-logout'>
                        <button 
                            onClick={logout}
                            className='header__user-logout-button'
                        >Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </header>
  )
}

export default Header