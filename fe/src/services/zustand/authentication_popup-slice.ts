import { StateCreator } from 'zustand'

export interface AuthPopupSlice {
  authPopup: boolean,
    page: "signin" | "register",
    setAuthPopup: (bool: boolean) => void,
    setPage: (setPageage: "signin" | "register") => void
}
  
export const createAuthPopupSlice: StateCreator<
  AuthPopupSlice
> = (set) => ({
    authPopup: false,
    page: "signin",
    setAuthPopup: (bool) => set((state) => ({ authPopup: bool })),
    setPage: (page) => set((state) => ({page: page}))
    
})

