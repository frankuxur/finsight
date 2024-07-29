import { useContext, useEffect, useRef, useState } from 'react'
import './drawer.css'
import { DrawerContext } from '../../context/DrawerContext'
import Form from '../form/Form'

const Drawer = () => {
  const { showDrawer, setShowDrawer, setDrawerData } = useContext(DrawerContext)
  const modalRef = useRef(null)

  const close = () => {
    setShowDrawer(false)

    setTimeout(() => {
      setDrawerData({})
    }, 1000);
  }

  const handleClick = (e) => {
    if (e.target.classList.contains('drawer')) {
      close()
    }
  }

  return (
    <div 
      className={`drawer ${showDrawer ? 'active' : ''}`} 
      ref={modalRef}
      onClick={handleClick}
    >
      <div className={`drawer__content ${showDrawer ? 'active' : ''}`}>
        <header className="drawer__header">
          <h2 className="drawer__title">Edit Transaction</h2>

          <button className="drawer__close-button" onClick={close}>
            <i className="ri-close-line icon"></i>
          </button>
        </header>
          
        <Form />
      </div>
    </div>
  )
}

export default Drawer