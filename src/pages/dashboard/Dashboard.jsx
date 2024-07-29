import './dashboard.css'
import Header from '../../components/header/Header'
import Main from '../../components/main/Main'
import Modal from '../../components/modal/Modal'
import Drawer from '../../components/drawer/Drawer'
import Toast from '../../components/toast/Toast'
import { useContext } from 'react'
import { ToastContext } from '../../context/ToastContext'
import '../../components/bars/bars.css'
import DashboardBars from './DashboardBars'

const Dashboard = () => {
  const { showToast } = useContext(ToastContext)

  return (
    <div className="dashboard">
      <Header />
      <Main />
      <Modal /> 
      <Drawer />

      <DashboardBars />

      {showToast ? <Toast /> : null}
    </div>
  )
}

export default Dashboard