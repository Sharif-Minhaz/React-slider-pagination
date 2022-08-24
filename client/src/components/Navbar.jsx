import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CommonData } from "../contexts/CommonData";

const Navbar = () => {
	const { isLoggedIn, handleLogout } = useContext(CommonData);
	return (
		<nav>
			<div className="partition">
				<NavLink className="nav-link" to="/">
					Slider
				</NavLink>
				<NavLink className="nav-link" to="/pagination">
					Pagination
				</NavLink>

				{isLoggedIn && (
					<NavLink className="nav-link" to="/admin/all">
						All
					</NavLink>
				)}
				{isLoggedIn && (
					<NavLink className="nav-link" to="/admin/add-card">
						Add
					</NavLink>
				)}
			</div>
			{isLoggedIn ? (
				<span onClick={handleLogout} className="nav-link btn">
					Logout
				</span>
			) : (
				<NavLink className="nav-link btn" to="/login">
					Login
				</NavLink>
			)}
		</nav>
	);
};

export default Navbar;
