import React, { createContext, useState, useContext } from "react"
import jwt_decode from "jwt-decode"

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => {},
	handleLogout: () => {}
})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const handleLogin = (token) => {
		const decodedUser = jwt_decode(token)
		localStorage.setItem("userEmail", decodedUser.sub)
		localStorage.setItem("userId", decodedUser.userId)
		localStorage.setItem("userRole", decodedUser.roles)
		localStorage.setItem("token", token)
		localStorage.setItem("name", decodedUser.name)
		setUser(decodedUser)
	}

	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userEmail")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		localStorage.removeItem("name")
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
