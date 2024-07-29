import { useContext, useEffect, useState } from 'react'
import './toast.css'
import { ToastContext } from '../../context/ToastContext'

const Toast = () => {
  // icon, color, message, action, time-in-milliseconds
  const { setShowToast, showToast, setToastData, toastData } = useContext(ToastContext)
  const { color, text, icon, time } = toastData
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false)
      setToastData({})
    }, time);

    const fadeOutTimer = setTimeout(() => {
      setFadeIn(false)
    }, time-500);

    const fadeInTimer = setTimeout(() => {
      setFadeIn(true)
    }, 100);

    return () => {
      clearTimeout(timer)
      clearTimeout(fadeInTimer)
      clearTimeout(fadeOutTimer)
    }
  }, [])

  const handleClick = () => {
    setFadeIn(false)
    setTimeout(() => {
      setShowToast(false)
    }, 500);
  }

  if (!showToast) return
  
  return (
    <div className={`toast ${fadeIn ? 'active' : ''}`}>
        <div className="toast__left">
            <i 
              className={`ri-${icon}-line toast__icon icon`}
              style={{ color: color ? `${color}` : '' }}  
            ></i>

            <div className="toast__message">{text}</div>
        </div>

        <button 
            className="toast__button" 
            onClick={handleClick}
        >okay</button>
    </div>
  )
}

export default Toast