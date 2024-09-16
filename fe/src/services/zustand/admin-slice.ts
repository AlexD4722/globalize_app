import { StateCreator } from 'zustand'

export interface AdminSlice {
    isAdminLogin: boolean,
    setIsAdminLogin: (bool: boolean) => void,

}
  
export const createAdminSlice: StateCreator<
AdminSlice
> = (set) => ({
    isAdminLogin: false,
    setIsAdminLogin: (bool) => set((state) => ({ isAdminLogin: bool })),
})

