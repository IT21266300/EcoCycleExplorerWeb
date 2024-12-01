import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GoogleUserInfo {
  idToken: string | null;
  accessToken: string | null;
  serverAuthCode: string | null;
}

interface UserState {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providerId: string | null;
  googleUserInfo?: GoogleUserInfo;
}

const initialState: UserState = {
  uid: '',
  displayName: null,
  email: null,
  photoURL: null,
  providerId: null,
  googleUserInfo: {
    idToken: null,
    accessToken: null,
    serverAuthCode: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
