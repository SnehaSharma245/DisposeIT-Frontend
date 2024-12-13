import React from "react";
import { useContext, useState, useEffect } from "react";
import Context from "../context/Context";
import gsap from "gsap";
import posterlight from "../assets/Login_page/posterlightgif.gif";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import Loading from "../Components/Loading";
import { toastFailure, toastSuccess } from "../utils/Toasters";
function LoginComp() {
	const { role, setRole, user, islogin, setislogin, isLoading, setisLoading, setUser, isUserLoggedIn, setIsUserLoggedIn } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const login = async () => {
		// if (email === "" || password === "") {
		// 	toastFailure("All fields are required");
		// } else {

		try {
			setisLoading(true);
			const endpoint = role === "user" ? "http://localhost:8000/api/v1/users/login" : "http://localhost:8000/api/v1/facility/login";
			const res = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ password: password, email: email }),
			});

			const data = await res.json();
			// console.log(data);
			setisLoading(false);

			if (data?.success === true) {
				// console.log(data);
				if (data?.data?.user) setUser(data?.data?.user);
				else if (data?.data?.facility) setUser(data?.data?.facility);
				console.log(user);
				// localStorage.setItem("user", data?.data?.user?._id);
				toastSuccess("Login Successfull");
				navigate("/", { replace: true });
				setIsUserLoggedIn(true);
			} else {
				// Handle non-200 responses (e.g., 400, 401, etc.)
				// console.log(data?.message);
				toastFailure(data?.message);
			}
		} catch (error) {
			// console.log(error);
			setisLoading(false);
			toastFailure(error.message);
		}
	};

	useEffect(() => {
		gsap.fromTo(".auth", { x: 400, opacity: 0 }, { x: 0, opacity: 100, duration: 2, ease: "power3.out", stagger: 0.25 });
	}, [islogin]);
	return (
		<Wrapper>
			{isLoading && <Loading />}
			<div className="flex py-4 md:px-[8vw] justify-center ">
				<div className="w-[80vw] h-[85vh]  z-10 md:flex hidden">
					<img src={posterlight} alt="" className=" object-cover  " />
				</div>

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
									navigate("/register");
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
						
					</div>
				</div>
			</div>
		</Wrapper>
	);
}

export default LoginComp;
