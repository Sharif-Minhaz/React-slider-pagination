import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CommonData } from "../contexts/CommonData";

const Navbar = () => {
	const { isLoggedIn } = useContext(CommonData);
	return (
		<nav>
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
			<NavLink className="nav-link" to="/login">
				Login
			</NavLink>
		</nav>
	);
};

export default Navbar;
