import { doc, getDoc } from "firebase/firestore"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth, firestore } from "../firebase/firebase"
import useAuthStore from "../store/authStore"
import { useContext } from "react"
import { ToastContext } from "../context/ToastContext"

const useLoginWithEmailAndPassword = () => {
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth)
    const loginUser = useAuthStore(state => state.login)
    const { setShowToast, setToastData } = useContext(ToastContext)

    const login = async (inputs) => {
        const { email, password } = inputs

        try {
            const userCred = await signInWithEmailAndPassword(email, password)

            if (userCred) {
                const userDocRef = doc(firestore, 'users', userCred.user.uid) 
                const userDocSnap = await getDoc(userDocRef)
                localStorage.setItem('user-info', JSON.stringify(userDocSnap.data()))
                loginUser(userDocSnap.data())
                
                setToastData({
                    color: 'var(--success)',
                    text: `Welcome back! You signed in with ${userDocSnap.data().email}`,
                    icon: 'checkbox-circle',
                    time: 7000,
                })
                setShowToast(true)
            } else {
                setToastData({
                  color: 'var(--warning)',
                  text: 'Wrong credentials',
                  icon: 'close-circle',
                  time: 4000,
                })
                setShowToast(true)
            }
        } catch (error) {
            setToastData({
              color: 'var(--warning)',
              text: error.message,
              icon: 'error-warning',
              time: 7000,
            })
            setShowToast(true)
        }
    }

    return { login, loading, error }
}

export default useLoginWithEmailAndPassword