import { create } from 'zustand'
import { AuthPopupSlice, createAuthPopupSlice} from "./authentication_popup-slice";
import { SearchBarSlice, createSearchbarSlice } from './layout_searchbar-slice';
import { listingProcessSlice, createListingProcessSlice } from './listing_process-slice';
import { AdminSlice, createAdminSlice } from './admin-slice';

// Create your store, which includes both state and (optionally) actions
const useLocalAppStore = create<AuthPopupSlice & SearchBarSlice & listingProcessSlice & AdminSlice>()((...restParams) => ({
    ...createAuthPopupSlice(...restParams),
    ...createSearchbarSlice(...restParams),
    ...createListingProcessSlice(...restParams),
    ...createAdminSlice(...restParams)

}))

export default useLocalAppStore
