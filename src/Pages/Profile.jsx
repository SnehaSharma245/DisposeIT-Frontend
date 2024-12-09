import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Context from "../context/Context";
import { Wrapper } from "../Components";
import Avatar from "react-avatar";
import { toastFailure, toastSuccess } from "../utils/Toasters";

function Profile() {
	const { islogin, user, role, selectedColor, setisLoading, setUser, setislogin, setFormData, initialFormData, formData } = useContext(Context);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const handleDelete = async () => {
		try {
			setisLoading(true);
			const endpoint =
				role === "user" ? "http://localhost:8000/api/v1/users/delete-profile" : "http://localhost:8000/api/v1/facility/delete-profile";
			console.log(user);
			const res = await fetch(endpoint, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			console.log(res);
			const data = await res.json();
			console.log(data);
			setisLoading(false);
			if (data?.message === "User deleted successfully" || "Facility deleted successfully") {
				toastSuccess(data.message);
				navigate("/login");
				setUser(null);
				setislogin(false);
				// setFormData(initialFormData);
				// console.log(formData);
			} else {
				toastFailure(data?.message);
			}
		} catch (error) {
			toastFailure(error.message);
		}
	};
	// console.log(user);
	const navigate = useNavigate();
	if (islogin) {
		return (
			<Wrapper>
				<div className="flex justify-center items-center ">
					<div className="w-full max-w-4xl  p-6 mt-[8vh] drop-shadow-xl ">
						<div className="flex md:flex-row flex-col  ">
							{/* Settings Section */}
							<div className="bg-gray-50 p-4  shadow-sm border col-span-2 md:rounded-tl-lg md:rounded-bl-lg rounded-tl-lg  rounded-tr-lg md:rounded-tr-none md:rounded-br-none">
								<div className="flex flex-col gap-6 py-3 px-4 ">
									<div className="text-lg font-semibold text-gray-700  drop-shadow-md text-center">
										<Avatar
											name={user?.fullName || user?.facilityName}
											size="50px"
											maxInitials={2}
											style={{ borderRadius: "50%" }}
											round={true}
											fgColor={selectedColor.fgColor}
											color={selectedColor.color}
										/>
									</div>
									<div className="flex md:flex-col flex-row justify-evenly md:gap-4 items-center ">
										<div
											onClick={() => {
												navigate("/profile-details");
											}}
											className="hover:cursor-pointer"
										>
											View Profile
										</div>
										<div
											className="hover:cursor-pointer"
											onClick={() => {
												navigate("/edit-profile");
											}}
										>
											Edit Profile
										</div>
										{role === "user" && (
											<>
												<div className="hover:cursor-pointer">Get Pickup History</div>
												<div className="hover:cursor-pointer">Send Feedback</div>
											</>
										)}
										{role === "facility" && (
											<>
												<div className="hover:cursor-pointer" onClick={() => {
          navigate("/view-pr");  // Add this line to handle the redirection
        }}>View pickup requests</div>
												<div className="hover:cursor-pointer">View Feedback</div>
											</>
										)}
										<div
											className="hover:cursor-pointer"
											onClick={() => {
												navigate("/change-password");
											}}
										>
											Change Password
										</div>
										<div className="hover:cursor-pointer" onClick={openModal}>
											Delete Profile
										</div>
									</div>
								</div>
							</div>
							{/* User Profile Section */}
							<div
								className=" p-4 md:rounded-tr-lg md:rounded-br-lg shadow-sm border flex flex-col px-8 gap-8 justify-around min-w-[80vh] rounded-br-lg rounded-bl-lg md:rounded-tl-none md:rounded-bl-none"
								style={{ backgroundColor: selectedColor.fgColor }}
							>
								<div className="text-lg  text-gray-700  flex flex-col gap-4">
									<div
										className="flex md:flex-row flex-col gap-3 px-2 py-3 rounded-lg hover:brightness-125"
										style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
									>
										<span className="text-lg font-bold">Name:</span>
										<span className="text-lg">{user?.fullName || user?.facilityName}</span>
									</div>
									<div
										className="flex md:flex-row flex-col gap-3 rounded-lg px-2 py-3 hover:brightness-125"
										style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
									>
										<span className="text-lg font-bold">Email:</span>
										<span className="text-lg">{user?.email}</span>
									</div>
									<div
										className="flex md:flex-row flex-col gap-3 rounded-lg px-2 py-3 hover:brightness-125"
										style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
									>
										<span className="text-lg font-bold">Role:</span>
										<span className="text-lg">{role}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{isModalOpen && (
					<div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
						<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
							<h2 className="text-lg font-semibold mb-4">Are you sure you want to delete your profile?</h2>
							<div className="flex justify-around">
								<button
									onClick={() => {
										handleDelete();
										closeModal();
									}}
									className="bg-red-500 text-white px-4 py-2 rounded-md"
								>
									Yes
								</button>
								<button onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</Wrapper>
		);
	} else {
		navigate("/login");
	}
}

export default Profile;
