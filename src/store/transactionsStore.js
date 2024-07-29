import { create } from "zustand";

const useTransactionsStore = create((set) => ({
    transactions: [],
    createTransaction: (transaction) => set(state => ({ transactions: [transaction, ...state.transactions] })),
    deleteTransaction: (id) => set(state => ({ transactions: state.transactions.filter(transaction => transaction.id !== id)} )),
    setTransactions: (transactions) => set({ transactions }),
    updateTransactions: (transaction) => set(state => ({ transactions: [transaction, ...state.transactions.filter(n => n.id !== transaction.id)] })),
}))

export default useTransactionsStore