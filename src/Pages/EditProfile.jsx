import React, { useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import EditUser from "./EditUser.jsx";
import EditFacility from "./EditFacility.jsx";

function EditProfile() {
	const { role, islogin } = useContext(Context);
	const navigate = useNavigate();
	// console.log(role);
	if (islogin) {
		if (role === "user") {
			return <EditUser />;
		} else if (role === "facility") {
			return <EditFacility />;
		}
	} else {
		navigate("/login");
	}
}

export default EditProfile;
