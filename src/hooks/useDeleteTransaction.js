import { useContext, useState } from "react"
import useAuthStore from "../store/authStore" 
import useTransactionsStore from "../store/transactionsStore"
import { firestore } from "../firebase/firebase"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ToastContext } from "../context/ToastContext"
 
const useDeleteTransaction = () => {
    const [isLoading, setIsLoading] = useState(false)  
    const authUser = useAuthStore(state => state.user)
    const deleteTransaction = useTransactionsStore(state => state.deleteTransaction)
    const { setShowToast, setToastData } = useContext(ToastContext)

    const handleDeleteTransaction = async (id) => {
        if (isLoading) return 

        setIsLoading(true)

        try {
            const userRef = doc(firestore, 'users', authUser.uid)
            const transactionRef = doc(firestore, 'transactions', id)
            await deleteDoc(transactionRef)

            await updateDoc(userRef, {
                transactions: arrayRemove(id)
            })

            deleteTransaction(id)
        
            setToastData({
              color: 'var(--success)',
              text: 'Transaction deleted',
              icon: 'checkbox-circle',
              time: 5000,
            })
            setShowToast(true)            
        } catch (error) {
            setToastData({
              color: 'var(--warning)',
              text: error.message,
              icon: 'error-warning',
              time: 7000,
            })
            setShowToast(true)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, handleDeleteTransaction }
}

export default useDeleteTransaction