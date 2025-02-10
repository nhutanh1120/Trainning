import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, getMe, logout } from '~/services/authService';

// Thunk: Đăng nhập
export const loginUser = createAsyncThunk('auth/loginUser', async (payload, { rejectWithValue }) => {
    try {
        const data = await login(payload);
        return data.user;
    } catch (error) {
        return rejectWithValue('Lỗi server, vui lòng thử lại');
    }
});

// Thunk: Đăng ký
export const registerUser = createAsyncThunk('auth/registerUser', async (payload, { rejectWithValue }) => {
    try {
        const data = await register(payload);
        return data.user;
    } catch (error) {
        return rejectWithValue('Lỗi server, vui lòng thử lại');
    }
});

// Thunk: Kiểm tra trạng thái đăng nhập
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
    try {
        const data = await getMe();
        return data.user;
    } catch {
        return rejectWithValue(null);
    }
});

// Thunk: Đăng xuất
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
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
                console.log(loginUser, 'pending');
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(loginUser, 'fulfilled');
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log(loginUser, 'rejected');
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
