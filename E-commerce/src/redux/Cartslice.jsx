import {createSlice} from '@reduxjs/toolkit'

// const initialMode = JSON.parse(localStorage.getItem('mode')) ?? [];

const initialState =  {
    // mode: initialMode,
    cart: JSON.parse(localStorage.getItem('cart')) ?? [],
    mode: (localStorage.getItem('mode')) ?? 'light'
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState.cart,
    reducers: {
        addToCart(state, action){
            state.push( action.payload)
        },
        deleteFromCart(state,action){
            return state.filter(item=> item.id != action.payload.id)
        },
    }

})

export const { addToCart, deleteFromCart, addToWishlist, deleteFromWishlist} = cartSlice.actions

export default cartSlice.reducer;