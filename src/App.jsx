import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./Components";
import { Homepage, SearchMap, Login } from "./Pages";
import State from "./context/State";
import LoginComp from "./Pages/LoginComp";
import RegisterComp from "./Components/RegisterComp";
import Profile from "./Pages/Profile";
import ProfileDetails from "./Pages/ProfileDetails";
import EditProfile from "./Pages/EditProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import ChangePassword from "./Pages/ChangePassword";

const App = () => {
	return (
		<div>
			<State>
				<Router>
					<Navbar />
					<Routes>
						<Route exact path="/" element={<Homepage />} />
						<Route exact path="/search" element={<SearchMap />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<Login />} />
						<Route exact path="/main-login" element={<LoginComp />} />
						<Route exact path="/main-register" element={<RegisterComp />} />
						<Route exact path="/profile" element={<Profile />} />
						<Route exact path="/profile-details" element={<ProfileDetails />} />
						<Route exact path="/edit-profile" element={<EditProfile />} />
						<Route exact path="/change-password" element={<ChangePassword />} />
					</Routes>
					<Footer />
				</Router>
			</State>
		</div>
	);
};

export default App;
