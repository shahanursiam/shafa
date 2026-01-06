import React, { useState, useEffect } from "react";
import userApi from "../api/userApi";
import AddressUpdate from "./AddressUpdate";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const UserAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [view, setView] = useState("list"); // 'list', 'add', 'edit'
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const res = await userApi.getAddresses();
            // Assuming res.data.addresses is the array, adjust based on actual API response
            // If the API returns the array directly or in a different property, update here.
            // Based on typical patterns, it might be res.data or res.data.addresses
            setAddresses(res.data.addresses || res.data || []);
        } catch (error) {
            // toast.error("Failed to load addresses");
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleEdit = (address) => {
        setSelectedAddress(address);
        setView("edit");
    };

    const handleDelete = async (id) => {
        try {
            await userApi.deleteAddress(id);
            toast.success("Address deleted successfully");
            fetchAddresses();
        } catch (error) {
            toast.error("Failed to delete address");
        }
    };

    const handleSave = async (formData) => {
        try {
            if (view === "edit" && selectedAddress) {
                await userApi.updateAddress(selectedAddress._id, formData);
                toast.success("Address updated successfully");
            } else {
                await userApi.addAddress(formData);
                toast.success("Address added successfully");
            }
            setView("list");
            setSelectedAddress(null);
            fetchAddresses();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save address");
        }
    };

    const handleCancel = () => {
        setView("list");
        setSelectedAddress(null);
    };

    if (view === "add" || view === "edit") {
        return (
            <AddressUpdate
                initialData={selectedAddress}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">My Addresses</h2>
                <button
                    onClick={() => setView("add")}
                    className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition shadow-sm text-sm"
                >
                    <FaPlus /> Add New Address
                </button>
            </div>

            {loading ? (
                <p>Loading addresses...</p>
            ) : addresses.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                    <p>No addresses found.</p>
                    <button onClick={() => setView("add")} className="text-indigo-500 underline mt-2">Add one now</button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {addresses.map((addr) => (
                        <div
                            key={addr._id}
                            className="border border-gray-200 p-4 rounded-lg bg-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${addr.label === 'Home' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {addr.label}
                                    </span>
                                    <span className="font-semibold text-gray-800">{addr.fullName}</span>
                                </div>
                                <p className="text-sm text-gray-600">{addr.street}</p>
                                <p className="text-sm text-gray-600">
                                    {addr.city}, {addr.postalCode}, {addr.country}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>
                            </div>

                            <div className="flex gap-2 mt-4 md:mt-0">
                                <button
                                    onClick={() => handleEdit(addr)}
                                    className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition"
                                    title="Edit"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(addr._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserAddress;