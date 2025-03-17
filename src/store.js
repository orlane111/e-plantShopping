import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Configuration du store Redux avec le reducer du panier
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

// Export par défaut du store pour l'utiliser dans toute l'application
export default store;
