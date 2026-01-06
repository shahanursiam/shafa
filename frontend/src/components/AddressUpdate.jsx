import React, { useState, useEffect } from "react";

const AddressUpdate = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        label: "Home",
        fullName: "",
        phone: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">
                {initialData ? "Edit Address" : "Add New Address"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full">
                        <label className="font-medium mb-1">Label</label>
                        <select
                            className="input border border-gray-300 rounded p-2 outline-none"
                            name="label"
                            value={formData.label}
                            onChange={handleChange}
                        >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="font-medium mb-1">Full Name</label>
                        <input
                            required
                            className="input border border-gray-300 rounded p-2 outline-none"
                            type="text"
                            name="fullName"
                            placeholder="e.g. Siam"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full">
                        <label className="font-medium mb-1">Phone Number</label>
                        <input
                            required
                            className="input border border-gray-300 rounded p-2 outline-none"
                            type="text"
                            name="phone"
                            placeholder="e.g. 01612345678"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="font-medium mb-1">Street Address</label>
                        <input
                            required
                            className="input border border-gray-300 rounded p-2 outline-none"
                            type="text"
                            name="street"
                            placeholder="e.g. 123 uttara"
                            value={formData.street}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full">
                        <label className="font-medium mb-1">City</label>
                        <input
                            required
                            className="input border border-gray-300 rounded p-2 outline-none"
                            type="text"
                            name="city"
                            placeholder="e.g. Dhaka"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="font-medium mb-1">Postal Code</label>
                        <input
                            required
                            className="input border border-gray-300 rounded p-2 outline-none"
                            type="text"
                            name="postalCode"
                            placeholder="e.g. 10001"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label className="font-medium mb-1">Country</label>
                    <input
                        required
                        className="input border border-gray-300 rounded p-2 outline-none"
                        type="text"
                        name="country"
                        placeholder="e.g. USA"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white px-6 py-2 rounded shadow hover:bg-indigo-600 transition"
                    >
                        Save Address
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded shadow hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddressUpdate;