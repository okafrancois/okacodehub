import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    bio: string | null;
    email: string | null;
    profilePictureUrl: string | null;
    socials: {
        website: string | null;
        twitter: string | null;
        linkedin: string | null;
        medium: string | null;
        github: string | null;
    }
}
export interface UserState {
    data: UserProfile;
    loading: boolean,
    error: string | null,
}

const initialState: UserState = {
    data: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        bio: null,
        profilePictureUrl: null,
        socials: {
            website: null,
            twitter: null,
            linkedin: null,
            medium: null,
            github: null,
        }
    },
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserDataRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getUserDataSucceed(state, action: PayloadAction<UserProfile>) {
            state.data = {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                username: action.payload.username,
                bio: action.payload.bio,
                email: action.payload.email,
                profilePictureUrl: action.payload.profilePictureUrl,
                socials: {
                    website: action.payload.socials.website,
                    twitter: action.payload.socials.twitter,
                    linkedin: action.payload.socials.linkedin,
                    medium: action.payload.socials.medium,
                    github: action.payload.socials.github,
                }
            }
            state.loading = false;
            state.error = null;
        },
        getUserDataFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const { getUserDataRequest, getUserDataSucceed, getUserDataFailed } = userSlice.actions;
export default userSlice.reducer;
