import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore, storage } from '../firebase/firebase'
import useAuthStore from '../store/authStore'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { ToastContext } from '../context/ToastContext'
import { useContext } from 'react'

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth)
    const loginUser = useAuthStore(state => state.login)
    const { setShowToast, setToastData } = useContext(ToastContext)

    const signup = async (inputs) => {
        const { image, name, email, password } = inputs

        const usersRef = collection(firestore, 'users')
        const q = query(usersRef, where('email', '==', email))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            setToastData({
                color: 'var(--oopsie)',
                text: 'User with this email already exists',
                icon: 'error-warning',
                time: 5000,
            })
            setShowToast(true)
            return
        }

        try {
            const newUser = await createUserWithEmailAndPassword(email, password)
            if (!newUser && error) {
                console.log(error.message)
                return
            }            
            
            if (newUser) {
                // update photo
                const imageRef = ref(storage, `profilePics/${newUser.user.uid}`)
                await uploadBytes(imageRef, image)
                const URL = await getDownloadURL(imageRef)

                const userDoc = {
                    uid: newUser.user.uid,
                    email,
                    name,
                    profilePicURL: URL,
                    transactions: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc)
                localStorage.setItem('user-info', JSON.stringify(userDoc))
                loginUser(userDoc)

                setToastData({
                    color: 'var(--success)',
                    text: `Welcome to Finsight! You signed up with ${email}`,
                    icon: 'checkbox-circle',
                    time: 10000,
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
    
    return { loading, error, signup }
}

export default useSignUpWithEmailAndPassword