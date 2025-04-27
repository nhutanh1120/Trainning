import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, getMe, logout } from '~/services/authService';

// Thunk: Đăng nhập
export const loginUser = createAsyncThunk('auth/loginUser', async (payload, { rejectWithValue }) => {
    try {
        const response = await login(payload);
        return response.user;
    } catch (error) {
        return rejectWithValue('Lỗi server, vui lòng thử lại');
    }
});

// Thunk: Đăng ký
export const registerUser = createAsyncThunk('auth/registerUser', async (payload, { rejectWithValue }) => {
    try {
        const response = await register(payload);
        return response.user;
    } catch (error) {
        return rejectWithValue('Lỗi server, vui lòng thử lại');
    }
});

// Thunk: Kiểm tra trạng thái đăng nhập
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
    try {
        const response = await getMe();
        return response.user;
    } catch {
        localStorage.removeItem('isLoginMode');
        return rejectWithValue(null);
    }
});

// Thunk: Đăng xuất
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    localStorage.removeItem('isLoginMode');
    await logout();
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Xử lý login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Xử lý register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Xử lý fetch user
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.user = null;
            })
            // Xử lý logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export default authSlice.reducer;
