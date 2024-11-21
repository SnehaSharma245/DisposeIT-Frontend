import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./Components";
import { Homepage, SearchMap, Login } from "./Pages";
import State from "./context/State";
import LoginComp from "./Pages/LoginComp";
import RegisterComp from "./Components/RegisterComp";

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
					</Routes>
					<Footer />
				</Router>
			</State>
		</div>
	);
};

export default App;
