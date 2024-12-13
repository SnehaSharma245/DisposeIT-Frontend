import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import { toastSuccess, toastFailure } from "../utils/Toasters"; // Import toast functions

const SchedulePickup = () => {
    const [formData, setFormData] = useState({
        ewasteType: "",
        quantity: "",
        address: "",
        contactNumber: "",
        pickupDate: "",
        pickupTime: "",
    });
    const { islogin, isUserLoggedIn } = useContext(Context);
    const navigate = useNavigate();

    const ewasteOptions = [
        "Consumer Electronics",
        "Household Electronics",
        "IT & Telecommunications Equipment",
        "Batteries",
        "Cables and Accessories",
        "Medical Equipment",
        "Industrial Equipment",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Replace with your API call logic
            console.log("Pickup Details:", formData);
            
            // Simulate API request (remove this in actual implementation)
            await new Promise((resolve) => setTimeout(resolve, 500));

            // On success
            toastSuccess("Pickup Request sent successfully");
        } catch (error) {
            // On failure
            toastFailure("Failed to schedule pickup. Please try again.");
        }
    };

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/login");
        }
    }, [isUserLoggedIn, navigate]);

    return isUserLoggedIn ? (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Schedule Pickup</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* E-Waste Type */}
                <div>
                    <label htmlFor="ewasteType" className="block text-sm font-medium text-gray-700">
                        Type of E-Waste
                    </label>
                    <select
                        id="ewasteType"
                        name="ewasteType"
                        value={formData.ewasteType}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Type</option>
                        {ewasteOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantity */}
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity (kg approx.)
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Pickup Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                {/* Contact Number */}
                <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                        Contact Number
                    </label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{10}"
                        placeholder="Enter 10-digit number"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Pickup Date */}
                <div>
                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
                        Pickup Date
                    </label>
                    <input
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Pickup Time */}
                <div>
                    <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">
                        Pickup Time
                    </label>
                    <input
                        type="time"
                        id="pickupTime"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                        Schedule Pickup
                    </button>
                </div>
            </form>
        </div>
    ) : null;
};

export default SchedulePickup;
