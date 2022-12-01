import React, { useContext } from "react";

import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

import { AuthProvider, AuthContext } from "./contexts/auth";

const AppRoutes = () => {
	const Private = ({ children }) => {
		const { authenticated, loading } = useContext(AuthContext);

		if (loading) {
			return <div className="loading">Carregando...</div>;
		}

		if (!authenticated) {
			return <Navigate to="/login" />;
		}

		return children;
	};

	const Logged = ({ children }) => {
		const { authenticated } = useContext(AuthContext);

		if (authenticated) {
			return <Navigate to="/" />;
		}

		return children;
	};

	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route
						exact
						path="/login"
						element={
							<Logged>
								<LoginPage />
							</Logged>
						}
					/>
					<Route
						exact
						path="/"
						element={
							<Private>
								<HomePage />
							</Private>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
};

export default AppRoutes;
