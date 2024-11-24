import React, { useContext } from "react";
import Context from "../context/Context";
import { Wrapper } from "../Components";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";

function ProfileDetails() {
	const { user, islogin, role, selectedColor } = useContext(Context);
	// console.log(user);
	const navigate = useNavigate();
	if (islogin) {
		if (role === "user") {
			return (
				<Wrapper>
					<div className="flex flex-col justify-center items-center bg-gray-200 mt-8 py-7 px-[4vh] drop-shadow-xl rounded-md">
						<div className="flex justify-between items-center  w-full mb-10">
							<div>
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

							<div className="font-bold text-lg font-montserrat">User Details</div>
						</div>
						<div className="flex flex-col items-center w-full gap-4">
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Name: {user?.fullName}
							</div>
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Email: {user?.email}
							</div>
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Username: {user?.username}
							</div>
						</div>
					</div>
				</Wrapper>
			);
		} else if (role === "facility") {
			return (
				<Wrapper>
					<div className="flex flex-col justify-center items-center bg-gray-200 mt-8 py-7 px-[4vh] drop-shadow-xl rounded-md">
						<div className="flex justify-between items-center  w-full mb-10">
							<div>
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

							<div className="font-bold text-lg font-montserrat">User Details</div>
						</div>
						<div className="flex flex-col items-center w-full gap-4">
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Facility Name: {user?.facilityName}
							</div>
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Email: {user?.email}
							</div>

							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								State: {user?.state}
							</div>
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								City: {user?.city}
							</div>
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Location: {user?.addressLine1}, {user?.addressLine2}, {user?.pincode}
							</div>
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Contact No. : {user?.contactNo}
							</div>
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Waste Types : {user?.wasteTypes.join(", ")}
							</div>
							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Working days : {user?.workingDays.join(", ")}
							</div>

							<div
								className="w-[50vw] text-center py-2 font-semibold rounded-xl"
								style={{ backgroundColor: selectedColor.color, color: selectedColor.fgColor }}
							>
								Pickup Availability : {user?.pickupAvailability ? "Available" : "Not Available"}
							</div>
						</div>
					</div>
				</Wrapper>
			);
		}
	} else {
		navigate("/login");
	}
}

export default ProfileDetails;
