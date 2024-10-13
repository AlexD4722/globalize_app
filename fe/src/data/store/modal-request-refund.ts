import { create } from 'zustand';

interface ModalRefundState {
  display: boolean;
  open: () => void;
  close: () => void;    
}

const useStoreModal = create<ModalRefundState>((set) => ({
  display: false,
  open: () => set({ display: true }),
  close: () => set({ display: false }),
}));

export default useStoreModal;