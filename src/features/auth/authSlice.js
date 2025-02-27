import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  checkAuth,
  signOut,
  loginUser,
  resetPasswordRequest,
  resetPassword,
} from "./authAPI";

const initialState = {
  status: "idle",
  loggedInUserToken: null,
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
};
export const signOutAsync = createAsyncThunk("user/signOut", async () => {
  const response = await signOut();

  return response.data;
});

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithvalue }) => {
    try {
      const response = await loginUser(loginInfo);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      return rejectWithvalue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);

      // Check if response status is OK before accessing the data
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Return the JSON data from the response
      return await response.json();
    } catch (error) {
      // Log the error for debugging
      console.error("Reset password request failed:", error);

      // Return a rejected promise with the error message
      return rejectWithValue(error.message);
    }
  }
);

// export const resetPasswordRequestAsync = createAsyncThunk(
//   "user/resetPasswordRequest",
//   async (email) => {
//     try {
//       const response = await resetPasswordRequest(email);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken += action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })

      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export default authSlice.reducer;
