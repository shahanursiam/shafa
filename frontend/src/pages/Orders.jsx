import React, { useState, useEffect } from "react";
import orderApi from "../api/orderapi";
import { TbCurrencyTaka } from "react-icons/tb";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await orderApi.getMyOrders();
                setOrders(res.data.orders || res.data || []);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading orders...</div>;

    return (
        <div className="container mx-auto px-4 py-8 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>No orders found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between md:items-center pb-4 border-b border-gray-100">
                                <div>
                                    <p className="font-bold text-gray-800">Order #{order._id}</p>
                                    <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="py-4 space-y-2">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600">{item.quantity} x</span>
                                            <span>{item.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <TbCurrencyTaka /> {item.price * item.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center font-bold">
                                <span>Total Amount</span>
                                <div className="flex items-center text-indigo-600">
                                    <TbCurrencyTaka /> {order.totalAmount}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
