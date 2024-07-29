import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
import { auth } from './firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ModalProvider } from './context/ModalContext'
import { DrawerProvider } from './context/DrawerContext'
import { ToastProvider } from './context/ToastContext'
import Footer from './components/footer/Footer'

function App() {
  const [authUser] = useAuthState(auth)

  return (
    <div className="app">
      <ModalProvider>
        <DrawerProvider>
          <ToastProvider>
            <Routes>
              <Route path='/' element={!authUser ? <Home /> : <Navigate to='/dashboard' />} />
              <Route path='/dashboard' element={authUser ? <Dashboard /> : <Navigate to='/' />} />
            </Routes>
          </ToastProvider>
        </DrawerProvider>
      </ModalProvider>
      <Footer />
    </div>
  )
}

export default App
