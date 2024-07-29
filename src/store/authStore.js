import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user-info')),
    login: (user) => set({ user }),
    logout: (user) => set({ user: null }),
    setUser: (user) => set({ user }),
    deleteUserNote: (id) => set(state => ({
        user: { ...state.user, notes: state.user.notes.filter(noteId => noteId !== id) }        
    }))
}))

export default useAuthStore