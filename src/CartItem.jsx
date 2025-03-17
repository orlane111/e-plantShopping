import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onClose }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);

    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.replace('$', ''));
        return price * (item.quantity || 1);
    };

    const handleRemoveItem = (itemName) => {
        dispatch(removeItem(itemName));
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ 
            name: item.name, 
            quantity: (item.quantity || 1) + 1 
        }));
    };

    const handleDecrement = (item) => {
        if ((item.quantity || 1) > 1) {
            // Si la quantité est supérieure à 1, on décrémente
            dispatch(updateQuantity({ 
                name: item.name, 
                quantity: (item.quantity || 1) - 1 
            }));
        } else {
            // Si la quantité atteint 0, on supprime l'article
            dispatch(removeItem(item.name));
        }
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onClose(); // Appel de la fonction passée depuis le parent pour retourner à la liste des produits
    };

    const handleCheckoutShopping = (e) => {
        alert('Fonctionnalité à ajouter ultérieurement');
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Votre Panier ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} articles)</h2>
                <button className="close-button" onClick={handleContinueShopping}>×</button>
            </div>
            
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Votre panier est vide</p>
                    <button className="continue-shopping" onClick={handleContinueShopping}>
                        Continuer vos achats
                    </button>
                </div>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <div className="cart-item-price-details">
                                        <p className="cart-item-price">Prix unitaire: {item.cost}</p>
                                        <p className="cart-item-subtotal">Sous-total: ${calculateTotalCost(item).toFixed(2)}</p>
                                    </div>
                                    <div className="cart-item-controls">
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => handleDecrement(item)}
                                                className="cart-item-button cart-item-button-dec"
                                            >
                                                -
                                            </button>
                                            <span className="cart-item-quantity-value">{item.quantity || 1}</span>
                                            <button 
                                                onClick={() => handleIncrement(item)}
                                                className="cart-item-button cart-item-button-inc"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            className="remove-button"
                                            onClick={() => handleRemoveItem(item.name)}
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
                            <p className="cart-items-count">Nombre total d'articles: {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}</p>
                        </div>
                        <div className="cart-actions">
                            <button className="continue-shopping" onClick={handleContinueShopping}>
                                Continuer vos achats
                            </button>
                            <button className="checkout-button" onClick={handleCheckoutShopping}>
                                Procéder au paiement
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartItem;


