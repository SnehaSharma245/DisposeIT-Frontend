import React, { useState, useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import { toastFailure, toastSuccess } from "../utils/Toasters";
import { FcGoogle } from "react-icons/fc";
import UserRegistration from "./UserRegistration";
import FacilityRegistration from "./FacilityRegistration";
function RegisterComp() {
	const { islogin, setislogin, setIsUserRegister, setIsFacilityRegister, isFacilityRegister, isUserRegister, isLoading, setisLoading } =
		useContext(Context);

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		fullName: "",
		facilityName: "",
		state: "",
		city: "",
		pincode: "",
		contactNo: "",
		addressLine1: "",
		addressLine2: "",
		pickupAvailability: false,
		openingHours: "",
		closingHours: "",
		workingDays: [],
		wasteTypes: [],
	});

	const navigate = useNavigate();

	// Handle form input changes
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.type == "checkbox" ? e.target.checked : e.target.value, // Dynamically update the field
		});
	};

	const handleWasteTypeChange = (selectedWasteTypes) => {
		setFormData({ ...formData, wasteTypes: selectedWasteTypes });
	};

	const handleWorkingDaysChange = (selectedWorkingDays) => {
		setFormData({ ...formData, workingDays: selectedWorkingDays });
	};
	const RegisterUser = async () => {
		try {
			setisLoading(true);
			const res = await fetch("http://localhost:8000/api/v1/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: formData.username,
					email: formData.email,
					password: formData.password,
					fullName: formData.fullName,
				}),
			});
			console.log(formData);
			const data = await res.json();
			console.log(data);
			setisLoading(false);
			if (data?.message === "User registered successfully") {
				toastSuccess(data?.message);
				setIsUserRegister(true);
				setislogin(true);
				navigate("/login");
			} else {
				toastFailure(data?.message);
			}
		} catch (error) {
			setisLoading(false);

			toastFailure(error.message);
		}
	};

	const RegisterFacility = async () => {
		try {
			setisLoading(true);
			const { username, fullName, ...facilityData } = formData;
			console.log(formData);
			const res = await fetch("http://localhost:8000/api/v1/facility/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(facilityData),
			});

			const data = await res.json();
			console.log(data);
			setisLoading(false);
			if (data?.message === "Facility created successfully") {
				toastSuccess(data?.message);
				setIsFacilityRegister(true);
				navigate("/login");
			} else {
				toastFailure(data?.message);
			}
		} catch (error) {
			setisLoading(false);
			toastFailure(error.message);
		}
	};

	return (
		<Wrapper>
			{isUserRegister ? (
				<UserRegistration formData={formData} handleChange={handleChange} RegisterUser={RegisterUser} navigate={navigate} />
			) : isFacilityRegister ? (
				<FacilityRegistration
					formData={formData}
					handleChange={handleChange}
					handleWasteTypeChange={handleWasteTypeChange}
					RegisterFacility={RegisterFacility}
					handleWorkingDaysChange={handleWorkingDaysChange}
					navigate={navigate}
					setFormData={setFormData}
				/>
			) : null}
		</Wrapper>
	);
}

export default RegisterComp;
