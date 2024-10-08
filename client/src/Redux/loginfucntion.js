import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: localStorage.getItem('Token'),
    role:  localStorage.getItem('Role')
   
 };

 
const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginDone: (state , action)=>{
           
            const token = action.payload.Token;
            const role = action.payload.Role;
            console.log({token , role})
            console.log(role === 'Admin') 
           
            const gettingtoken = localStorage.getItem('Token');
            console.log(gettingtoken , token)
            parseInt(token);
             if( parseInt(token) === parseInt(gettingtoken)){
                console.log(role === 'Admin' ? "Admin login" : "User login");
                 state.login = token;
                 localStorage.setItem('Role' , role);
                 state.role = localStorage.getItem('Role');
             }
             else{
                console.log("Invalid token or role");
                state.login = null;
                state.role = 'User';
             }
        },
        logoutDone: (state , action)=>{
          
            localStorage.removeItem('Token');
            localStorage.removeItem('Role');
            state.login = localStorage.getItem('Token');
            state.role = localStorage.getItem('Role');
        
            
        },
    },
    extraReducers: (builder) => {
      
    }
});

export const { loginDone , logoutDone } = authSlice.actions;

export default authSlice.reducer;
