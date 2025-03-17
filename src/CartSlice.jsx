import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
            state.total += parseFloat(action.payload.cost.replace('$', ''));
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex(item => item.name === action.payload.name);
            if (index !== -1) {
                state.total -= parseFloat(state.items[index].cost.replace('$', ''));
                state.items.splice(index, 1);
            }
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            if (item) {
                const oldQuantity = item.quantity || 1;
                const newQuantity = quantity;
                item.quantity = newQuantity;
                const price = parseFloat(item.cost.replace('$', ''));
                state.total += price * (newQuantity - oldQuantity);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        }
    }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
