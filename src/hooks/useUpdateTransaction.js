import { useContext, useState } from "react"
import useAuthStore from "../store/authStore"
import useTransactionsStore from "../store/transactionsStore"
import { ToastContext } from "../context/ToastContext"
import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"


const useUpdateTransaction = () => {
    const [isUpdating, setIsUpdating] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const updateTransactions = useTransactionsStore(state => state.updateTransactions)
    const { setShowToast, setToastData } = useContext(ToastContext)

    const handleUpdateTransaction = async (data) => {
        if (isUpdating || !authUser) return

        setIsUpdating(true)

        try {
            const {
                createdOn,
                createdBy,
                id,
                ...infos
            } = data

            const transactionRef = doc(firestore, 'transactions', id)
            const updatedTransaction = { ...infos }

            await updateDoc(transactionRef, updatedTransaction)
            updateTransactions({ id, createdOn, ...updatedTransaction })
        
            setToastData({
              color: 'var(--success)',
              text: 'Changes saved',
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
            setIsUpdating(false)
        }
    }

  return { isUpdating, handleUpdateTransaction }
}

export default useUpdateTransaction