import React from "react";
import Wrapper from "./Wrapper";
import Logo from "../assets/disposeit.png";
import gsap from "gsap";
import { useState } from "react";
import { useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import { BiCoinStack } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { useEffect } from "react";
import Avatar from "react-avatar";

const Navbar = () => {
	const { setislogin, Location, user, islogin, setUser, role } = useContext(Context);
	// console.log(islogin);
	const navigate = useNavigate();
	const LogOut = async () => {
		try {
			const endpoint = role === "user" ? "http://localhost:8000/api/v1/users/logout" : "http://localhost:8000/api/v1/facility/logout";
			const res = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			console.log(res);
			if (res.ok) {
				setislogin(false);
				setUser(null);
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
			alert("Internal server error");
		}
	};
	console.log(islogin);
	return (
		<div className="shadow-3xl ">
			<Wrapper>
				<div className="justify-between items-center flex h-[15vh]">
					{/* Logo */}
					<div className="flex gap-2 cursor-pointer" onClick={() => navigate("/")}>
						<img src={Logo} alt="logo" className="h-[30vh]" />
					</div>

					{/* <div className='absolute bg-red-400 w-fit'></div> */}

					{/* Desktop Menu */}
					<div className="md:flex hidden relative justify-between items-center gap-[10vh]">
						<nav>
							<ul className="hidden md:flex gap-10 justify-center items-center ">
								<li
									className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
									onClick={() => navigate("/")}
								>
									<a>Home</a>
								</li>
								<li
									className="font-semibold font-montserrat  hover:text-[#01796f] cursor-pointer nav"
									onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
								>
									<a>About</a>
								</li>
								<li
									className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
									onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
								>
									<a>Education</a>
								</li>
								<li
									className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
									onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
								>
									<a>Contact</a>
								</li>
							</ul>
						</nav>
					</div>
					<div className="md:flex hidden gap-[5vh] items-center">
						{!Location ? (
							<h1 className=" font-montserrat font-bold text-red-400 flex items-center gap-[1vh]">
								<i class="fi fi-rr-marker"></i>Location
							</h1>
						) : (
							<h1 className=" font-montserrat font-bold text-red-400 flex items-center gap-[1vh]">
								<i class="fi fi-rr-marker"></i>
								{Location}
							</h1>
						)}

						{!user ? (
							<div className="md:flex hidden gap-[5vh]">
								<button
									className="shadow-3xl font-medium border-2 font-poppins px-4 py-2 bg-[#88e065] rounded-md hover:bg-[#57b332]  transition-transform nav"
									onClick={() => {
										setislogin(true);
										navigate("/login");
									}}
								>
									Login
								</button>
							</div>
						) : (
							<div className="md:flex hidden gap-[2vh]">
								<button
									className="shadow-5xl font-medium font-poppins hover:text-[#01796f] transition-transform nav"
									onClick={() => {
										navigate("/cart");
									}}
								>
									<i class="fi fi-rr-shopping-cart"></i>
								</button>
								<button
									className="   transition-transform nav rounded-full "
									onClick={() => {
										navigate("/profile");
										console.log(user);
									}}
								>
									<Avatar
										name={user?.fullName || user?.facilityName}
										size="50px"
										maxInitials={2}
										style={{ borderRadius: "50%" }}
									/>
								</button>
								<div className="md:flex hidden gap-[5vh]">
									<button
										className="shadow-3xl font-medium border-2 font-poppins px-4 py-2 bg-[#88e065] rounded-md hover:bg-[#57b332]  transition-transform nav"
										onClick={() => {
											LogOut();
										}}
									>
										Logout
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</Wrapper>
		</div>
	);
};

export default Navbar;
