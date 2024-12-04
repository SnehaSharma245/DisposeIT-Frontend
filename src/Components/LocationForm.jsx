import React from "react";

function LocationForm({ address, handleAddressChange, submitLocation, closeForm }) {
	return (
		<div
			id="popupForm"
			className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50"
		>
			<h2 className="text-xl  mb-4 font-bold text-gray-800">Enter Your Location</h2>
			<input
				type="text"
				id="state"
				placeholder="State"
				value={address.state}
				onChange={handleAddressChange}
				className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
			/>
			<input
				type="text"
				id="city"
				placeholder="City"
				value={address.city}
				onChange={handleAddressChange}
				className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
			/>
			<input
				type="text"
				id="pincode"
				placeholder="Pincode"
				value={address.pincode}
				onChange={handleAddressChange}
				className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
			/>
			<input
				type="text"
				id="address1"
				placeholder="Address Line 1"
				value={address.address1}
				onChange={handleAddressChange}
				className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
			/>
			<input
				type="text"
				id="address2"
				placeholder="Address Line 2 (Optional)"
				value={address.address2}
				onChange={handleAddressChange}
				className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
			/>
			<div className="flex justify-between">
				<button
					onClick={submitLocation}
					className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
				>
					Find Recycling Centers
				</button>
				<button
					onClick={closeForm}
					className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default LocationForm;
