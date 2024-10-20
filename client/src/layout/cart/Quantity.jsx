import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartBackend, addToCartFrontend } from '../../redux/actions/cart';

const Quantity = ({ item }) => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const increaseQuantity = () => {
        if (!item || !item.product) return; // Safeguard against undefined item or product
        const newQuantity = item.quantity + 1;

        if (user) {
            dispatch(addToCartBackend({ productId: item.product._id, quantity: 1 }));
        } else {
            dispatch(addToCartFrontend({ product: item.product, quantity: 1 }));
        }
    };

    const decreaseQuantity = () => {
        if (!item || !item.product || item.quantity <= 1) return; // Ensure quantity is more than 1
        const newQuantity = item.quantity - 1;

        if (user) {
            dispatch(addToCartBackend({ productId: item.product._id, quantity: -1 }));
        } else {
            dispatch(addToCartFrontend({ product: item.product, quantity: -1 }));
        }
    };

    return (
        <div>
            <p className="font-semibold">Qty:</p>
            <button onClick={increaseQuantity} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">+</button>
            <span className="bg-gray-200 px-4 py-1 rounded-lg">{item.quantity}</span>
            <button onClick={decreaseQuantity} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">-</button>
        </div>
    );
};

export default Quantity;
