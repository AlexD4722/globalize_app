import { create } from 'zustand';

interface ModalRejectRefundState {
  display: boolean;
  open: () => void;
  close: () => void;    
}

const useStoreModalReject = create<ModalRejectRefundState>((set) => ({
  display: false,
  open: () => set({ display: true }),
  close: () => set({ display: false }),
}));

export default useStoreModalReject;