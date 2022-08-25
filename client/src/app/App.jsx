import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SetAxios from "../utils/SetAxios";
import AllRoutes from "../routes/AllRoutes";
import { CommonData } from "../contexts/CommonData";
import { useNavigate } from "react-router-dom";

const handleReq = new SetAxios();

const App = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	const [admin, setAdmin] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		Promise.all([handleReq.checkAdmin("/admin/auth/check"), handleReq.getData()])
			.then((response) => {
				console.log(response);
				setIsLoggedIn(response?.[0]?.data?.isAdmin);
				setData(response?.[1]?.data);
			})
			.catch((error) => errorHandler(error))
			.finally(() => setIsLoading(false));
	}, []);

	const handleOnChange = (e) => {
		setAdmin({ ...admin, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await handleReq.auth("/admin/auth/login", admin);
			if (response?.data?.isAdmin) {
				setIsLoggedIn(response.data.isAdmin);
				navigate("/admin/all");
				toast.success(response.data.msg);
			} else {
				console.error("Wrong credentials!");
				toast.error("Wrong credentials!");
			}
		} catch (error) {
			errorHandler(error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await handleReq.deleteData(`/admin/card/del/${id}`);
			const response = await handleReq.getData();
			setData(response.data);
		} catch (error) {
			errorHandler(error);
		}
	};

	const errorHandler = (error) => {
		console.error(error);
		setError(error);
		setIsLoading(false);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		navigate("/", { replace: true });
		toast.success("Logout Successful");
	};

	return (
		<CommonData.Provider
			value={{
				data,
				error,
				admin,
				isLoggedIn,
				setIsLoggedIn,
				handleDelete,
				handleLogout,
				handleOnChange,
				handleSubmit,
			}}
		>
			{isLoading ? "Loading please wait..." : <AllRoutes />}
			<ToastContainer autoClose={4000} />
		</CommonData.Provider>
	);
};

export default App;
