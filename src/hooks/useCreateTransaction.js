import { useContext, useState } from "react"
import useAuthStore from "../store/authStore"
import useTransactionsStore from "../store/transactionsStore"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { ToastContext } from "../context/ToastContext"

const useCreateTransaction = () => {
    
  const [isLoading, setIsLoading] = useState(false) 
  const authUser = useAuthStore(state => state.user) 
  const createTransaction = useTransactionsStore(state => state.createTransaction)
  const { setShowToast, setToastData } = useContext(ToastContext)

  const handleCreateTransaction = async (description, amount, type, category, paymentMethod) => {
    if (isLoading) return

    setIsLoading(true)

    const newTransaction = {
      description,
      amount,
      type,
      category,
      paymentMethod,
      createdOn: Date.now(),
      createdBy: authUser.uid
    }

    try {
      const transactionsCollectionRef = collection(firestore, 'transactions')
      const transactionDocRef = await addDoc(transactionsCollectionRef, newTransaction)

      const userDocRef = doc(firestore, 'users', authUser.uid)
      await updateDoc(userDocRef, { transactions: arrayUnion(transactionDocRef.id) })

      createTransaction({ ...newTransaction, id: transactionDocRef.id })
        
      setToastData({
        color: 'var(--success)',
        text: 'Transaction added',
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

  
  return { isLoading, handleCreateTransaction }
}

export default useCreateTransaction