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
	const { islogin, setislogin, setUser } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const navigate = useNavigate();
	const [loading, setloading] = useState(false);

	useEffect(() => {
		gsap.fromTo(".auth", { x: 400, opacity: 0 }, { x: 0, opacity: 100, duration: 2, ease: "power3.out", stagger: 0.25 });
	}, [islogin]);

	const login = async () => {
		if (email === "" || password === "") {
			alert("Please fill all the fields");
		} else {
			try {
				setloading(true);
				const res = await fetch("http://localhost:8000/api/v1/users/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({ password: password, email: email }),
				});

				const data = await res.json();
				console.log(data);
				setloading(false);
				if (data?.message === "User logged in successfully") {
					console.log(data);
					setUser(data?.data?.user);
					// localStorage.setItem("user", data?.data?.user?._id);
					navigate("/");
					setislogin(true);
				} else {
					alert("Invalid Credentials");
				}
			} catch (error) {
				console.log(error);
				alert("Internal Server Error");
			}
		}
	};

	const Register = async () => {
		if (email === "" || password === "" || username === "" || fullName === "") {
			alert("Please fill all the fields");
		} else {
			try {
				setloading(true);
				const res = await fetch("http://localhost:8000/api/v1/users/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username: username, email: email, password: password, fullName: fullName }),
				});

				const data = await res.json();
				setloading(false);
				// console.log(data);
				if (data?.message == "User registered succesfully") {
					toastSuccess(data.message);
					navigate("/login");
				} else {
					toastFailure(data.message);
				}
			} catch (error) {
				setloading(false);
				toastFailure("Username or email already exists");
			}
		}
	};

	return (
		<Wrapper>
			{loading && <Loading />}
			<div className="flex py-4 md:px-[8vw] justify-center ">
				<div className="w-[80vw] h-[85vh]  z-10 md:flex hidden">
					<img src={posterlight} alt="" className=" object-cover  " />
				</div>

				{/* Login Cred */}
				{islogin ? (
					<div className="auth w-full h-fit flex flex-col items-center shadow-3xl p-[5vh]  rounded-xl">
						<div>
							<h1 className="mt-[5vh] font-montserrat font-bold text-3xl ">Welcome back!</h1>
							<p className=" font-montserrat font-light text-center">Please enter your details</p>
						</div>

						<div className="flex flex-col items-center mt-[8vh] gap-[2vh] md:w-fit  w-full ">
							<div className=" border-b-2 md:w-[60vh]  flex w-[45vh]">
								<input
									type="email"
									className=" mt-2 w-full rounded-lg py-4 font-montserrat  font-medium  md:w-[60vh]"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									placeholder="Email"
								/>
							</div>
							<div className=" border-b-2 md:w-[60vh] flex w-[45vh]">
								<input
									type="password"
									className=" mt-2 w-full rounded-lg  py-4 font-montserrat  font-medium md:w-[60vh]"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									placeholder="Password"
								/>
							</div>
							<div className="w-full mt-[1vh] justify-between flex">
								<button className=" font-montserrat font-medium text-gray-600  hover:text-[#01796f] hover:scale-105 transition-transform">
									Forgot Password?
								</button>
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

						<div className="flex flex-col gap-[2vh] w-full md:px-[20vh] px-[5vh] mt-[8vh]">
							<button
								className="text-md w-full font-poppins font-medium  shadow-3xl p-3 rounded-xl hover:bg-[#01796f] hover:scale-105 transition-transform"
								onClick={() => login()}
							>
								Log in
							</button>
							<button className="text-md flex items-center justify-center gap-[2vh] w-full font-poppins font-medium  shadow-3xl p-3 rounded-xl hover:bg-red-400 hover:scale-105 transition-transform">
								<FcGoogle /> Log in with Google
							</button>
						</div>
					</div>
				) : (
					// Register

					<div className="auth w-full h-fit flex flex-col items-center shadow-3xl p-[5vh]  rounded-xl">
						<div>
							<h1 className="mt-[5vh] text-center font-montserrat font-bold text-3xl ">Register with Echakran</h1>
							<p className=" font-montserrat font-light text-center">Please fill your details to register</p>
						</div>

						<div className="flex flex-col items-center mt-[8vh] gap-[2vh] md:w-fit  w-full ">
							<div className=" border-b-2 md:w-[60vh]  flex w-[45vh]">
								<input
									type="text"
									className=" mt-2 w-full rounded-lg py-4 font-montserrat  font-medium  md:w-[60vh]"
									onChange={(e) => {
										setUsername(e.target.value);
									}}
									placeholder="Username"
								/>
							</div>
							<div className=" border-b-2 md:w-[60vh]  flex w-[45vh]">
								<input
									type="email"
									className=" mt-2 w-full rounded-lg py-4 font-montserrat  font-medium  md:w-[60vh]"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									placeholder="Email"
								/>
							</div>
							<div className=" border-b-2 md:w-[60vh]  flex w-[45vh]">
								<input
									type="text"
									className=" mt-2 w-full rounded-lg py-4 font-montserrat  font-medium  md:w-[60vh]"
									onChange={(e) => {
										setFullName(e.target.value);
									}}
									placeholder="FullName"
								/>
							</div>
							<div className=" border-b-2 md:w-[60vh] flex w-[45vh]">
								<input
									type="password"
									className=" mt-2 w-full rounded-lg  py-4 font-montserrat  font-medium md:w-[60vh]"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									placeholder="Password"
								/>
							</div>
							<div className="w-full mt-[1vh]">
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

						<div className="flex flex-col gap-[2vh] w-full md:px-[20vh] px-[5vh] mt-[8vh]">
							<button
								className="text-md w-full font-poppins font-medium  shadow-3xl p-3 rounded-xl hover:bg-[#01796f] hover:scale-105 transition-transform"
								onClick={() => Register()}
							>
								Sign up
							</button>
							<button className="text-md flex items-center justify-center gap-[2vh] w-full font-poppins font-medium  shadow-3xl p-3 rounded-xl hover:bg-red-400 hover:scale-105 transition-transform">
								<FcGoogle /> Log in with Google
							</button>
						</div>
					</div>
				)}
			</div>
		</Wrapper>
	);
};

export default Login;
