import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface newUserState {
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
}

const initialState: newUserState = {
    loading: false,
    error: false,
    errorMessage: null
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        signupRequest(state) {
            state.error = false;
            state.loading = true;
            state.errorMessage = null;
        },
        signupSucceed(state) {
            state.loading = false;
            state.error = false;
        },
        signupFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload;
        }
    }
})

export const {signupRequest, signupSucceed, signupFailed} = signupSlice.actions;
export default signupSlice.reducer;
