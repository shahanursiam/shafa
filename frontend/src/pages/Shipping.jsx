import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";
import orderApi from "../api/orderapi";
import AddressUpdate from "../components/AddressUpdate";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "react-toastify";

const Shipping = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const res = await userApi.getAddresses();
            const addrList = res.data.addresses || res.data || [];
            setAddresses(addrList);
            if (addrList.length > 0 && !selectedAddressId) {
                setSelectedAddressId(addrList[0]._id);
            }
        } catch (error) {
            console.error("Failed to load addresses", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNewAddress = async (formData) => {
        try {
            await userApi.addAddress(formData);
            toast.success("Address added successfully");
            setIsAddingNew(false);
            fetchAddresses();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add address");
        }
    };

    const placeOrder = async () => {
        if (!selectedAddressId) {
            toast.error("Please select a delivery address");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        // Construct Order Payload
        const orderData = {
            items: cartItems.map(item => ({
                product: item.product,
                quantity: item.quantity
            })),
            addressId: selectedAddressId,
            paymentInfo: {
                id: paymentMethod === 'COD' ? 'COD' : 'online_payment_id',
                status: paymentMethod === 'COD' ? 'Not Paid' : 'Paid',
                method: paymentMethod
            }
        };

        try {
            const res = await orderApi.createOrder(orderData);
            if (res.status === 201 || res.status === 200) {
                toast.success("Order placed successfully!");
                clearCart();
                navigate("/orders"); // Or order success page
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to place order");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Left Col: Address & Payment */}
                <div className="w-full lg:w-2/3 space-y-8">

                    {/* Address Selection */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Delivery Address</h2>
                            <button
                                onClick={() => setIsAddingNew(!isAddingNew)}
                                className="text-indigo-600 font-semibold hover:underline"
                            >
                                {isAddingNew ? "Cancel" : "+ Add New"}
                            </button>
                        </div>

                        {isAddingNew ? (
                            <AddressUpdate onSave={handleAddNewAddress} onCancel={() => setIsAddingNew(false)} />
                        ) : (
                            <div className="space-y-3">
                                {addresses.length === 0 ? (
                                    <p className="text-gray-500">No addresses found. Please add a new one.</p>
                                ) : (
                                    addresses.map(addr => (
                                        <label key={addr._id} className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition ${selectedAddressId === addr._id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
                                            <input
                                                type="radio"
                                                name="address"
                                                className="mt-1"
                                                checked={selectedAddressId === addr._id}
                                                onChange={() => setSelectedAddressId(addr._id)}
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">{addr.label}</span>
                                                    <span className="text-gray-600">({addr.fullName})</span>
                                                </div>
                                                <p className="text-sm text-gray-600">{addr.street}, {addr.city}, {addr.postalCode}</p>
                                                <p className="text-sm text-gray-600">Phone: {addr.phone}</p>
                                            </div>
                                        </label>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                        <div className="space-y-3">
                            <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'COD' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span className="font-semibold">Cash on Delivery</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Online"
                                    disabled
                                />
                                <div>
                                    <span className="font-semibold">Online Payment</span>
                                    <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">Coming Soon</span>
                                </div>
                            </label>
                        </div>
                    </div>

                </div>

                {/* Right Col: Order Summary */}
                <div className="w-full lg:w-1/3 h-fit bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                        {cartItems.map(item => (
                            <div key={item.product} className="flex justify-between text-sm">
                                <span>{item.quantity} x {item.name}</span>
                                <div className="flex items-center font-medium">
                                    <TbCurrencyTaka /> {item.price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <div className="flex items-center"> <TbCurrencyTaka /> {getCartTotal()} </div>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Charge</span>
                            <div className="flex items-center"> <TbCurrencyTaka /> 50 </div>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold text-xl mt-2">
                            <span>Total</span>
                            <div className="flex items-center text-indigo-600"> <TbCurrencyTaka /> {getCartTotal() + 50} </div>
                        </div>
                    </div>

                    <button
                        onClick={placeOrder}
                        disabled={cartItems.length === 0 || !selectedAddressId}
                        className="w-full btn btn-primary mt-6 rounded-full text-lg disabled:opacity-50"
                    >
                        Place Order
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Shipping;
