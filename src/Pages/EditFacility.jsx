import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Navigate } from "react-router-dom";
import Context from "../context/Context";

import { toastFailure, toastSuccess } from "../utils/Toasters";
function EditFacility() {
	const { setisLoading, setUser, user, formData, setFormData } = useContext(Context);
	const wasteTypeOptions = [
		{ value: "Consumer Electronics", label: "Consumer Electronics" },
		{ value: "Household Electronics", label: "Household Electronics" },
		{ value: "IT & Telecommunications Equipment", label: "IT & Telecommunications Equipment" },
		{ value: "Lightning", label: "Lighting" },
		{ value: "Batteries", label: "Batteries" },
		{ value: "Cables and Accessories", label: "Cables and Accessories" },
		{ value: "Medical Equipment", label: "Medical Equipment" },
		{ value: "Renewable Energy Equipment", label: "Renewable Energy Equipment" },
		{ value: "Industrial Equipment", label: "Industrial Equipment" },
	];

	const workingDayOptions = [
		{ value: "Monday", label: "Monday" },
		{ value: "Tuesday", label: "Tuesday" },
		{ value: "Wednesday", label: "Wednesday" },
		{ value: "Thursday", label: "Thursday" },
		{ value: "Friday", label: "Friday" },
		{ value: "Saturday", label: "Saturday" },
		{ value: "Sunday", label: "Sunday" },
	];

	const navigate = useNavigate();

	// Handle form input changes
	const handleChange = (e) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

		if (value !== "" && value !== formData[e.target.name]) {
			setFormData({
				...formData,
				[e.target.name]: value,
			});
		}
	};

	const handleWasteTypeChange = (selectedWasteTypes) => {
		if (selectedWasteTypes.length > 0) {
			setFormData({ ...formData, wasteTypes: selectedWasteTypes });
		}
	};

	const handleWorkingDaysChange = (selectedWorkingDays) => {
		if (selectedWorkingDays.length > 0) {
			setFormData({ ...formData, workingDays: selectedWorkingDays });
		}
	};
	const updateFacility = async () => {
		try {
			setisLoading(true);
			const { username, fullName, ...facilityUpdatedData } = formData;
			// console.log(formData);
			const res = await fetch("http://localhost:8000/api/v1/facility/update-account", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(facilityUpdatedData),
				credentials: "include",
			});
			// console.log(res);
			const data = await res.json();
			// console.log(data);
			setisLoading(false);
			// Update the `user` state with the updated fields

			if (data?.message === "Facility details updated successfully") {
				setUser(data?.data);
				toastSuccess(data?.message);
				navigate("/profile-details");
			} else {
				toastFailure(data?.message);
			}
		} catch (error) {
			setisLoading(false);
			toastFailure(error.message);
		}
	};
	return (
		<div className="flex justify-center min-h-screen">
			{/* {console.log(user)} */}
			<div className="auth w-[95vw] h-fit flex flex-col items-center shadow-3xl p-[5vh] rounded-xl mt-[2vh]  ">
				<div>
					<h1 className="mt-[5vh] text-center font-montserrat font-bold text-3xl">Edit Details</h1>
				</div>

				<div className="flex flex-col items-center mt-[5vh] gap-[1vh] md:w-fit w-full">
					{/* Email Field */}
					<div className="md:w-[60vh] w-full flex flex-col gap-4 mt-2">
						<input
							type="email"
							id="email"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat"
							placeholder={`Email: ${user?.email}`}
							name="email"
						/>
					</div>

					{/* Center Name Field */}
					<div className="md:w-[60vh] w-full flex flex-col gap-4 mt-2">
						<input
							type="text"
							id="facilityName"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat"
							placeholder={`Facility Name: ${user?.facilityName}`}
							name="facilityName"
						/>
					</div>

					{/* State Field */}
					<div className="md:w-[60vh] w-full flex flex-col gap-4 mt-2">
						<input
							type="text"
							id="state"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat"
							placeholder={`State: ${user?.state}`}
							name="state"
						/>
					</div>

					{/* City Field */}
					<div className="md:w-[60vh] w-full flex flex-col gap-4 mt-2">
						<input
							type="text"
							id="city"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat"
							placeholder={`City: ${user?.state}`}
							name="city"
						/>
					</div>

					{/* Pincode Field */}
					<div className="md:w-[60vh] w-full flex flex-col gap-4 mt-2">
						<input
							type="text"
							id="pincode"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat"
							name="pincode"
							placeholder={`Pincode: ${user?.pincode}`}
						/>
					</div>

					{/* Address Line 1 Field */}
					<div className="md:w-[60vh] w-full flex flex-col gap-4 mt-2">
						<input
							type="text"
							id="addressLine1"
							onChange={handleChange}
							name="addressLine1"
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat"
							placeholder={`Address Line 1: ${user?.addressLine1}`}
						/>
					</div>

					{/* Address Line 2 Field */}
					<div className="md:w-[60vh] w-full flex flex-col gap-4 mt-2">
						<input
							type="text"
							id="addressLine2"
							name="addressLine2"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat"
							placeholder={`Address Line 2: ${user?.addressLine2}`}
						/>
					</div>

					{/* Contact No Field */}
					<div className="md:w-[60vh] w-full flex flex-col gap-4 mt-2">
						<input
							type="text"
							id="contactNo"
							name="contactNo"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat"
							placeholder={`Contact No.: ${user?.contactNo}`}
						/>
					</div>

					{/* Opening and Closing Hours */}
					<div className="md:w-[60vh] w-full flex flex-col gap-2 mt-2">
						<div className="flex items-center gap-2 py-2 border-b-2">
							<label htmlFor="openingHours" className="font-montserrat font-medium text-[#9f9f9f] cursor-pointer">
								Opening Hours
							</label>
							<input
								type="time"
								name="openingHours"
								id="openingHours"
								onChange={handleChange}
								className=" w-full py-2 px-3 mt-1 font-montserrat"
							/>
						</div>

						<div className="flex items-center gap-2 py-2 border-b-2">
							<label htmlFor="closingHours" className="font-montserrat font-medium text-[#9f9f9f] cursor-pointer">
								Closing Hours
							</label>
							<input
								type="time"
								id="closingHours"
								name="closingHours"
								onChange={handleChange}
								className=" w-full py-2 px-3 mt-1 font-montserrat"
							/>
						</div>
					</div>

					{/* Pickup Availability Checkbox */}
					<div className="border-b-2 md:w-[60vh] flex items-center gap-4 py-4 mt-2 w-full">
						<input type="checkbox" onChange={handleChange} name="pickupAvailability" className="accent-[#10ca5e] w-4 h-4" />
						<label htmlFor="pickupAvailability" className="font-montserrat font-medium text-[#9f9f9f] cursor-pointer">
							Pickup Available
						</label>
					</div>
					{/*Waste Types*/}

					<div className="md:w-[60vh] w-full flex flex-col gap-4 border-b-2 py-4 mt-2">
						<label className="font-montserrat font-medium text-[#9f9f9f] cursor-pointer">Waste Types Accepted</label>
						<Select
							isMulti
							name="wasteTypes"
							options={wasteTypeOptions}
							value={formData.wasteTypes.map((wasteType) => ({ value: wasteType, label: wasteType }))}
							onMenuOpen={() => console.log("Menu opened")}
							onChange={(selectedOptions) => {
								handleWasteTypeChange(selectedOptions.map((option) => option.value));
							}}
							className="w-full"
						/>
					</div>

					{/* Working days */}
					<div className="md:w-[60vh] w-full flex flex-col gap-4 mt-4">
						<label className="font-montserrat font-medium text-[#9f9f9f] cursor-pointer">Working Days</label>
						<Select
							isMulti
							name="workingDays"
							options={workingDayOptions}
							value={formData.workingDays.map((day) => ({
								value: day,
								label: day.charAt(0).toUpperCase() + day.slice(1),
							}))}
							onMenuOpen={() => console.log("Menu opened")}
							onChange={(selectedOptions) => {
								handleWorkingDaysChange(selectedOptions.map((option) => option.value));
							}}
							className="w-full"
						/>
					</div>

					{/* Submit Button */}
					<button
						onClick={updateFacility}
						className="mt-6 py-2 px-8 text-white font-semibold rounded-xl bg-[#f7bf12] hover:drop-shadow-lg w-full md:w-[60vh]"
					>
						Update Facility Details
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditFacility;
