import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";

const AdminLoginPage = () => {
	const { admin, handleOnChange, handleSubmit } =
		useContext(CommonData);
	return (
		<>
			<Navbar />
			<form onSubmit={handleSubmit}>
				<h1>Login Form</h1>
				<input
					value={admin.username}
					onChange={handleOnChange}
					type="text"
					required
					name="username"
					id="username"
					placeholder="Enter username"
				/>
				<input
					value={admin.password}
					onChange={handleOnChange}
					type="password"
					required
					name="password"
					id="password"
					placeholder="Enter password"
				/>
				<button>Login</button>
			</form>
		</>
	);
};

export default AdminLoginPage;
