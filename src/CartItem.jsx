import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onClose }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
    };

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity >= 1) {
            dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
        }
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Votre Panier</h2>
                <button className="close-button" onClick={onClose}>×</button>
            </div>
            
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Votre panier est vide</p>
                    <button className="continue-shopping" onClick={onClose}>
                        Continuer vos achats
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p className="cart-item-price">{item.cost}</p>
                                    <div className="cart-item-controls">
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => handleQuantityChange(item, (item.quantity || 1) - 1)}
                                                disabled={(item.quantity || 1) <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity || 1}</span>
                                            <button onClick={() => handleQuantityChange(item, (item.quantity || 1) + 1)}>
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            className="remove-button"
                                            onClick={() => handleRemoveItem(item)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-footer">
                        <div className="cart-total">
                            <h3>Total: ${total.toFixed(2)}</h3>
                        </div>
                        <div className="cart-actions">
                            <button className="continue-shopping" onClick={onClose}>
                                Continuer vos achats
                            </button>
                            <button className="checkout-button">
                                Procéder au paiement
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;


