import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore"
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, firestore } from "../firebase/firebase"
import useTransactionsStore from "../store/transactionsStore"
import { useAuthState } from 'react-firebase-hooks/auth'

const useGetTransactions = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { setTransactions } = useTransactionsStore()
//   const authUser = useAuthStore(state => state.user)
  const [authUser] = useAuthState(auth)

  useEffect(() => {
    const getTransactions = async () => {
        if (!authUser) return

        setIsLoading(true)
        setTransactions([])

        try {
            const transactionsCollectionRef = collection(firestore, 'transactions')
            const q = query(transactionsCollectionRef, where('createdBy', '==', authUser.uid))
            const querySnapshot = await getDocs(q)

            const transactions = []
            querySnapshot.forEach(doc => {
                transactions.push({
                    ...doc.data(),
                    id: doc.id
                })
            })

            transactions.sort((a, b) => b.createdOn - a.createdOn)

            setTransactions(transactions)
            
        } catch (error) {
            console.log(error.message)
            setTransactions([])
        } finally {
            setIsLoading(false)
        }
    }

    getTransactions()
  }, [])  

  return { isLoading }
}

export default useGetTransactions