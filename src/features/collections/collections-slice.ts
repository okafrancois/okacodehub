import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Collection {
    _id: string;
    title: string;
    description: string;
    createById: string;
    createdAt: string;
    updatedAt: string;
    "__v": number;
}

export interface CollectionsState {
    data: Collection[] | [];
    currentPage: number;
    limit: number;
    totalDocuments: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
}

interface GetCollectionsResponse {
    collections: Collection[];
    currentPage: number;
    limit: number;
    totalDocuments: number;
    totalPages: number;
}

const initialState: CollectionsState = {
    data: [],
    currentPage: 1,
    limit: 10,
    totalDocuments: 0,
    totalPages: 0,
    loading: false,
    error: null,
}

const collectionsSlice = createSlice({
    name: 'Collections',
    initialState,
    reducers: {
        getCollectionsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getCollectionsSucceed(state, action: PayloadAction<GetCollectionsResponse>) {
            state.data = action.payload.collections;
            state.currentPage = action.payload.currentPage;
            state.limit = action.payload.limit;
            state.totalDocuments = action.payload.totalDocuments;
            state.totalPages = action.payload.totalPages;
            state.loading = false;
            state.error = null;
        },
        getCollectionsFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        postCollectionRequest(state) {
            state.loading = true;
            state.error = null;
        },
        postCollectionSucceed(state) {
            state.loading = false;
            state.error = null;
        },
        postCollectionFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        updateLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        }
    }
})
export const {
    getCollectionsRequest,
    getCollectionsFailed,
    getCollectionsSucceed,
    postCollectionRequest,
    postCollectionSucceed,
    postCollectionFailed,
    updateCurrentPage,
    updateLimit
} = collectionsSlice.actions;
export default collectionsSlice.reducer;
