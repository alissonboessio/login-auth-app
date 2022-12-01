import React, { useEffect, useState, createContext } from "react";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

// a props children faz com que os filhos da authProvider possam usar suas props

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	//testa se ja tem usuario logado através do localStorage:

	//como demora, usamos um loading para demorar o carregamento. Esse loading é processado no AppRoutes.

	useEffect(() => {
		const recoveredUser = localStorage.getItem("user");

		if (recoveredUser) {
			setUser(JSON.parse(recoveredUser));
		}

		setLoading(false);
	}, []);

	const login = (email, password) => {
		/* id viria do BD, email vem do state do user, que vem por contexto da page de login */

		//api para criar uma session, caso trabalhando com o BD, seria retornado a session para colocar no localStorage.

		const loggedUser = {
			id: "123", //seria o token, caso trabalhando com BD
			email,
		};

		if (email === "teste@teste.com" && password === "1234") {
			localStorage.setItem("user", JSON.stringify(loggedUser));
			setUser(loggedUser);
			navigate("/");
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		navigate("/login");
	};

	const dash = () => {
		navigate("*");
	};

	/*Aqui provê o AuthContext pro resto do sistema, assim como suas props*/

	return (
		<AuthContext.Provider
			value={{ authenticated: !!user, user, loading, login, logout, dash }}
		>
			{children}
		</AuthContext.Provider>
	);
};
