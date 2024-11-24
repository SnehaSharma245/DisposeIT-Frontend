import React, { useState } from "react";
import Context from "../context/Context";
import { useContext } from "react";
import { toastFailure, toastSuccess } from "../utils/Toasters";
function ChangePassword() {
	const { selectedColor, setisLoading, role } = useContext(Context);
	const [passwordFields, setPasswordFields] = useState({
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		// console.log(name);
		setPasswordFields({ ...passwordFields, [name]: value });
	};
	const handleSubmit = async () => {
		try {
			setisLoading(true);
			// console.log(passwordFields);
			const endpoint =
				role === "user" ? "http://localhost:8000/api/v1/users/change-password" : "http://localhost:8000/api/v1/facility/change-password";
			const res = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(passwordFields),
				credentials: "include",
			});
			// console.log(res);
			const data = await res.json();
			// console.log(data);
			setisLoading(false);
			if (data?.message === "Password changed successfully") {
				toastSuccess(data?.message);
			}
		} catch (error) {
			// console.log(error);
			toastFailure(error.message);
		}
	};
	return (
		<div className="flex justify-center min-h-screen">
			<div className="auth w-[70vw] h-fit flex flex-col items-center shadow-3xl p-[5vh] rounded-3xl mt-[2vh]">
				<div>
					<h1 className="text-3xl text-center font-montserrat font-bold mt-[5vh]">Change Password</h1>
				</div>

				<div className="flex flex-col items-center mt-[5vh] gap-[4vh] w-full">
					{/* Old Password */}
					<input
						type="password"
						className="border-b-2 w-full dynamic-placeholder text-2xl rounded-xl py-4 px-4 drop-shadow-xl"
						placeholder="Old Password"
						onChange={handleChange}
						style={{
							color: selectedColor.fgColor,
							backgroundColor: selectedColor.color,
							// caretColor: selectedColor.fgColor,
							"--placeholder-color": selectedColor.fgColor, // Pass placeholder color
						}}
						name="oldPassword"
						id="oldPassword"
					/>
					<input
						type="password"
						className="border-b-2 w-full dynamic-placeholder text-2xl rounded-xl py-4 px-4 drop-shadow-xl"
						placeholder="New Password"
						onChange={handleChange}
						name="newPassword"
						style={{
							color: selectedColor.fgColor,
							backgroundColor: selectedColor.color,
							// caretColor: selectedColor.fgColor,
							"--placeholder-color": selectedColor.fgColor, // Pass placeholder color
						}}
						id="newPassword"
					/>
					<input
						type="password"
						id="confirmNewPassword"
						className="border-b-2 w-full dynamic-placeholder text-2xl rounded-xl py-4 px-4 drop-shadow-xl"
						placeholder="Confirm Password"
						onChange={handleChange}
						style={{
							color: selectedColor.fgColor,
							backgroundColor: selectedColor.color,
							// caretColor: selectedColor.fgColor,
							"--placeholder-color": selectedColor.fgColor, // Pass placeholder color
						}}
						name="confirmNewPassword"
					/>
					<button
						className="mt-6 py-2 px-8 transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-xl font-bold font-montserrat text-xl "
						style={{
							backgroundColor: selectedColor.color,
							color: selectedColor.fgColor,
						}}
						onClick={handleSubmit}
					>
						Change Password
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChangePassword;
