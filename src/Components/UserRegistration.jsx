import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";
function UserRegistration({ formData, handleChange, RegisterUser, navigate }) {
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	return (
		<div className="auth w-full h-fit flex flex-col items-center shadow-3xl p-[5vh] rounded-xl">
			<div>
				<h1 className="mt-[5vh] text-center font-montserrat font-bold text-3xl">Register with Dispose.IT</h1>
				<p className="font-montserrat font-light text-center">Please fill your details to register</p>
			</div>

			<div className="flex flex-col items-center mt-[8vh] gap-[2vh] md:w-fit w-full">
				<div className="border-b-2 md:w-[60vh] flex w-[45vh]">
					<input
						type="text"
						className="mt-2 w-full rounded-lg py-4 font-montserrat font-medium md:w-[60vh]"
						onChange={handleChange}
						placeholder="Username"
						name="username"
					/>
				</div>
				<div className="border-b-2 md:w-[60vh] flex w-[45vh]">
					<input
						type="email"
						className="mt-2 w-full rounded-lg py-4 font-montserrat font-medium md:w-[60vh]"
						onChange={handleChange}
						placeholder="Email"
						name="email"
					/>
				</div>
				<div className="border-b-2 md:w-[60vh] flex w-[45vh]">
					<input
						type="text"
						className="mt-2 w-full rounded-lg py-4 font-montserrat font-medium md:w-[60vh]"
						onChange={handleChange}
						placeholder="FullName"
						name="fullName"
					/>
				</div>
				<div className="md:w-[60vh] w-full flex border-b-2  gap-4 mt-2 ">
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						onChange={handleChange}
						className=" w-full py-2 px-3 mt-1 font-montserrat"
						placeholder="Password"
						name="password"
					/>
					<button type="button" onClick={toggleShowPassword} className="mt-1 text-gray-400 hover:text-gray-700 flex items-center">
						{showPassword ? (
							<IoEyeOff className="mr-2" /> // Show eye-off icon when password is visible
						) : (
							<IoEye className="mr-2" /> // Show eye icon when password is hidden
						)}
					</button>
				</div>
				<div className="w-full mt-[1vh]">
					<button
						className="font-montserrat font-medium text-gray-600 hover:text-[#01796f] hover:scale-105 transition-transform"
						onClick={() => {
							setislogin(true);
							navigate("/login");
						}}
					>
						Already a User?
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-[2vh] w-full md:px-[20vh] px-[5vh] mt-[8vh]">
				<button
					className="text-md w-full font-poppins font-medium shadow-3xl p-3 rounded-xl hover:bg-[#01796f] hover:scale-105 transition-transform"
					onClick={RegisterUser}
				>
					Sign up
				</button>
				
			</div>
		</div>
	);
}

export default UserRegistration;
