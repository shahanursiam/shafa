import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { TbCurrencyTaka } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
                <Link to="/products" className="btn btn-primary rounded-full px-8">
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="w-full lg:w-2/3 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.product}
                            className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 p-4 rounded-xl shadow-sm bg-white"
                        >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                />
                                <div>
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <div className="flex items-center text-indigo-600 font-bold">
                                        <TbCurrencyTaka />
                                        <span>{item.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mt-4 sm:mt-0">
                                {/* Quantity */}
                                <div className="flex items-center border border-gray-300 rounded-full">
                                    <button
                                        className="px-3 py-1 hover:bg-gray-100 rounded-l-full"
                                        onClick={() => updateQuantity(item.product, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-3 font-semibold">{item.quantity}</span>
                                    <button
                                        className="px-3 py-1 hover:bg-gray-100 rounded-r-full"
                                        onClick={() => updateQuantity(item.product, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeFromCart(item.product)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <FiTrash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3 h-fit bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                            <div className="flex items-center">
                                <TbCurrencyTaka />
                                <span>{getCartTotal()}</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Charges</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-xl">
                            <span>Total</span>
                            <div className="flex items-center text-indigo-600">
                                <TbCurrencyTaka />
                                <span>{getCartTotal()}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/shipping")}
                        className="w-full btn btn-primary rounded-full text-lg"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
