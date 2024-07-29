import { firestore, googleProvider } from '../firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import useAuthStore from '../store/authStore'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { ToastContext } from '../context/ToastContext'

const useSignInWithGoogle = () => {  
  const loginUser = useAuthStore(state => state.login)
  const [isLoading, setIsLoading] = useState(false)
  const { setShowToast, setToastData } = useContext(ToastContext)
  
  const signInWithGoogle = async () => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const data = await signInWithPopup(auth, googleProvider)
      const userRef = doc(firestore, "users", data.user.uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        // login
        const userDoc = userSnap.data()
        localStorage.setItem('user-info', JSON.stringify(userDoc))
        loginUser(userDoc)

        setToastData({
          color: 'var(--success)',
          text: `Welcome back! You signed in with ${userDoc.email}`,
          icon: 'checkbox-circle',
          time: 8000,
        })
        setShowToast(true)

      } else {
        // signup
        const userDoc = {
          uid: data.user.uid,
          email: data.user.email,
          name: data.user.displayName,
          profilePicURL: data.user.photoURL,
          transactions: [],
          createdAt: Date.now()
        }
        
        await setDoc(doc(firestore, "users", data.user.uid), userDoc)
        localStorage.setItem('user-info', JSON.stringify(userDoc))
        loginUser(userDoc)

        setToastData({
          color: 'var(--success)',
          text: `Welcome to Finsight! You signed up with ${userDoc.email}`,
          icon: 'checkbox-circle',
          time: 10000,
        })
        setShowToast(true)
        
      }
    } catch (error) {
      if (error.message !== 'Firebase: Error (auth/popup-closed-by-user).') {
        setToastData({
          color: 'var(--warning)',
          text: error.message,
          icon: 'error-warning',
          time: 7000,
        })
        setShowToast(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, signInWithGoogle }
}

export default useSignInWithGoogle