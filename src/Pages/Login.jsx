import React from "react";
import poster from "../assets/Login_page/postergif.gif";
import posterlight from "../assets/Login_page/posterlightgif.gif";
import { useContext } from "react";
import gsap from "gsap";
import Context from "../context/Context";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Wrapper, Loading } from "../Components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { toastFailure, toastSuccess } from "../utils/Toasters";
import { set } from "mongoose";
import { toastFailure } from "../utils/Toasters";

const Login = () => {
	const {
		islogin,
		setislogin,
		setUser,
		user,
		setRole,
		role,
		setIsUserRegister,
		setIsFacilityRegister,
		isFacilityRegister,
		isUserRegister,
		isLoading,
	} = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const navigate = useNavigate();
	const [loading, setloading] = useState(false);
	const [showLoginComp, setShowLoginComp] = useState(false);

	useEffect(() => {
		gsap.fromTo(".auth", { x: 400, opacity: 0 }, { x: 0, opacity: 100, duration: 2, ease: "power3.out", stagger: 0.25 });
	}, [islogin]);

	useEffect(() => {
		// Redirect if the user is already logged in
		if (user) {
			navigate("/", { replace: true }); // Redirect to home page or dashboard
		}
	}, [user, navigate]);
	return (
		<Wrapper>
			{isLoading && <Loading />}
			<div className="flex py-4 md:px-[8vw] justify-center ">
				<div className="w-[80vw] h-[85vh]  z-10 md:flex hidden">
					<img src={posterlight} alt="" className=" object-cover  " />
				</div>

				{/* Login Cred */}
				{islogin ? (
					<div className="auth w-full h-fit flex flex-col items-center shadow-3xl p-[5vh]  rounded-xl">
						<div>
							<h1 className="mt-[5vh] font-montserrat font-bold text-3xl ">Welcome back!</h1>
							<p className=" font-montserrat font-light text-center">Please choose your role</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[3vh]">
							<button
								className="text-md font-poppins font-medium shadow-xl p-4 rounded-xl bg-[#238d841f] hover:bg-[#01796f] hover:scale-105 transition-transform duration-300 ease-in-out"
								onClick={() => {
									setRole("user");
									navigate("/main-login");
								}}
							>
								User
							</button>
							<button
								className="text-md font-poppins font-medium shadow-xl p-4 rounded-xl bg-[#238d841f] hover:bg-red-400 hover:scale-105 transition-transform duration-300 ease-in-out"
								onClick={() => {
									setRole("facility");
									navigate("/main-login");
								}}
							>
								Facility
							</button>
						</div>

						<div className="w-full mt-[2vh]  flex flex-col gap-4  ">
							{/* <button className=" font-montserrat font-medium text-gray-600  hover:text-[#01796f]   hover:scale-105 transition-transform">
								Forgot Password?
							</button> */}
							<button
								className=" font-montserrat font-medium text-gray-600  hover:text-[#01796f] hover:scale-105 transition-transform"
								onClick={() => {
									setislogin(false);
								}}
							>
								Not a User? Register
							</button>
						</div>
					</div>
				) : (
					// Register

					<div className="auth w-full h-fit flex flex-col items-center shadow-3xl p-[5vh]  rounded-xl">
						<div>
							<h1 className="mt-[5vh] text-center font-montserrat font-bold text-3xl ">Register with Dispose.IT</h1>
							<p className=" font-montserrat font-light text-center">Please choose your role</p>
						</div>

						<div className="flex flex-col gap-[2vh] w-full md:px-[20vh] px-[5vh] mt-[8vh]">
							<button
								className="text-md w-full font-poppins font-medium  shadow-3xl p-3 rounded-xl hover:bg-[#01796f] hover:scale-105 transition-transform"
								onClick={() => {
									setIsUserRegister(true);
									setIsFacilityRegister(false);
									navigate("/main-register");
								}}
							>
								User
							</button>
							<button
								className="text-md flex items-center justify-center gap-[2vh] w-full font-poppins font-medium  shadow-3xl p-3 rounded-xl hover:bg-red-400 hover:scale-105 transition-transform"
								onClick={() => {
									setIsFacilityRegister(true);
									setIsUserRegister(false);
									navigate("/main-register");
								}}
							>
								Facility
							</button>
							<button
								className=" font-montserrat font-medium text-gray-600  hover:text-[#01796f] hover:scale-105 transition-transform"
								onClick={() => {
									setislogin(true);
									navigate("/login");
								}}
							>
								Already a User?
							</button>
						</div>
					</div>
				)}
			</div>
		</Wrapper>
	);
};

export default Login;
