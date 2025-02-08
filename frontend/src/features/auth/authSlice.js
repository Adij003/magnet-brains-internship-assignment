import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
    user: null,
    allUsers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isRegistered: false,
    message: ''
}

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
          } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
      
            return thunkAPI.rejectWithValue(message);
          }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
          } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
      
            return thunkAPI.rejectWithValue(message);
          }
    }
)

export const getAllUsers = createAsyncThunk(
    'auth/getAllUsers',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.getAllUsers(token);
          } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
      
            return thunkAPI.rejectWithValue(message);
          }
    }
)

export const logout = createAsyncThunk(
    "auth/logout", 
    async () => {
        console.log('we are reaching here')
    await authService.logout()
  });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.allUsers = []
            state.isError = false
            state.isSuccess = false
            state.isRegistered = false
            state.message = ''
            
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isRegistered = true; 
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.isError = true
            state.message = action.payload
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.allUsers = []
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false 
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false 
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(getAllUsers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.allUsers = action.payload
        })
        .addCase(getAllUsers.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer