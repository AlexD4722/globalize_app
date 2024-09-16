import { create } from 'zustand';

interface ModalState {
  display: boolean;
  open: () => void;
  close: () => void;    
}

const useStoreModal = create<ModalState>((set) => ({
  display: false,
  open: () => set({ display: true }),
  close: () => set({ display: false }),
}));

export default useStoreModal;