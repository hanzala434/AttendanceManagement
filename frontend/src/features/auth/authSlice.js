import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
//get user from local (if already logged in)
const user=JSON.parse(localStorage.getItem('user'))
const initialState={
    user:user? user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

//register user
export const register=createAsyncThunk('auth/register',async(user,thunkAPI)=>{
    try{
        return await authService.register(user)
    }catch(error){
        const message=(error.res && error.res.data && error.res.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update user data
export const updateUser=createAsyncThunk('auth/updateUser',async({updatedData,id},thunkAPI)=>{
    try{
        return await authService.updateUser({updatedData,id})
    }catch(error){
        const message=(error.res && error.res.data && error.res.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//login user
export const login=createAsyncThunk('auth/login',async(user,thunkAPI)=>{
    try{
        return await authService.login(user)
    }catch(error){
        const message=(error.res && error.res.data && error.res.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



//logOut
export const logout=createAsyncThunk('auth/logout',async()=>{
    await authService.logout()
})

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message=''
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload //value from try-catch
            state.user=null
        })


        .addCase(updateUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload //value from try-catch
            state.user=null
        })



        .addCase(logout.fulfilled,(state)=>{
            state.user=null
        })

        .addCase(login.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload //value from try-catch
            state.user=null
        })

    }

})

export const {reset}=authSlice.actions
export default authSlice.reducer