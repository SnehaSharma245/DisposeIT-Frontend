import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import { toastFailure, toastSuccess } from "../utils/Toasters";
function EditUser() {
	const { setisLoading, setUser, user, formData, setFormData } = useContext(Context);
	const navigate = useNavigate();
	const handleChange = (e) => {
		const value = e.target.value;
		if (value !== "" && value !== formData[e.target.name]) {
			setFormData({ ...formData, [e.target.name]: value });
		}
	};
	const updateUser = async () => {
		try {
			setisLoading(true);
			// const { userUpdatedData } = formData
			// console.log(formData);
			const res = await fetch("http://localhost:8000/api/v1/users/update-account", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			});
			const data = await res.json();
			// setUser(data?.data);
			setisLoading(false);
			if (data?.message === "Account details updated successfully") {
				toastSuccess(data?.message);
				setUser(data?.data);
				navigate("/profile-details");
			} else {
				toastFailure(data?.message);
			}
		} catch (error) {
			toastFailure(error.message);
		}
	};
	return (
		<div className="flex justify-center min-h-screen">
			<div className="auth w-[95vw] h-fit flex flex-col items-center shadow-3xl p-[5vh] rounded-xl mt-[2vh]  ">
				<div>
					<h1 className="mt-[5vh] text-center font-montserrat font-bold text-3xl"> Edit Details</h1>
				</div>
				<div className="flex flex-col items-center mt-[5vh] gap-[1vh] md:w-fit w-full">
					{/* Email Field */}
					<div className="md:w-[60vw] w-full flex flex-col gap-4 mt-2">
						<input
							type="email"
							id="email"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat text-center"
							placeholder={`Email: ${user?.email}`}
							name="email"
						/>
					</div>
					{/* Username Field */}
					<div className="md:w-[60vw] w-full flex flex-col gap-4 mt-2">
						<input
							type="text"
							id="username"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat text-center"
							placeholder={`Username: ${user?.username}`}
							name="username"
						/>
					</div>
					{/* FullName Field */}
					<div className="md:w-[60vw] w-full flex flex-col gap-4 mt-2">
						<input
							type="text"
							id="fullName"
							onChange={handleChange}
							className="border-b-2 w-full py-2 px-3 mt-1 font-montserrat text-center"
							placeholder={`Full Name: ${user?.fullName}`}
							name="fullName"
						/>
					</div>
					<button
						onClick={updateUser}
						className="mt-6 py-2 px-8 text-white font-semibold rounded-xl bg-[#f7bf12] hover:drop-shadow-lg w-full md:w-[60vh]"
					>
						Update User Details
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditUser;
