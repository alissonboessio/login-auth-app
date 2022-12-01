import React, { useContext } from "react";

import "./homePage.css";

import { AuthContext } from "../../contexts/auth";

const HomePage = () => {
	const { authenticated, logout, dash } = useContext(AuthContext);
	const handleLogout = (e) => {
		e.preventDefault();
		logout();
	};

	const handleDash = (e) => {
		e.preventDefault();
		dash();
	};

	return (
		<div className="home">
			<h1 className="title">Home</h1>
			{/*{String("Autenticado: " + authenticated)}*/}
			<div className="form">
				<div className="actions">
					<button id="btnDash" onClick={handleDash}>
						Dashboard
					</button>

					<button id="btnLogOff" onClick={handleLogout}>
						Logoff
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
