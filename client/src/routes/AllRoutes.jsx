import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { CommonData } from "../contexts/CommonData";
import AddCardPage from "../pages/admin/AddCardPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AllCards from "../pages/admin/AllCards";
import UpdateCardPage from "../pages/admin/UpdateCardPage";
import ErrorPage from "../pages/error/ErrorPage";
import PaginationPage from "../pages/user/PaginationPage";
import SliderPage from "../pages/user/SliderPage";
import Protected from "./Protected";

const AllRoutes = () => {
	const { isLoggedIn } = useContext(CommonData);
	return (
		<Routes>
			<Route path="/" element={<SliderPage />} />
			<Route path="/pagination" element={<PaginationPage itemsPerPage={3} />} />
			<Route path="/login" element={isLoggedIn ? <AllCards /> : <AdminLoginPage />} />
			<Route
				path="/admin/all"
				element={
					<Protected>
						<AllCards />
					</Protected>
				}
			/>
			<Route
				path="/admin/add-card"
				element={
					<Protected>
						<AddCardPage />
					</Protected>
				}
			/>
			<Route
				path="/admin/update-card"
				element={
					<Protected>
						<UpdateCardPage />
					</Protected>
				}
			/>
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
};

export default AllRoutes;
