import { createSlice } from '@reduxjs/toolkit';

// Création du slice pour le panier
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        // Action pour ajouter un article au panier
        addItem: (state, action) => {
            const { name, image, cost, description } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            
            if (existingItem) {
                // Si l'article existe déjà, augmenter sa quantité
                existingItem.quantity++;
                state.total += parseFloat(cost.replace('$', ''));
            } else {
                // Sinon, ajouter un nouvel article
                state.items.push({ 
                    name, 
                    image, 
                    cost, 
                    description, 
                    quantity: 1 
                });
                state.total += parseFloat(cost.replace('$', ''));
            }
        },

        // Action pour supprimer un article du panier
        removeItem: (state, action) => {
            const itemToRemove = state.items.find(item => item.name === action.payload);
            if (itemToRemove) {
                state.total -= parseFloat(itemToRemove.cost.replace('$', '')) * itemToRemove.quantity;
                state.items = state.items.filter(item => item.name !== action.payload);
            }
        },

        // Action pour mettre à jour la quantité d'un article
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            
            if (itemToUpdate) {
                const oldTotal = parseFloat(itemToUpdate.cost.replace('$', '')) * itemToUpdate.quantity;
                const newTotal = parseFloat(itemToUpdate.cost.replace('$', '')) * quantity;
                itemToUpdate.quantity = quantity;
                state.total = state.total - oldTotal + newTotal;
            }
        },

        // Action pour vider le panier
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        }
    }
});

// Export des actions individuelles pour utilisation dans les composants
export const { 
    addItem,    // Utilisé dans ProductList.jsx
    removeItem, // Utilisé dans CartItem.jsx
    updateQuantity, // Utilisé dans CartItem.jsx
    clearCart   // Disponible pour une utilisation future
} = cartSlice.actions;

// Export du réducteur pour utilisation dans store.js
export default cartSlice.reducer;
