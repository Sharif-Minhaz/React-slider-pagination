import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";

const AdminLoginPage = () => {
	const { admin, handleOnChange, handleSubmit, error } = useContext(CommonData);
	return (
		<>
			<Navbar />
			<div className="form-container">
				<form className="login-form" onSubmit={handleSubmit}>
					<h1>Admin Login</h1>
					<input
						className={error?.username || error?.loginError ? "is-invalid" : ""}
						value={admin.username}
						onChange={handleOnChange}
						type="text"
						name="username"
						id="username"
						placeholder="Enter username"
					/>
					{error?.username && (
						<small className="invalid-feedback">{error?.username}</small>
					)}
					<input
						className={error?.password || error?.loginError ? "is-invalid" : ""}
						value={admin.password}
						onChange={handleOnChange}
						type="password"
						name="password"
						id="password"
						placeholder="Enter password"
					/>
					{error?.password && (
						<small className="invalid-feedback">{error?.password}</small>
					)}
					{error?.loginError && (
						<small className="invalid-feedback">Invalid username or password</small>
					)}

					<button>Login</button>
				</form>
			</div>
		</>
	);
};

export default AdminLoginPage;
