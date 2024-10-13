import { create } from 'zustand';

interface ModalAcceptRefundState {
  display: boolean;
  open: () => void;
  close: () => void;    
}

const useStoreModal = create<ModalAcceptRefundState>((set) => ({
  display: false,
  open: () => set({ display: true }),
  close: () => set({ display: false }),
}));

export default useStoreModal;