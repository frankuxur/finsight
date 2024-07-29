import './home.css'
import './home-form.css'
import SignUp from './SignUp'
import Login from './Login'
import { useContext, useState } from 'react'
import { ToastContext } from '../../context/ToastContext'
import Toast from '../../components/toast/Toast'
import useAuthStore from '../../store/authStore'
import Dashboard from '../dashboard/Dashboard'
import Bars from '../../components/bars/Bars'


const Home = () => {
  const [accessType, setAccesstype]= useState('')
  const { showToast } = useContext(ToastContext)
  const authuser = useAuthStore(state => state.user)
  const [isHover, setIsHover] = useState(false)

  if (authuser) {
    return <Dashboard />
  }
  

  const handleClick = (e) => {
    if (e.target.classList.contains('home__modal')) {
      setAccesstype('')
    }
  }

  return (
    <>
      <main className="home">
        <div className="home__content">
          <ul className="home__tags">
            <li className="home__tag">track</li>
            <li className="home__tag">
              <i className="ri-git-commit-line icon"></i>
            </li>
            <li className="home__tag">analyze</li>
          </ul>

          <div className="home__logo">
            {/* <span>FinTrack</span> */}
            <i className="ri-exchange-2-line icon"></i>
            <span>Finsight.</span>

            <div className="block"></div>
            <div className="inline"></div>
          </div>

          <div className="home__text">
            <p>Gain valuable insights through detailed analytics while effortlessly tracking your cashflow</p>
          </div>

          <div 
            className="home__buttons" 
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <button 
              className="home__button signup" 
              type='button'
              onClick={() => setAccesstype('signup')}
            >
              Sign Up
            </button>
            <button 
              className="home__button login" 
              type='button'
              onClick={() => setAccesstype('login')}
            >
              Log In
            </button>
          </div>
        </div>
        
        <div className={`home__modal ${accessType === 'signup' ? 'active' : ''}`} onClick={handleClick}>
          <div className={`home__modal-content ${accessType === 'signup' ? 'active' : ''}`}>
            <SignUp 
              accessType={accessType}
              setAccesstype={setAccesstype} />
          </div>
        </div>
        
        <div className={`home__modal ${accessType === 'login' ? 'active' : ''}`} onClick={handleClick}>
          <div className={`home__modal-content ${accessType === 'login' ? 'active' : ''}`}>
            <Login 
              accessType={accessType}
              setAccesstype={setAccesstype} />
          </div>
        </div>

        {showToast ? <Toast /> : null}

        <Bars isHover={isHover} />
        <Bars side={'bottom'} isHover={isHover} />
      </main>
    </>
  )
}

export default Home