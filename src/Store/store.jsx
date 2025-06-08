import { configureStore } from "@reduxjs/toolkit";
import mySlice from './Slice'

export const store = configureStore({
    reducer:{
        restaurant:mySlice
    }
})