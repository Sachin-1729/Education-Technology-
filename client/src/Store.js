import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Redux/loginfucntion';
import alluserReducer from './Redux/alluser'
import allsubscriberreducer from './Redux/Allsubscriber'
import currentactivesubscriber from './Redux/gettingallactivesubscriber'



const store = configureStore({
    reducer:{
        user:userReducer,
        alluser:alluserReducer,
        allsubscriber: allsubscriberreducer,
        currentactivesubscriber : currentactivesubscriber
    }
})

export default store;