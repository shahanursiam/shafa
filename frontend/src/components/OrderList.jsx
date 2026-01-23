import React, { useState, useEffect } from "react";
import orderApi from "../api/orderapi";
import { toast } from "react-toastify";
import { TbCurrencyTaka } from "react-icons/tb";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await orderApi.getAllOrders();
            setOrders(res.data || []);
        } catch (error) {
            console.error("Failed to fetch orders", error);
            // toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await orderApi.updateStatus(id, newStatus);
            toast.success(`Order status updated to ${newStatus}`);
            fetchOrders();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-6">Order Management</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="font-mono text-xs">{order._id}</td>
                                <td>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{order.shippingInfo?.fullName}</span>
                                        <span className="text-xs text-gray-500">{order.shippingInfo?.phone}</span>
                                    </div>
                                </td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="font-bold">
                                    <div className="flex items-center">
                                        <TbCurrencyTaka /> {order.totalAmount}
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${order.paymentInfo?.method === 'COD' ? 'badge-ghost' : 'badge-primary'}`}>
                                        {order.paymentInfo?.method || 'COD'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${order.orderStatus === 'Delivered' ? 'badge-success' :
                                            order.orderStatus === 'Processing' ? 'badge-info' :
                                                order.orderStatus === 'Cancelled' ? 'badge-error' :
                                                    'badge-warning'
                                        }`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        className="select select-bordered select-xs w-full max-w-xs"
                                        value={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        disabled={order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled'}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;